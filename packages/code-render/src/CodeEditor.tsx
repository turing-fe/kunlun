import type { RefObject } from 'react'
import { Component, createRef } from 'react'
import CodeMirror from 'codemirror'
import { trim, isUndefined } from 'lodash'

interface CodeEditorProps {
  /**
   * 当页内代码块序号
   */
  index: number
  /**
   * 输入内容
   */
  code: string
  mode?:
    | 'jsx'
    | 'javascript'
    | 'css'
    | 'diff'
    | 'django'
    | 'dockerfile'
    | 'htmlembedded'
    | 'htmlmixed' // 混合 html、css、javascript
    | 'python'
    | 'sass'
    | 'shell'
    | 'sql'
    | 'yaml'
    | 'yaml-frontmatter'
    | 'xml'
    | 'text/typescript'
    | 'application/ld+json'
  /**
   * 主题
   */
  theme?: string
  /**
   * tab 空格数
   */
  tabSize?: number
  /**
   * 是否只读
   */
  readOnly?: boolean
  /**
   * 是否显示行号
   */
  lineNumbers?: boolean
  /**
   * 是否自动换行
   */
  lineWrapping?: boolean
  /**
   * 工具栏
   */
  toolbar?: React.ReactNode
  /**
   * 附加 class
   */
  className?: string
  /**
   * 附加 style
   */
  style?: React.CSSProperties
  /**
   * 输入内容变化回调
   */
  onChange?: (index: number, value: string) => void
}

/**
 * 基于 codemirror 的代码编辑器
 * 配置项见 https://codemirror.net/
 */
class CodeEditor extends Component<CodeEditorProps> {
  static defaultProps = {
    mode: 'javascript',
    index: 0,
    tabSize: 2,
    theme: 'default',
    readOnly: false,
    lineNumbers: true,
    lineWrapping: true
  }

  textareaRef: RefObject<HTMLTextAreaElement> = createRef()
  editor: CodeMirror.EditorFromTextArea

  componentDidMount() {
    const {
      mode,
      theme,
      tabSize,
      readOnly,
      lineNumbers,
      lineWrapping
    } = this.props

    if (isUndefined(CodeMirror)) {
      return
    }

    if (this.textareaRef && this.textareaRef.current) {
      this.editor = CodeMirror.fromTextArea(this.textareaRef.current, {
        mode,
        theme,
        tabSize,
        readOnly,
        lineNumbers,
        lineWrapping
      })
    }

    this.editor.on('change', this.handleChange)
  }

  componentDidUpdate() {
    const { code, readOnly } = this.props
    if (readOnly) {
      this.editor.setValue(code)
    }
  }

  handleChange = () => {
    const { index = 0, readOnly, onChange } = this.props
    if (!readOnly && onChange) {
      onChange(index, this.editor.getValue())
    }
  }

  render() {
    const { style, className, code, toolbar } = this.props

    return (
      <div style={style} className={className}>
        <textarea ref={this.textareaRef} defaultValue={trim(code)} />
        {toolbar}
      </div>
    )
  }
}

export default CodeEditor
