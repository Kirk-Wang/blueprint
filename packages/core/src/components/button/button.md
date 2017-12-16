@# Buttons 按钮

按钮在点击时触发动作。

@## CSS API

使用`pt-button`类来访问按钮样式。出于HTML可访问性和语义的目的，您应该使用`<button>`或`<a>`标签实现按钮，而不是`<div>`。

- 为了可访问性，确保在`<button>`标签中包含`type="button"`（在`<form>`中使用`type="submit"`）和`<a>`标签中的`role="button"`。
- 添加属性`tabindex="0"`使`<a>`标签可以聚焦。`<button>`元素默认是可以聚焦的。
- 对于使用`<a>`标签实现的按钮，将`tabindex="-1"`添加到禁用按钮，以防止用户通过按下键盘上的<kbd class="pt-key">tab</kbd>来对其进行调焦。
- 注意`<a>`标签不响应`:disabled`属性; 改用`.pt-disabled`。

@css pt-button

@### Buttons with icons|图标按钮

在按钮文本之前添加一个图标，使用`pt-icon-*`的类。你_不_需要包含一个图标大类。

@css pt-button.pt-icon

@### Advanced icon layout|高级图标布局

您可以在按钮上使用`pt-icon-*`类在按钮文本之前添加单个图标，但对于更高级的图标布局，可以使用`<span>`标签在按钮内部。将多个图标添加到同一个按钮 ，或移动图标在文字后面。

要调整右对齐图标的边距，请将类`pt-align-right`添加到图标。

@css pt-button.pt-icon-advanced

@### Minimal buttons|迷你按钮

对于似乎淡入UI的一个微妙的按钮，添加`.pt-minimal`修饰符到任何`.pt-button`。 `pt-minimal`与所有其他按钮修饰符兼容，除了`.pt-fill`（由于缺乏视觉效果）。

@css pt-button.pt-minimal

@## JavaScript API

`Button`和`AnchorButton`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

按钮组件渲染带有Blueprint类和属性的按钮。查看样式选项的[按钮CSS文档](#core/components/button.css-api)。

您可以为这些组件提供自己的属性，就像它们是常规的JSX HTML元素一样。如果您提供`className`属性，则您提供的类名称将被添加到默认的Blueprint类名称的旁边。如果你指定了组件提供的其他属性，例如`<AnchorButton>`的`role`，你将覆盖默认值。

<div class="pt-callout pt-intent-danger pt-icon-error">
    <h5>Interactions with disabled buttons</h5>
    Use `AnchorButton` if you need mouse interaction events (such as hovering) on a disabled button.
    This is because `Button` and `AnchorButton` handle the `disabled` prop differently: `Button` uses
    the native `disabled` attribute on the `<button>` tag so the browser disables all interactions,
    but `AnchorButton` uses the class `.pt-disabled` because `<a>` tags do not support the `disabled`
    attribute. As a result, the `AnchorButton` component will prevent *only* the `onClick` handler
    when disabled but permit other events.
</div>

@reactExample ButtonsExample

@### Anchor button|锚点按钮

```jsx
<AnchorButton text="单击" />
// 渲染为:
<a class="pt-button" role="button" tabIndex={0}>单击</a>
```

@### Button|按钮

```jsx
<Button iconName="刷新" />
// 渲染为:
<button class="pt-button pt-icon-refresh" type="button"></button>
```

@interface IButtonProps
