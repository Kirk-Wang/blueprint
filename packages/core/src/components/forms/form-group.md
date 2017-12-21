@# Form groups|表单组

表单组支持比[简单标签](#core/components/forms/label.simple-labels)更复杂的表单控件，例如[控件组](#core/components/forms/control-group)或[`NumericInput`](#core/components/forms/numeric-input)。 他们还支持更多的帮助文本，以帮助用户导航。

@## CSS API

- 使用`<label>`上的`for={#id}`属性和控件上的`id={#id}`将每个标签链接到其各自的控件元素。

- 将`.pt-intent-*`或`.pt-disabled`添加到`.pt-form-group`中以样式化标签和帮助文本。与标签类似，嵌套控件需要单独设置样式。

- 添加`.pt-inline`到`.pt-form-group`以便标签放置在控件的左侧。

- 将`.pt-large`添加到`.pt-form-group`，以便在与大型内联Blueprint控件一起使用时对齐标签。

@css pt-form-group

@## JavaScript API

`FormGroup`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

这个组件是CSS API的一个简单包装器，可以抽象出HTML的复杂性。

```tsx
<FormGroup
    helperText="Helper text with details..."
    label="Label A"
    labelFor="text-input"
    required={true}
>
    <input id="text-input" placeholder="Placeholder text" />
</FormGroup>
```

@interface IFormGroupProps
