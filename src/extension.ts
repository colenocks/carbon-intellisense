// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TokenDatabase } from './tokens/TokenDatabase';
import { CarbonCompletionProvider } from './providers/CompletionProvider';
import { CarbonHoverProvider } from './providers/HoverProvider';

let tokenDatabase: TokenDatabase;
let completionProvider: CarbonCompletionProvider;

export function activate(context: vscode.ExtensionContext) {
	// IMMEDIATE LOG: This is the first thing that should execute
	const activationMsg = '[Carbon] ACTIVATE FUNCTION CALLED - Extension is initializing';
	console.log(activationMsg);
	// Also show a popup to confirm activation
	vscode.window.showInformationMessage('Carbon IntelliSense activating...');

	try {
		console.log('Carbon IntelliSense extension is now active');

		console.log('[Carbon] Creating TokenDatabase...');
		tokenDatabase = new TokenDatabase();
		tokenDatabase.startWatchingWorkspace();
		console.log('[Carbon] TokenDatabase created and watcher started');

		console.log('[Carbon] Creating completion and hover providers...');
		completionProvider = new CarbonCompletionProvider(tokenDatabase);
		const hoverProvider = new CarbonHoverProvider(tokenDatabase);
		console.log('[Carbon] Providers created');

		// Diagnostic command to check current editor state
		console.log('[Carbon] Registering diagnostics command...');
		const diagnosticCmd = vscode.commands.registerCommand('carbonIntellisense.diagnostics', () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				vscode.window.showInformationMessage('[Carbon Diagnostics] No active editor');
				return;
			}
			const msg = `[Carbon Diagnostics]\nFile: ${editor.document.uri.toString()}\nLanguage: ${editor.document.languageId}\nScheme: ${editor.document.uri.scheme}`;
			console.log(msg);
			vscode.window.showInformationMessage(msg);
		});
		context.subscriptions.push(diagnosticCmd);
		console.log('[Carbon] Diagnostics command registered');

	// Command to directly invoke the completion provider for the active editor (debugging only)
	console.log('[Carbon] Registering invokeProvider command...');
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
				// CompletionList or provider result
				const list = result as any;
				count = Array.isArray(list.items) ? list.items.length : 0;
				itemsToLog = list.items || list;
			}
			vscode.window.showInformationMessage(`[Carbon] Provider returned ${count} items`);
			console.log('[Carbon] Provider returned items:', itemsToLog);
		} catch (e) {
			console.error('[Carbon] invokeProvider error:', e);
			vscode.window.showErrorMessage(`[Carbon] invokeProvider error: ${e}`);
		}
	});
	context.subscriptions.push(invokeProviderCmd);
	console.log('[Carbon] invokeProvider command registered');

	// Diagnostic command to inspect token database and parser state
	const debugParserCmd = vscode.commands.registerCommand('carbonIntellisense.debugParser', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { vscode.window.showInformationMessage('[Carbon Debug] No active editor'); return; }
		
		const doc = editor.document;
		const pos = editor.selection.active;
		
		// Use ScssParser directly (no dynamic import needed)
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
		
		console.log(msg);
		vscode.window.showInformationMessage(msg);
	});
	context.subscriptions.push(debugParserCmd);
	console.log('[Carbon] debugParser command registered');		console.log('[Carbon] Registering completion providers...');
		const scssCompletionDisposable = vscode.languages.registerCompletionItemProvider(
			{ scheme: 'file', language: 'scss' },
			completionProvider,
			'.', '$'
		);
		console.log('[Carbon] Registered completion provider for language=scss, scheme=file');

		const cssCompletionDisposable = vscode.languages.registerCompletionItemProvider(
			{ scheme: 'file', language: 'css' },
			completionProvider,
			'.', '$'
		);
		console.log('[Carbon] Registered completion provider for language=css, scheme=file');

		// Fallback registration: register for any file scheme (all languages) while debugging.
		// This ensures our provider is invoked even if language detection/activation is problematic.
		const fallbackDisposable = vscode.languages.registerCompletionItemProvider(
			{ scheme: 'file' },
			completionProvider,
			'.', '$'
		);
		console.log('[Carbon] Registered fallback completion provider for scheme=file (all languages)');

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
		console.log('[Carbon] All subscriptions pushed to context');
	} catch (error) {
		console.error('[Carbon] FATAL ERROR during activation:', error);
		vscode.window.showErrorMessage(`[Carbon] Activation failed: ${error}`);
	}
}

export function deactivate() {
	console.log('Carbon IntelliSense extension is now deactivated');
	if (tokenDatabase) {
		tokenDatabase.dispose();
	}
}
