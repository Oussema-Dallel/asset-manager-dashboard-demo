# Asset manager dashboard demo

This is a prototype of a dashboard for managing assets - including 3D models, input images and 2D novel views. It is built using React, Redux, React Router and Material-UI.

## Architecture

The application tries to follow a separation of concerns approach, be it on a global or a modular level. The application is divided into features, each feature is a self-contained module that contains everything related to a specific part of the application. It contains the components, the hooks, the slices, the utils, etc. that are specific to that part of the application. The features are divided into two types: _common_, _modules_. The _pages_ are used to show  the final results the user will see under the given routes. The _app_ directory contains the global components and hooks that are used by the features. The _mocks_ directory contains the mocking functionality of the application. It contains the mocks for the api endpoints mainly.

## Disclaimer

Things which were not taken into account:

- Accessibility
- Responsiveness
- Global Error Handling
- UI consistency and contrast
- And more actually which I am happy to discuss in the interview.
- Testing was not implemented. But the setup is there including testing against components with the store provided to them. e.g. `<App />` component ha s a very sample test that showcases that in a minimal way. Given more time, actual tests would be implemented.

Furthermore, you will find some inconsistencies in the approaches I have used, especially when it comes to the fetching of data. I have used both `RTK query` and custom `async-thunks` intentionally to show my understanding of both approaches. However, I am more comfortable with `async-thunk` as I am more accustomed to it.


## Getting Started

In root directory, run:

```npm install```

```npm run dev```

## Linting(relevant only when using vscode)

For best compatibility with vscode and eslint, install the following extension:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

then add `.vscode` to the root path and add `settings.json`, the content of the latter should be:

```json
{
    "eslint.enable": true,
    "eslint.alwaysShowStatus": true,
    "eslint.options": {
        "extensions": [ ".ts", ".tsx"]
    },
    "eslint.validate": [
        "typescript",
        "typescriptreact"
    ],
    "eslint.workingDirectories": [
        "./src"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Testing

To run tests, run:

```npm run test```

## Expanding the ESLint configuration

The Eslint configuration presented here is just a matter of personal preference. It could be too strict sometimes(which I believe is always good in the long run). You could easily fine tune it in the `rules` section if the `.eslintrc.cjs` file.
