@# Callouts 标注

在视觉上突出显示用户的重要内容。

@## CSS API

标注使用与按钮相同的视觉意图修饰符类。如果你需要一个标题，使用`<h5>`元素。

<div class="pt-callout pt-intent-primary pt-icon-info-sign">
    请注意，`<h5>`标题完全是可选的。
</div>

@css pt-callout

@## JavaScript API

`Callout`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

该组件是围绕CSS API的简单包装器，为修饰符和可选标题元素提供了属性。任何额外的HTML属性都将传播到渲染的`<div>`元素。

@interface ICalloutProps
