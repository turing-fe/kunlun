declare interface Window {
  Babel: any
}

declare module '*.md' {}
declare module '*.svg' {
  const content: React.ComponentType<
    React.SVGProps<SVGSVGElement> | CustomIconComponentProps
  >
  export default content
}
