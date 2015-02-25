# React FlatUI

[![npm status](http://img.shields.io/npm/v/react-flatui.svg)](https://www.npmjs.org/package/react-flatui)
[![dependency status](https://david-dm.org/cokeSchlumpf/react-flatui.svg)](https://david-dm.org/cokeSchlumpf/react-flatui)
[![experimental](http://img.shields.io/badge/stability-experimental-DD5F0A.svg)](http://nodejs.org/api/documentation.html#documentation_stability_index)

A UI Library based on [React](http://facebook.github.io/react/index.html).

## Basics
### Usage

```
React.render(
  <App>
    <App.Panel>
      Hello World!
    </App.Panel>
  </App>, document.body);
```

## Containers and Layout
### Panel
A Panel is the most common container element.

| Property        | Default       | Description                                                 |
|-----------------|---------------|-------------------------------------------------------------|
| `layout`        | `vertical`    | The layout which is used to arrange the children.<br />All below listed layouts are allowed.|

#### Example
```
  React.render(
    <App>
      <App.Panel layout="horizontal">
        <App.Panel>Left</App.Panel>
        <App.Panel>Right</App.Panel>
      </App.Panel>
    </App>
  ), document.body);
```

