@# Checkboxes|复选框

Blueprint使用额外的`.pt-control-indicator`元素自定义复选框，在`<input>`之后来实现自定义样式。然后你应该把所有的东西都包装在一个带有`.pt-control.pt-checkbox`类的`<label>`中。

请注意，属性修饰符（`:checked`，`:disabled`）应用于内部`<input>`元件。进一步注意`:indeterminate`只能通过JavaScript设置（`Checkbox` React组件支持它处理一个属性）。

@reactExample CheckboxExample

@## CSS API

@css pt-checkbox

@## JavaScript API

`Checkbox`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

```tsx
// 字符串标签的简单用法
<Checkbox checked={this.state.isEnabled} label="Enabled" onChange={this.handleEnabledChange} />

// JSX内容的高级用法
<Checkbox checked={this.state.isEnabled} onChange={this.handleEnabledChange}>
<span className="pt-icon-standard pt-icon-user" />
Gilad Gray
</Checkbox>
```

请注意，此组件支持HTML`input`元素上可用的全部属性。在受控模式下使用`checked`而不是`value`来避免类型问题。最常见的选项详述如下。

@interface ICheckboxProps

@## Inline controls|内联控件

Checkbox，radio和switch都支持`.pt-inline`修饰符来使它们成为`display:inline-block`。请注意，这个修饰符在这些元素上的功能略微不同于`.pt-label`。在`.pt-label`上，它只调整标签内文本的布局，而不是标签本身的显示。

以下是一个如何将一些控件分组在一起并对其进行标记的例子。

@css pt-checkbox.pt-inline
