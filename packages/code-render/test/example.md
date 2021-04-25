# Code Render

## 背景

让 Markdown 中的代码可以实时运行

## 特性

- Markdown 中的代码可以运行，并预览效果
- 代码可以在线编辑
- 不影响整个文档流的布局
- 支持 React, 支持代码高亮


## 示例代码1

```js
const instance = <Button>Test</Button>;
ReactDOM.render(instance)
```

## API


### `theme` `string`

设置主题，可选项： 'light', 'dark'

默认值：'light'

### `dependencies` `Object`

依赖的资源

### `showCode` `boolean`

显示代码

默认值: true

### `babelTransformOptions` `Object`

babel 配置参数 [options][babeljs]

默认值: { presets: ['env', 'react'] }

[babeljs]: https://babeljs.io/docs/usage/api/#options