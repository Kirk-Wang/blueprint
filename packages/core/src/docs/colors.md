@# Colors

这些颜色的十六进制值可以在JavaScript中访问。该模块的全局版本公开了`Blueprint.Colors`对象。 在CommonJS中，您可以`import { Colors } from "@blueprintjs/core"`。

@## Gray scale

黑色，白色之间的一切。灰度应该用于主UI框架：containers, headers, sections, boxes, etc.如果您需要引起对特定元素（按钮，图标，工具提示等）的注意，请使用其中一种[核心颜色](#colors.core-colors)。

@reactDocs GrayscalePalette

@## Core colors

核心颜色保留用于用户界面设计。 使用这些来帮助引起对特定UI元素的注意，如按钮，标注，图标等。每个核心颜色被映射到我们称之为__visual intent__的地方。我们使用意图来传达UI元素的状态：

- _Blue_ (intent: primary) 从典型的灰度UI框架中提升元素。
- _Green_ (intent: success) 表示成功的操作。
- _Orange_ (intent: warning) 表示警告和中间状态。
- _Red_ (intent: danger) 表示错误和潜在的破坏性操作。

核心颜色也被设计为：

- 在任何应用程序中相处融洽，彼此并用。
- 遵守[WCAG 2.0](https://www.w3.org/TR/WCAG20/)标准，因此对视障人士和色盲用户来说非常方便。

@reactDocs CoreColorsPalette

@## Extended colors

扩展颜色通常应该保留用于数据可视化：任何时候您需要表示某种数据时，都可以使用这些颜色。这些颜色对于[WCAG 2.0](https://www.w3.org/TR/WCAG20/)辅助功能标准的要求不那么严格，因此不应该用于典型的用户界面设计 — 而应该考虑使用[核心颜色](#colors.core-colors)。

@reactDocs ExtendedColorsPalette

@## Color schemes

使用以下配色方案生成器为您的数据可视化生成配色方案。首先，根据您的数据类型选择方案类型，然后使用下面的表单自定义数值。最后，将颜色数组复制到您的应用程序中并使其生效！

以下方案经过精心打造，视觉震撼，易于理解，同时视障人士和色盲用户仍可使用。

@### Sequential color schemes

顺序颜色方案意味着顺序，并且最适合用于表示在序数或数字尺度上从低到高值的数据。

@reactDocs SequentialSchemePalette

@### Diverging color schemes

分散的配色方案同时强调数据范围两端的中间值和极端值。

@reactDocs DivergingSchemePalette

@### Qualitative color schemes

定性的配色方案使用一系列不相关的颜色来创建一个不包含顺序的方案，仅仅是种类上的差异。

@reactDocs QualitativeSchemePalette

@include color-aliases
