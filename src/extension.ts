// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { TokenDatabase } from './tokens/TokenDatabase';
import { CarbonCompletionProvider } from './providers/CompletionProvider';
import { CarbonHoverProvider } from './providers/HoverProvider';

let tokenDatabase: TokenDatabase;
let completionProvider: CarbonCompletionProvider;

export function activate(context: vscode.ExtensionContext) {
	console.log('Carbon IntelliSense extension is now active');

	tokenDatabase = new TokenDatabase();

	completionProvider = new CarbonCompletionProvider(tokenDatabase);
	const hoverProvider = new CarbonHoverProvider(tokenDatabase);

	const scssCompletionDisposable = vscode.languages.registerCompletionItemProvider(
		{ scheme: 'file', language: 'scss' },
		completionProvider,
		'.'
	);

	const cssCompletionDisposable = vscode.languages.registerCompletionItemProvider(
		{ scheme: 'file', language: 'css' },
		completionProvider,
		'.'
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
		hoverDisposable,
		documentChangeDisposable,
		configChangeDisposable
	);
}

export function deactivate() {
	console.log('Carbon IntelliSense extension is now deactivated');
}
