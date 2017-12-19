@# Dialogs 对话框

对话框上内容覆盖UI的其他部分。

<div class="pt-callout pt-intent-primary pt-icon-info-sign">
    <h5>Terminology note</h5>
    The term "modal" is sometimes used to mean "dialog," but this is a misnomer.
    _Modal_ is an adjective that describes parts of a UI.
    An element is considered modal if it
    [blocks interaction with the rest of the application](https://en.wikipedia.org/wiki/Modal_window).
    We use the term "dialog" to avoid confusion with the adjective.
</div>

@reactExample DialogExample

@## JavaScript API

`Dialog`组件在__@blueprintjs/core__包中可用。请务必查看[JS组件通用用法文档](#blueprint.usage)。

有两种方法来呈现对话框：

- 使用`<Portal>`注入到新创建的元素中并附加到`document.body`。这是默认行为。
- 在DOM树中就地。设置`inline={true}`来启用这个行为。

`Dialog`是一个无状态的React组件。您提供给这个组件的子项在`.pt-dialog`元素内部作为内容渲染。

```tsx
interface IDialogExampleState {
    isOpen: boolean;
}

class DialogExample extends React.Component<{}, IDialogExampleState> {
    public state = { isOpen: false };

    public render() {
        return (
            <div>
                <Button onClick={this.toggleDialog} text="Show dialog" />
                <Dialog
                    iconName="inbox"
                    isOpen={this.state.isOpen}
                    onClose={this.toggleDialog}
                    title="Dialog header"
                >
                    <div className="pt-dialog-body">
                        Some content
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button text="Secondary" />
                            <Button
                                intent={Intent.PRIMARY}
                                onClick={this.toggleDialog}
                                text="Primary"
                            />
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }

    private toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });
}
```

@interface IDialogProps

@## CSS API

您可以使用下面的HTML标记和`pt-dialog-*`类来手动创建对话框。但是，你应尽可能使用对话框[JavaScript APIs](#core/components/dialog.javascript-api)
因为他们自动生成一些这种标记。

对话框内容的更多例子如下所示。

@css pt-dialog
