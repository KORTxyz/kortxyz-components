import { Config } from '@stencil/core';
import tailwind, { tailwindHMR } from 'stencil-tailwind-plugin';

export const config: Config = {
  namespace: 'kortxyz-components',
  globalStyle: 'src/global/global.css',
  devServer: {
    reloadStrategy: 'pageReload',
    openBrowser:false
  },
  plugins: [
    tailwind(),
    tailwindHMR(),
  ],
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
