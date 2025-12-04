#!/usr/bin/env node

// Mock vscode module before running tests
import { prototype } from 'module';
const originalRequire = prototype.require;

const vscodeMock = {
  workspace: {
    createFileSystemWatcher: () => ({
      onDidChange: () => {},
      onDidCreate: () => {},
      onDidDelete: () => {},
      dispose: () => {},
    }),
  },
};

// Override require to return mock for 'vscode'
prototype.require = function(id) {
  if (id === 'vscode') {
    return vscodeMock;
  }
  return originalRequire.apply(this, arguments);
};

// Now run mocha
import 'mocha/bin/mocha';

