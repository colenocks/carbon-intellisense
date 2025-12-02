import * as vscode from 'vscode';
import { TokenDatabase } from './tokens/TokenDatabase';
import { CarbonCompletionProvider } from './providers/CompletionProvider';
import { CarbonHoverProvider } from './providers/HoverProvider';
import { logger } from './utils/logger';

let tokenDatabase: TokenDatabase;
let completionProvider: CarbonCompletionProvider;

export function activate(context: vscode.ExtensionContext) {
	try {
		logger.info('Carbon IntelliSense extension activated');

		tokenDatabase = new TokenDatabase();
		tokenDatabase.startWatchingWorkspace();

		completionProvider = new CarbonCompletionProvider(tokenDatabase);
		const hoverProvider = new CarbonHoverProvider(tokenDatabase);

		// Diagnostic command to check current editor state
		const diagnosticCmd = vscode.commands.registerCommand('carbonIntellisense.diagnostics', () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('[Carbon Diagnostics] No active editor');
				return;
			}
			const msg = `[Carbon Diagnostics]\nFile: ${editor.document.uri.toString()}\nLanguage: ${editor.document.languageId}\nScheme: ${editor.document.uri.scheme}`;
			vscode.window.showInformationMessage(msg);
		});
		context.subscriptions.push(diagnosticCmd);

		// Command to directly invoke the completion provider for the active editor (debugging only)
		const invokeProviderCmd = vscode.commands.registerCommand('carbonIntellisense.invokeProvider', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) { vscode.window.showInformationMessage('[Carbon] No active editor'); return; }
			const pos = editor.selection.active;
			try {
				const result = await completionProvider.provideCompletionItems(editor.document, pos);
				let count = 0;
				let itemsToLog: any = null;
				if (Array.isArray(result)) {
					count = result.length;
					itemsToLog = result;
				} else if (result && typeof result === 'object') {
					const list = result as any;
					count = Array.isArray(list.items) ? list.items.length : 0;
					itemsToLog = list.items || list;
				}
				vscode.window.showInformationMessage(`[Carbon] Provider returned ${count} items`);
				logger.debug('Provider returned items:', itemsToLog);
			} catch (e) {
				logger.error('invokeProvider error:', e);
				vscode.window.showErrorMessage(`[Carbon] invokeProvider error: ${e}`);
			}
		});
		context.subscriptions.push(invokeProviderCmd);

		// Diagnostic command to inspect token database and parser state
		const debugParserCmd = vscode.commands.registerCommand('carbonIntellisense.debugParser', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) { vscode.window.showInformationMessage('[Carbon Debug] No active editor'); return; }
			
			const doc = editor.document;
			const pos = editor.selection.active;
			
			const { ScssParser } = require('./parsers/ScssParser');
			
			const parsed = ScssParser.parseDocument(doc);
			const namespace = ScssParser.getNamespaceAtPosition(doc, pos);
			const allTokens = tokenDatabase.getAllTokens();
			
			let msg = `[Carbon Debug]\n`;
			msg += `File: ${doc.uri.toString()}\n`;
			msg += `Language: ${doc.languageId}\n`;
			msg += `Cursor position: ${pos.line}:${pos.character}\n`;
			msg += `Detected namespace at cursor: ${namespace || 'null'}\n`;
			msg += `Parsed @use imports: ${parsed.length}\n`;
			parsed.forEach((p: any) => {
				msg += `  - namespace: "${p.namespace}", path: "${p.modulePath}"\n`;
			});
			msg += `\nToken database:\n`;
			msg += `  Total tokens: ${allTokens.length}\n`;
			msg += `  Namespaces: spacing, theme, layout, type, motion\n`;
			msg += `  Tokens per namespace:\n`;
			['spacing', 'theme', 'layout', 'type', 'motion'].forEach((ns: string) => {
				const nsTokens = tokenDatabase.getTokensForNamespace(ns);
				msg += `    - ${ns}: ${nsTokens.length} tokens\n`;
			});
			
			vscode.window.showInformationMessage(msg);
		});
		context.subscriptions.push(debugParserCmd);

		const scssCompletionDisposable = vscode.languages.registerCompletionItemProvider(
			{ scheme: 'file', language: 'scss' },
			completionProvider,
			'.', '$'
		);

		const cssCompletionDisposable = vscode.languages.registerCompletionItemProvider(
			{ scheme: 'file', language: 'css' },
			completionProvider,
			'.', '$'
		);

		const fallbackDisposable = vscode.languages.registerCompletionItemProvider(
			{ scheme: 'file' },
			completionProvider,
			'.', '$'
		);

		const hoverDisposable = vscode.languages.registerHoverProvider(
			[{ scheme: 'file', language: 'scss' }, { scheme: 'file', language: 'css' }],
			hoverProvider
		);

		const documentChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
			completionProvider.clearCache(event.document);
		});

		const configChangeDisposable = vscode.workspace.onDidChangeConfiguration(event => {
			if (event.affectsConfiguration('carbonIntellisense.theme')) {
				const config = vscode.workspace.getConfiguration('carbonIntellisense');
				const theme = config.get<string>('theme', 'white') as any;
				tokenDatabase.setTheme(theme);
			}
		});

		context.subscriptions.push(
			scssCompletionDisposable,
			cssCompletionDisposable,
			fallbackDisposable,
			hoverDisposable,
			documentChangeDisposable,
			configChangeDisposable
		);
	} catch (error) {
		logger.error('FATAL ERROR during activation:', error);
		vscode.window.showErrorMessage(`[Carbon] Activation failed: ${error}`);
	}
}

export function deactivate() {
	logger.info('Carbon IntelliSense extension deactivated');
	if (tokenDatabase) {
		tokenDatabase.dispose();
	}
}
