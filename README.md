# React FlatUI [![dependency status](https://david-dm.org/cokeSchlumpf/react-flatui.svg)](https://david-dm.org/cokeSchlumpf/react-flatui) [![experimental](http://img.shields.io/badge/stability-experimental-DD5F0A.svg)](http://nodejs.org/api/documentation.html#documentation_stability_index)

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
Containers and Layouts can be used to structure your application. Every container has a layout property which defines how its child elements are arranged. The childs can have several layout specific properties.

### Panel
A Panel is the most common container element.

| Property        | Default       | Description                                                 |
|-----------------|---------------|-------------------------------------------------------------|
| `layout`        | `none`        | The layout which is used to arrange the children.<br />All below listed layouts are allowed.|

#### Example
```xml
  <App>
    <App.Panel layout="horizontal">
      <App.Panel>Left</App.Panel>
      <App.Panel>Right</App.Panel>
    </App.Panel>
  </App>
```
### No Layout
By default the layout property is set to `none`. This means that all children will be arranged naturally by the browser.

### Horizontal and Vertical Layout
These are the most simple layout types. All child elements are arranged horizontally/ vertically. Both layouts are based on [CSS Flexbox](http://css-tricks.com/snippets/css/a-guide-to-flexbox/).

| Property        | Default       | Description                                                 |
|-----------------|---------------|-------------------------------------------------------------|
| `layout`        |               | `vertical`, `horizontal`                                    |
| `justify`       | `start`       | `start`, `end`, `center`, `space-between` or `space-around`.<br />Defines the alignment along the main axis.|
| `align`         | `start`       | `start`, `end`, `center`, `stretch` and `baseline`.<br />This defines the default behaviour for how children are laid out along the cross axis on the current line.|

| Child Property        | Default       | Description                                                 |
|-----------------------|---------------|-------------------------------------------------------------|
| `size`                | not set       | Number or `auto`.<br />Defines the width or height (depending on the layout).      |
| `ratio`               | `1`           | Number from `1` to `10`.<br />Defines the ratio of space used by each element. E.g. if you have three elements with the ratio 1, 2 and 1, the one in the middle will take 50% of the available space, the other ones 25% each.<br /><br />**Note:** If `size` is set, `ratio` will be ignored.|


### Border Layout
This layout combines a vertical layout with a horizontal to create the classic border layout known from [Java Swing](http://docs.oracle.com/javase/tutorial/uiswing/layout/border.html).

| Property        | Default       | Description                                                 |
|-----------------|---------------|-------------------------------------------------------------|
| `layout`        |               | `border`                                                    |
| `mainRatio`     | `4`           | Number from `1` to `10`.<br />The ratio of the center area in the vertical layout.        |
| `mainSize`      | not set       | Number or `auto`.<br />The size of the center area in the vertical layout.         |

| Child Property        | Default       | Description                                                 |
|-----------------------|---------------|-------------------------------------------------------------|
| `position`            | not set       | `top`, `left`, `bottom`, `right` or `center`.<br />Defines the position of the child within the layout. It's not necessary to define a child for every position, even the order within your JSX is not important.|
| `size`                | not set       | Number or `auto`.<br />The width or height, depending on the position.             |
| `ratio`               | depends       | Number from `1` to `10`.<br />Defines the ratio of space used by each element.<br />If `position` is `center` the default is `4` else `1`.|

#### Example
```xml
<App className="myApp" layout="border">
  <App.Panel position="top" size="auto" style={ { backgroundColor: "#ff0000" } }>
    TOP - As you can see you can also add other attributes like style, className, etc..
  </App.Panel>
  <App.Panel position="left">
    LEFT
  </App.Panel>
  <App.Panel position="center" id="main">
    MAIN
  </App.Panel>
</App>
```

## Components
### Button

```xml
<App.Button ... />
```

### Check and Radiobox

```xml
<App.Checkbox ... />
<App.Radiobox ... />
```

### Textbox 

```xml
<App.Textbox ... />
```

| Property        | Default       | Description                                                 |
|-----------------|---------------|-------------------------------------------------------------|
| `rows`          | `1`           | If rows is more than 1 a textarea will be created.          |
