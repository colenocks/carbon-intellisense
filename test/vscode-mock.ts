// Mock vscode module for tests
export const workspace = {
    createFileSystemWatcher: () => ({
        onDidChange: () => { },
        onDidCreate: () => { },
        onDidDelete: () => { },
        dispose: () => { },
    }),
};

export default {
    workspace,
};

