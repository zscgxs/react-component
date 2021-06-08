import React from 'react'
import { message } from 'antd';
import PropTypes from 'prop-types'
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

// 验证字符长度
import MaxLength from 'braft-extensions/dist/max-length'
const options = {
    defaultValue: 20000, // 指定默认限制数，如不指定则为Infinity(无限)
};
BraftEditor.use(MaxLength(options));


const controls: any = [
    'undo', 'redo', 'separator',
    'font-size', 'line-height', 'letter-spacing', 'separator',
    'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
    'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
    'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
    'link', 'separator', 'hr', 'separator',
    'media', 'separator',
    'clear'
]
export default class EditorDemo extends React.Component {
    static propTypes ={
        contentText:PropTypes.string.isRequired,
        setContentText:PropTypes.func.isRequired,
    }
    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(this?.props?.contentText),
    }
    static propTypes = {
        contentText: PropTypes.string.isRequired,
        setContentText: PropTypes.func.isRequired,
    }

    handleEditorChange = (editorState: any) => {
        const { setContentText } = this.props
        this.setState({ editorState })
        if (editorState.isEmpty()) {
            setContentText('')
        } else {
            setContentText(editorState.toHTML())
        }
    }

    // 限制最大字数
    handleMaxLength = () => {
        message.info('最多只能输入500个字符')
    };

    render() {
        const editorProps = {
            style: {
                border: '1px solid #ccc',
            },
            contentStyle: {
                height: '220px',
                overflow: 'hidden'
            },
            controls,
            value: this.state.editorState,
            placeholder: '请输入',
            onChange: this.handleEditorChange,
            // 限制长度
            maxLength: 500,
            onReachMaxLength: this.handleMaxLength
        }

        return (
            <div className="my-component">
                <BraftEditor
                    {...editorProps}
                />
            </div>
        )

    }

}