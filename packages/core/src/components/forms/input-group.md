@# Text input groups|文本输入组

输入组允许您在文本输入框_中_添加图标和按钮以扩展其功能。例如，您可以使用输入组来构建密码域的可见性切换。

@## CSS API

您可以在input的任一端放置一个`.pt-icon`或`.pt-button.pt-icon-*`。顺序是由HTML标记决定的：在`input`之前指定的元素出现在左边缘，反之亦然。您不需要将大小类应用到子级&mdash;它们会继承父级input的大小。


<div class="pt-callout pt-intent-warning pt-icon-warning-sign">
    <h5>只有图标</h5>
    <p>输入组不能在CSS API中使用带有文本的按钮。CSS中的文本输入的填充,不能容纳宽度因文本内容而变化的按钮。您应该使用按钮上的图标。</p>

    相反，[`InputGroup`](#core/components/forms/input-group.javascript-api)React组件在其右元素中_支持_任意内容。
</div>

@css pt-input-group

@## JavaScript API

`InputGroup`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

`InputGroup` React组件封装了`.pt-input-group` [CSS API](#core/components/forms/input-group.css-api)：它支持左侧的一个非交互图标和右侧的一个任意元素。与CSS API不同，React组件支持右侧_任意长度的内容_，而不仅仅是图标按钮，因为它能够测量内容并确保它始终有空间。

`InputGroup`可以像受控或不受控的方式一样使用标准的React`input`元素。除了它自己的内容属性之外，它还支持所有HTML`input`元素的有效属性，并将它们代理到DOM中的元素; 最常见的是下面详细介绍。

@interface IInputGroupProps

@reactExample InputGroupExample
