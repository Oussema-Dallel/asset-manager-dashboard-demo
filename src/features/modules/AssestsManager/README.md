# AssetsManager

`AssetsManager` is a module that provides the ability to manage assets. It provides the ability to view and delete assets for now.

## How to integrate

1. Add the `assetsManagerSlice` to the store.

## how to use

Use the `AssetDetails` component to view the details of an asset. This Component will render the 3d model of the asset and see the input images that were used to create the asset. It doesn't provide the ability to delete the asset nor to download the model as of now. It doesn't take props.

```tsx
    <AssetDetails />
```

Use the `AssetPreview` component to view the assets in a grid. This component provides the ability to delete the asset adn to view the details. It takes the `Partial<Asset> & Pick<Asset, 'assetId' | 'name'>` as a prop.

```tsx
    <AssetPreview name={assetName} assetId={assetId} thumbnail={thumbnail} />
```

the `thumbnail` prop is the URL of the thumbnail of the asset to show the image.
