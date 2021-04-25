import type { ReactNode, CSSProperties } from 'react'
import { Component } from 'react'
import classnames from 'classnames'
import { isNil, isUndefined, isEmpty } from 'lodash'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/diff/diff'
import 'codemirror/mode/django/django'
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/python/python'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/comment/continuecomment'
import 'codemirror/addon/runmode/runmode'
import Icon, { CopyOutlined } from '@ant-design/icons'
import BracketIcon from './assets/editor-bracket-big.svg'
import CodeEditor from './CodeEditor'
import { Markdown } from '../../markdown-reader/lib'
import parseHTML from './parseHTML'
import Preview from './Preview'

// @ts-ignore
const React = require('react')
const ReactDOM = require('react-dom')

interface CodeRenderProps {
  children?: ReactNode
  /**
   * 主题
   */
  theme?: 'light' | 'dark'
  /**
   * 源码
   */
  source?: any
  /**
   * 延时
   */
  delay?: number
  /**
   * 是否显示代码
   */
  showCode?: boolean
  /**
   * 按钮附加 class
   */
  buttonClassName?: string
  /**
   * 显示代码 icon
   */
  showCodeIcon?: ReactNode
  /**
   * 自定义 toolbar 渲染
   */
  renderToolbar?: (...args: any[]) => any
  /**
   * 依赖
   */
  dependencies?: Record<string, any>
  /**
   * Babel.transform 选项
   */
  babelTransformOptions?: {
    filename?: string
    presets?: string[]
    plugins?: string[]
  }
  /**
   * 附加 class
   */
  className?: string
  /**
   * class 前缀
   */
  classPrefix?: string
  /**
   * 附加 style
   */
  style?: CSSProperties
}

type ContentItemType = { type: 'markdown' | 'code'; content: string }
/**
 * 内部状态
 */
export interface CodeRenderState {
  content: ContentItemType[] | null
  showCode: boolean
  hasError: boolean
  errorMessage: string | null
}

/**
 * code render effect  + code playground
 */
export default class CodeRender extends Component<
  CodeRenderProps,
  CodeRenderState
> {
  static defaultProps = {
    theme: 'light',
    delay: 0,
    showCode: true,
    babelTransformOptions: {
      presets: ['env', 'react'],
      plugins: []
    }
  }

  // 初始化内容
  initialExample: Record<string, any> = {}
  // 定时器
  timer: Record<string, number> = {}

  static getDerivedStateFromProps(
    nextProps: CodeRenderProps,
    preState: CodeRenderState
  ): Partial<CodeRenderState> | null {
    const content = parseHTML(
      (nextProps.children as string) || nextProps.source
    )
    // 输入内容是否变化
    if (
      !isNil(content) &&
      !isNil(preState.content) &&
      (content?.length !== preState.content.length ||
        content.some(
          (i, ix) =>
            i.type === 'code' &&
            i.content !== (preState.content as ContentItemType[])[ix].content
        ))
    ) {
      return { content }
    }
    return null
  }

  constructor(props: CodeRenderProps) {
    super(props)
    const { children, source, showCode = true } = props
    const content = parseHTML((children as string) || source)
    this.state = {
      content,
      showCode,
      hasError: false,
      errorMessage: null
    }
    if (content) {
      content.forEach((i, ix) => {
        if (i.type === 'code') {
          this.timer[ix] = window.setTimeout(() => {
            this.executeCode(ix, i.content)
          }, props.delay)
        }
      })
    }
  }

  componentWillUnmount() {
    if (!isEmpty(this.timer)) {
      Object.values(this.timer).map(timer => {
        clearTimeout(timer)
      })
    }
  }

  executeCode = (ix: number, nextCode?: string) => {
    const { babelTransformOptions, dependencies } = this.props
    const originalRender = ReactDOM.render
    let hasError = false
    ReactDOM.render = (element: ReactNode) => {
      this.initialExample[ix] = element
    }
    try {
      const { code } = window.Babel.transform(nextCode, babelTransformOptions)
      let statement = ''

      if (dependencies) {
        Object.keys(dependencies).forEach(key => {
          statement += `var ${key} = dependencies.${key};\n`
        })
      }
      eval(`${statement} ${code}`)
    } catch (err) {
      hasError = true
      console.error(err)
    } finally {
      ReactDOM.render = originalRender
      if (!hasError) {
        this.forceUpdate()
      }
    }
  }

  handleCodeChange = (ix: number, val: string) => {
    this.setState({
      hasError: false,
      errorMessage: null
    })
    this.executeCode(ix, val)
  }

  handleShowCode = () => {
    this.setState({ showCode: !this.state.showCode })
  }

  handleCopyCode = () => {
    console.log(`Copy success`)
  }

  handleError = (error: Error) => {
    this.setState({
      hasError: true,
      errorMessage: error.message
    })
  }

  addPrefix = (name: string) => {
    const { classPrefix } = this.props
    if (classPrefix) {
      return `${classPrefix}${name}`
    }
    return name
  }

  /**
   * 渲染效果
   */
  renderExample(ix: number) {
    const { hasError, errorMessage } = this.state
    return (
      <Preview
        hasError={hasError}
        errorMessage={errorMessage}
        onError={this.handleError}
      >
        <div>
          {this.initialExample[ix] ? (
            this.initialExample[ix]
          ) : (
            <div>loading...</div>
          )}
        </div>
      </Preview>
    )
  }

  render() {
    const {
      className,
      style,
      theme,
      showCodeIcon,
      renderToolbar,
      buttonClassName
    } = this.props
    const { showCode, content } = this.state

    // code icon
    const showCodeButton = (
      <div>
        <button
          className={classnames(
            this.addPrefix('btn'),
            this.addPrefix('btn-xs'),
            buttonClassName
          )}
          onClick={this.handleShowCode}
        >
          {!isUndefined(showCodeIcon) ? (
            showCodeIcon
          ) : (
            <span>
              <Icon
                component={BracketIcon}
                className={classnames(
                  this.addPrefix('icon'),
                  this.addPrefix('icon-code')
                )}
              />
            </span>
          )}
        </button>
        <button
          className={classnames(
            this.addPrefix('btn'),
            this.addPrefix('btn-xs'),
            buttonClassName
          )}
          onClick={this.handleCopyCode}
        >
          <CopyOutlined />
        </button>
      </div>
    )

    return (
      <div className={className} style={style}>
        {content?.map((i, ix) => {
          if (i.type === 'code') {
            return (
              <div key={`${ix}-code`} className="code-render-wrapper">
                {/* 渲染效果 */}
                {this.renderExample(ix)}
                {/* 工具栏 */}
                <div className="code-render-toolbar">
                  {renderToolbar
                    ? renderToolbar(showCodeButton)
                    : showCodeButton}
                </div>
                {/* 代码编辑器 */}
                <CodeEditor
                  index={ix}
                  code={i.content}
                  theme={`base16-${theme}`}
                  onChange={this.handleCodeChange}
                  className={`doc-code ${showCode ? 'show' : ''}`}
                />
              </div>
            )
          } else if (i.content) {
            // markdown 渲染
            return <Markdown key={`${ix}-markdown`}>{i.content}</Markdown>
          }
          return null
        })}
      </div>
    )
  }
}
