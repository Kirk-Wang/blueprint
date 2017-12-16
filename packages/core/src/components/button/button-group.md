@# Button groups|按钮组

按钮组，水平或垂直排列多个按钮为一组。

@## CSS API

排列多个按钮在一组，通过包裹它们在`.pt-button-group`中。您可以直接在按钮组容器元素上应用调整大小。

您应该将交互式分段控件作为按钮组实现。

@css pt-button-group

@### Responsive button groups|响应式按钮组

将类`pt-fill`添加到按钮组中，使所有按钮均匀展开以填充可用空间。然后将`pt-fixed`类添加到单个按钮以将它们还原为原始默认大小。

或者，将类`pt-fill`添加到单个按钮（而不是容器）将其展开以填充可用空间，而其他按钮保留其原始大小。

您可以使用`flex-basis`CSS属性来调整按钮的特定大小。

@css pt-button-group.pt-fill

@### Vertical button groups|垂直按钮组

添加`pt-vertical`类来创建一个垂直按钮组。垂直组中的按钮与组中最宽的按钮大小相同。

将修饰符类`pt-align-left`以便左对齐所有按钮文本和图标。

你也可以将垂直组与`pt-fill`和`pt-minimal`类修饰符组合在一起。

@css pt-button-group.pt-vertical

@## JavaScript API

`ButtonGroup`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

该组件是CSS API的一个简单包装器，支持完整的HTML属性。

```tsx
<ButtonGroup minimal={true} large={false} onMouseEnter={...}>
    <Button iconName="database">Queries</Button>
    <Button iconName="function">Functions</Button>
    <AnchorButton rightIconName="caret-down">Options</AnchorButton>
</ButtonGroup>
```

@reactExample ButtonGroupExample

@interface IButtonGroupProps
