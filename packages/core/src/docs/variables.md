@# Variables|变量

可用于Sass和Less。

```css.scss
@import "path/to/@blueprintjs/core/dist/variables";
```

本文档中使用了Sass`$`约定来与原始源代码保持一致。
下面提到的每个变量也可以在`variables.less`中用`@`前缀而不是`$`来提供。

@## Font variables|字体变量

通常情况下，正确的排版风格应该通过使用正确的HTML标签（文本为`<p>`，标题为`<h*>`，代码`<code>`等）来实现。 以下变量提供了对于自定义样式是必要的罕见情况，应该谨慎使用：

- `$pt-font-family`
- `$pt-font-family-monospace`
- `$pt-font-size`
- `$pt-font-size-small`
- `$pt-font-size-large`
- `$pt-line-height`

有关更多信息和使用指南，请参阅[字体部分](#core/typography.fonts)。

@## Icon variables|图标变量

大多数图标应该使用`span.pt-icon-*`类或通过像`.pt-button`这样的修饰符类在组件上显示。在极少数情况下，您可能需要直接访问以图标字体生成每个图标的内容字符串。Blueprint为这些变量提供了直接的名称（请参阅[图标部分](#core/icons)以获取标识符的完整列表）：

- `$pt-icon-style`
- `$pt-icon-align-left`
- `$pt-icon-align-center`
- ...

还为两种图标字体系列及其像素大小提供了变量：

- `$icons16-family`
- `$icons20-family`
- `$pt-icon-size-standard`
- `$pt-icon-size-large`

@## Grids & dimensions|网格 & 尺寸

通用组件的尺寸。大多数大小的变量都是基于`$pt-grid-size`，它的值是`10px`。自定义组件应该遵守相关`height`变量。

- `$pt-grid-size`
- `$pt-border-radius`
- `$pt-button-height`
- `$pt-button-height-large`
- `$pt-input-height`
- `$pt-input-height-large`
- `$pt-navbar-height`

@### Grid system|网格系统

Blueprint不提供网格系统。一般来说，您应该尝试使用`$pt-grid-size`变量在您的CSS代码库中生成布局和大小样式规则。

代替完整的网格系统，您应该尝试使用__CSS弹性盒布局模型___（又名"flexbox"）。它本身是非常强大的，可以让你在不写很多CSS的情况下构建健壮的，响应式的布局。 以下是学习flexbox的一些资源：
- [MDN guide](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)
- [CSS Tricks guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

@## Layering|分层

Blueprint为三个z-index层提供变量。 对于大多数使用情况来说，这应该足够了，尤其是在正确使用[stacking context][MDN]的情况下。[Overlay](#core/components/overlay)组件（如对话框和弹出窗口）使用这些z-index值来配置其堆叠上下文。

- `$pt-z-index-base`
- `$pt-z-index-content`
- `$pt-z-index-overlay`

[MDN]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

@## Light theme styles|亮色主题风格

当您需要构建与Blueprint亮色主题组件相似的自定义UI组件时，请使用这些变量。

- `$pt-dialog-box-shadow`
- `$pt-input-box-shadow`
- `$pt-popover-box-shadow`
- `$pt-tooltip-box-shadow`

@## Dark theme styles|暗色主题风格

当您需要构建与Blueprint暗色主题组件相似的自定义UI组件时，请使用这些变量。

- `$pt-dark-dialog-box-shadow`
- `$pt-dark-input-box-shadow`
- `$pt-dark-popover-box-shadow`
- `$pt-dark-tooltip-box-shadow`
