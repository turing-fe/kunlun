import { Component } from 'react'

export interface ErrorBoundaryProps {
  hasError: boolean
  errorMessage: string | null
  onError: (...args: any[]) => any
}

/**
 * 捕获代码预览发生的异常
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  componentDidCatch(error: any, info: any) {
    const { onError } = this.props
    onError && onError(error, info)
  }

  render() {
    const { hasError, errorMessage, children } = this.props
    if (hasError) {
      return <pre className="code-render-error">{errorMessage}</pre>
    }
    return children
  }
}
