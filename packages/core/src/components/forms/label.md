@# Labels|标签

标签可以增强您表单的可用性。.

<div class="pt-callout pt-intent-success pt-icon-comparison">
    <h5>简单标签 vs. 表单组</h5>
    <p>Blueprint提供了两种将标签文本连接到控件域的方法，具体取决于控件的复杂性。</p>
    <p>简单标签是连接一个标签和一个控件的基本方式。</p>
    <p>表单组支持更复杂的控件布局，但需要更多的标记来保持一致的视觉效果。</p>
</div>

@## CSS API

@### Simple labels|简单标签

简单的标签对于单个`<input>`的基本表单很有用。

- 使用`span.pt-text-muted`将额外的信息添加到标签。

- 把`<input>`元素放在`<label>`元素的内部增加了用户可以点击的区域来激活控件。注意在下面的例子中，点击一个`<label>`来聚焦它的`<input>`。

@css pt-label

@### Disabled labels|禁用标签

将`.pt-label`和`.pt-disabled`类修饰符添加到`<label>`中以使标签显示禁用。

这样设置标签文本的样式，但不会禁用任何嵌套的子项，如input或select。您必须将`:disabled`属性直接添加到任何嵌套元素来禁用它们。
类似地，相应的`pt-*`表单控件将需要`.pt-disabled`修饰符。看下面的例子。

@css pt-label.pt-disabled

@## JavaScript API

`Label`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

这个组件是围绕相应CSS API的简单包装器。它支持完整的HTML属性。

```tsx
<Label
    helperText="帮助文本的细节..."
    text="标签A"
    required={true}
>
    <input className="pt-input" id="text-input" placeholder="占位符文本" />
</Label>
```

@interface ILabelProps
