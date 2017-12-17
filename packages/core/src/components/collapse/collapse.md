@# Collapse 折叠面板

`Collapse`元素通过内置的滑入/滑出动画显示和隐藏内容。您可以使用它为应用程序创建一个设置面板，其中可以展开和折叠的子部分。

@reactExample CollapseExample

@## JavaScript API

`Collapse`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

任何内容都应该是`Collapse`元素的子元素。内容必须位于文档流中（例如`position：absolute;`不起作用，因为父元素将继承0的高度）。

切换`isOpen`属性会触发打开和关闭的动画。一旦组件处于关闭状态，子元素不再被渲染，除非`keepChildrenMounted`属性为true。

```tsx
export interface ICollapseExampleState {
    isOpen?: boolean;
};

export class CollapseExample extends React.Component<{}, ICollapseExampleState> {
    public state = {
        isOpen: false,
    };

    public render() {
        return (
            <div>
                <Button onClick={this.handleClick}>
                    {this.state.isOpen ? "Hide" : "Show"} build logs
                </Button>
                <Collapse isOpen={this.state.isOpen}>
                    <pre>
                        Dummy text.
                    </pre>
                </Collapse>
            </div>
        );
    }

    private handleClick = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
}
```

@interface ICollapseProps
