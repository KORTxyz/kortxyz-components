import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'kortxyz-components',
  globalStyle: 'src/global/global.css',
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-vscode',
      file: 'vscode-data.json',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    }
  ]
};
