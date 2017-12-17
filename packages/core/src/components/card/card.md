@# Cards 卡片

一张卡片是具有纯色背景的UI内容的有界单位。

@## CSS API

从`.pt-card`开始，并添加一个高度修饰符类，以应用一个在UI中模拟高度的投影。

您也可以使用`.pt-elevation-*`类自行将阴影应用于任意元素。

@css pt-card

@### Interactive cards|交互式卡片

添加`.pt-interactive`修饰符类以使`.pt-card`响应用户交互。当您将鼠标悬停在应用此类的卡片上时，鼠标将变为指针，卡片上的高度阴影将增加两级。

用户期望交互式卡片是一个可点击的单元。

@css pt-card.pt-interactive

@## JavaScript API

`Card`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

这个组件是围绕CSS API的简单包装器。

```
<Card interactive={true} elevation={Card.ELEVATION_TWO}>
    <h5><a href="#">卡片标题</a></h5>
    <p>卡片内容</p>
    <Button>提交</Button>
</Card>
```

@reactExample CardExample

@interface ICardProps
