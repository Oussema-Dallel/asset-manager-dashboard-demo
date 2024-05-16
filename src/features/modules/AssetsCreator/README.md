# AssetsCreator

This module is responsible for creating assets. It provides the ability to create assets by uploading images and generate 3d model and 2d images. It also provides the ability to view the assets that were created when successful.

## Dependencies

- [ModelViewer](../../common/ModelViewer/README.md)
- [app](../../app/README.md) specifically the form hooks.

## How to integrate

1. Add the `assetsCreatorSlice` to the store.

## How to use

### Displaying the assets creator components

There are several components that are provided by this module to create assets. The main component is the `AssetGeneratorForm` component. This component provides the ability to upload images and give it a name and description for the generation process. It doesn't take any props.

```tsx
    <AssetGeneratorForm />
```

If you would like to preview the generated asset, you could use the `AssetsGeneratorOutput` component. This component provides the ability to view the generated 3d model and the 2d images. It doesn't take any props.

```tsx
    <AssetsGeneratorOutput />
```

This component uses the `AssetGenerationProgress` internally to show the progress of the generation process. The `AssetGenerationProgress` component uses a custom hook called `useSseData` to get the progress of the generation process from the server in a from of an `event-stream`. It doesn't take any props.

```tsx
    <AssetGenerationProgress />
```

### The asset creation flow

To get the creation flow to work, you need to use:

1. `generateAsset` async thunk which uploads the image and starts the generation process.
2. `useSseData` hook to get the progress of the generation process.
3. `getGeneratedAssets` async thunk to get the generated asset. After which you are free to show the 3d model.
