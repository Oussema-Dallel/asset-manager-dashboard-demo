# Asset manager dashboard demo

This is a prototype of a dashboard for managing assets - including 3D models, input images and 2D novel views. It is built using React, Redux, React Router and Material-UI.

## Architecture

The application tries to follow a separation of concerns approach, be it on a global or a modular level. The application is divided into features, each feature is a self-contained module that contains everything related to a specific part of the application. It contains the components, the hooks, the slices, the utils, etc. that are specific to that part of the application. The features are divided into two types: _common_, _modules_. The _pages_ are used to show  the final results the user will see under the given routes. The _app_ directory contains the global components and hooks that are used by the features. The _mocks_ directory contains the mocking functionality of the application. It contains the mocks for the api endpoints mainly.

## Disclaimer

I am aware that 4 hours are the time cap for this application. However, I have spent more than that time on it. I did this as I wanted to provide a certain degree of code quality and best practices. Ultimately, I felt like `Superman` who was sent on a critical mission to save the world on a planet full of `kryptonite`. However, To give you some context about time management, I have spent nearly 4 hours on the [AssetsCreator](./src/features/modules/AssetsCreator/) feature (including brainstorming and planning), which is by far the biggest feature in this application.

Also, I have decided to use a mocked api as I spent quite a lot of time searching for an `api` that could take image pairs to generate 3d models. while I found some results. None was a out of the box solution. e.g. The `huggingface` js library doesn't support diffusers at the moment. Moreover, its `inference` apis does not yet support the `image-to-3d` pipeline. As a result, I have decided to use a mocked api to simulate the process of uploading images and generating 3d models.

Even though I have surpassed the 4 hours mark, Time was still limited to implement all of the features and other UX/UI standards. Things which were not taken into account:

- Accessibility
- Responsiveness
- Global Error Handling
- UI consistency and contrast
- And more actually which I am happy to discuss in the interview.
- Testing was not implemented. But the setup is there including testing against components with the store provided to them. e.g. `<App />` component ha s a very sample test that showcases that in a minimal way. Given more time, actual tests would be implemented.

Furthermore, you will find some inconsistencies in the approaches I have used, especially when it comes to the fetching of data. I have used both `RTK query` and custom `async-thunks` intentionally to show my understanding of both approaches. However, I am more comfortable with `async-thunk` as I am more accustomed to it.

Ultimately, I am thankful for the opportunity to work on this project. It was really a humbling experience. I have learned a lot from it and I am looking forward to the feedback and to the next meeting where we could discuss it in details.

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
