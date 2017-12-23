@# Control groups|控件组

一个`.pt-control-group`作为一个单元呈现几个不同的控件，在它们之间划出边界。它支持任意数量的`.pt-button`，`.pt-input`，`.pt-input-group`和`.pt-select`
元素作为直接的子元素。

请注意`.pt-control-group`不会将任何修饰符级联到子级。例如，每个孩子必须单独标记为`.pt-large`，以获得统一的大型外观。

<div class="pt-callout pt-intent-success pt-icon-comparison">
    <h5>控件组 vs. 输入框组</h5>
    <p>这两个组件将多个元素分组到一个单元中，但是它们的使用模式是不同的。</p>
    <p>把`.pt-control-group`想象成一个拥有多个孩子的家长，他们每个人都是一个“控制者”。</p>
    <p>相反，`.pt-input-group`是一个单独的控件，应该像这样工作。输入组内的按钮只应该影响输入; 如果要进一步，那么就应该提升到一个控件组。</p>
</div>

@css pt-control-group

@## Responsive control groups|响应式控件组

将类`pt-fill`添加到控件组中，使所有元素均等展开以填充可用空间。然后将`pt-fixed`类添加到单个元素，以将它们还原为原始的默认大小。

或者，将类`pt-fill`添加到单个元素（而不是容器）以将其展开以填充可用空间，而其他元素保留其原始大小。

您可以使用`flex-basis` CSS属性来调整元素的特定大小。

@css pt-control-group.pt-fill

@## Vertical control groups|垂直控件组

添加`pt-vertical`类来创建一个垂直控件组。垂直组中的控件将具有与最宽控件相同的宽度。

@css pt-control-group.pt-vertical

@## JavaScript API

`ControlGroup`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

这个组件是围绕相应CSS API的简单包装器。它支持全部的HTML属性。

```tsx
<ControlGroup fill={true} vertical={false}>
    <Button iconName="filter">Filter</Button>
    <InputGroup placeholder="Find filters..." />
</ControlGroup>
```

@reactExample ControlGroupExample

@interface IControlGroupProps
