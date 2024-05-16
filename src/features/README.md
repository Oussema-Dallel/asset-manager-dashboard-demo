# features

This directory contains all the features of the application. A feature is a self-contained module that contains everything related to a specific part of the application. It contains the components, the hooks, the slices, the utils, etc. that are specific to that part of the application.

## types of features

There are two types of features: _common_, _modules_.

## common

This directory contains the common features that are used by the other features. It is different from the [app](../app/README.md) in that it contains features that are not specific to the application but could be used by other applications. For example, the `model-viewer` feature is a feature that contains a `Viewer` component that could be used by other features that needs to display 3D models.

## modules

Modules are features that provide some domain function. e.g. creating assets or managing assets. The idea is to separate the application into modules that are self-contained and could be easily removed from the application without considerable amount of refactoring.
