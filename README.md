# Graswald asset manager dashboard demo

This is a prototype of a dashboard for managing assets - including 3D models, input images and 2D novel views - for the Senior Frontend engineer role at Graswald. It is built using React, Redux, React Router and Material-UI. This is an ongoing Readme file that will be updated as the project progresses.

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

The Eslint configuration presented here is just a matter of personal preference. It could be too strict sometimes(which I believe is always good in the long run). You could easily fine tune it in the `rules` section if the `.eslintre.cjs` file.
