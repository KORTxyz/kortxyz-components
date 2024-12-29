import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'kortxyz-components',
<<<<<<< HEAD
=======
  globalStyle: 'src/global/global.css',
>>>>>>> 7045811 (first commit)
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
<<<<<<< HEAD
=======
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
      minify:true
>>>>>>> 7045811 (first commit)
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
<<<<<<< HEAD
=======
  testing: {
    browserHeadless: "new",
  },
>>>>>>> 7045811 (first commit)
};
