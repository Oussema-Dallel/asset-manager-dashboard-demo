# app

The app contains everything related to the whole application that could be used by all features. This includes the store, the router, the theme, the global styles, the global components, the global hooks, the global utils, etc.

## slices

While it is called `app`, it does not contain the main store. However, it does contain slices that are could be used by other features. For example, the `api` slice could be used by other features that uses `RTK query` to fetch data.

## components

This contains global components that could be used by other features. For example, `ControlledTextField` is a generic input field that could be used by other features.

## hooks

This contains global hooks that could be used by other features. For example, `useInput` and `useForm` are hooks for managing individual `inputs` and `forms` respectively.

## utils

This contains global utils that could be used by other features. For example, `isNil` is a typed utility function that could be used to check wether a variable is `null` or `undefined`.

## theming

This contains the global theme used by the application and its related styles overrides.

## Providers

This is a special component that wraps the whole application with global providers. For example, the `ThemeProvider` is a provider that provides the global theme to the whole application. It could be used like so:

```tsx
<Providers
    Router={ BrowserRouter }
    store={ store }
    theme={ theme }
    >
        <App />
  </Providers>
```
