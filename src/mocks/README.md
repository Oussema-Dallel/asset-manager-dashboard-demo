# mocks

This directory contains the mocking functionality of the application. It contains the mocks for the api endpoints mainly.

## mocked endpoints

- `/assets` - (get) This endpoint is used to get the assets that were created by the user. It returns a list of assets that were created by the user. The assets are stored in memory for the purpose of this demo.
- `/assets/:assetId` - (get) This endpoint is used to get the details of an asset. It returns the details of the asset that was created by the user. The assets are stored in memory for the purpose of this demo.
- `/upload` - (post) This endpoint is used to upload the images that are used to create the assets and returns the newly created `assetId`. This is responsible for beginning the streaming process of the asset generation.
- `/assets/:assetId` - (delete) This endpoint is used to delete the asset that was created by the user. The assets are stored in memory for the purpose of this demo. So refreshing the page will bring back the deleted assets.
- `/assets/output/:assetId` - (get) This endpoint is used to get the generated assets after the generation process is complete.
- `/asset-generator-progress` - (get) This endpoint is used to get the progress of the asset generation process. It returns the progress of the asset generation process in a form of an `event-stream`. This is used to show the progress of the asset generation process.
