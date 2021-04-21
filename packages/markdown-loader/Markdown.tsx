import type { FC } from 'react'

interface MarkdownProps {
  className?: string
}

const Markdown: FC<MarkdownProps> = ({ children, className = 'markdown' }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: children as string }}
      className={className}
    />
  )
}

export default Markdown
