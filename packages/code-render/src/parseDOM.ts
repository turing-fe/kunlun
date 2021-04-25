export default function parseDOM(str: string) {
  const element = document.createElement('div')
  element.innerHTML = str
  return element
}
