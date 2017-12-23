@# Text areas|文本域

文本域与文本输入类似，但是可以调整大小并支持多行编辑。

您还应该在文本区域指定`dir="auto"`[以更好地支持RTL语言](http://www.w3.org/International/questions/qa-html-dir#dirauto)（在除Internet Explorer之外的所有浏览器中）。

@### CSS API

@css pt-textarea

@### JavaScript API

`TextArea`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

这个组件是围绕相应CSS API的简单包装器。它支持全部的HTML属性。

```tsx
<TextArea
    large={true}
    intent={Intent.PRIMARY}
    onChange={this.handleChange}
    value={this.state.value}
/>
```
