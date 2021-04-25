import type { CodeRenderState } from './CodeRender'
import parseDOM from './parseDOM'

function text(element: HTMLElement) {
  return element.textContent || element.innerText
}

/**
 * 将 markdown code block 内部代码摘取出来
 * @param {string} source
 * @returns
 */
export default function parseHTML(
  source?: string
): Pick<CodeRenderState, 'content'>['content'] {
  if (!source) {
    return null
  }

  return source
    .split('<div class="doc-highlight"><pre><code')
    .map(i => {
      if (i.indexOf('class="hljs-name"') !== -1) {
        return `<div class="doc-highlight"><pre><code${i}`
      }
      return i
    })
    .map(i => {
      if (i.match(/<\/code><\/pre><\/div>/)) {
        return i.split(/<\/code><\/pre><\/div>/).map(j => {
          if (j.indexOf('class="hljs-name"') !== -1) {
            return `${j}</code></pre></div>`
          }
          return j
        })
      }
      return i
    })
    .flat()
    .map(i => {
      const content = text(parseDOM(i))
      if (
        content.indexOf('ReactDOM.render') !==
        -1 /*i.indexOf('class="doc-highlight"') !== -1 */
      ) {
        return {
          type: 'code',
          content: text(parseDOM(i))
        }
      }
      return {
        type: 'markdown',
        content: i
      }
    })
}
