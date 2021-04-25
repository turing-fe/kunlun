import type { FC } from 'react'
import type { ErrorBoundaryProps } from './ErrorBoundary'
import ErrorBoundary from './ErrorBoundary'

interface PreviewProps extends ErrorBoundaryProps {}

const Preview: FC<PreviewProps> = ({ children, ...rest }) => {
  return (
    <ErrorBoundary {...(rest as ErrorBoundaryProps)}>
      <div className="code-render">{children}</div>
    </ErrorBoundary>
  )
}

export default Preview
