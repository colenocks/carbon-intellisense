import * as vscode from 'vscode';
import { TokenDatabase } from './tokens/TokenDatabase';
import { CarbonCompletionProvider } from './providers/CompletionProvider';
import { CarbonHoverProvider } from './providers/HoverProvider';
import { logger } from './utils/logger';

let tokenDatabase: TokenDatabase;
let completionProvider: CarbonCompletionProvider;

export function activate(context: vscode.ExtensionContext) {
	if (!context || context.subscriptions === undefined) {
		console.error('[Carbon] Invalid extension context provided');
		return;
	}

	try {
		logger.info('Carbon CSS IntelliSense extension activated');

		tokenDatabase = new TokenDatabase();
		const watcher = tokenDatabase.startWatchingWorkspace();
		if (watcher) {
			context.subscriptions.push(watcher);
		}

		completionProvider = new CarbonCompletionProvider(tokenDatabase);
		const hoverProvider = new CarbonHoverProvider(tokenDatabase);

		// Diagnostic command to check current editor state
		const diagnosticCmd = vscode.commands.registerCommand('carbonCssIntellisense.diagnostics', () => {
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
		const invokeProviderCmd = vscode.commands.registerCommand('carbonCssIntellisense.invokeProvider', async () => {
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
			if (event.affectsConfiguration('carbonCssIntellisense.theme')) {
				const config = vscode.workspace.getConfiguration('carbonCssIntellisense');
				const theme = config.get<string>('theme', 'white') as any;
				tokenDatabase.setTheme(theme);
			}
		});

		// Add all disposables synchronously to avoid race conditions
		try {
			context.subscriptions.push(
				scssCompletionDisposable,
				cssCompletionDisposable,
				fallbackDisposable,
				hoverDisposable,
				documentChangeDisposable,
				configChangeDisposable
			);
		} catch (e) {
			console.error('[Carbon] Error adding disposables to context:', e);
			// Dispose manually if context is invalid
			scssCompletionDisposable.dispose();
			cssCompletionDisposable.dispose();
			fallbackDisposable.dispose();
			hoverDisposable.dispose();
			documentChangeDisposable.dispose();
			configChangeDisposable.dispose();
			throw e;
		}

		logger.info('Carbon CSS IntelliSense extension fully initialized');
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		const errorStack = error instanceof Error ? error.stack : undefined;
		console.error('[Carbon] FATAL ERROR during activation:', errorMessage, errorStack);
		logger.error('FATAL ERROR during activation:', error);
		vscode.window.showErrorMessage(`[Carbon] Activation failed: ${errorMessage}`);
	}
}

export function deactivate() {
	logger.info('Carbon CSS IntelliSense extension deactivated');
	if (tokenDatabase) {
		tokenDatabase.dispose();
	}
}
