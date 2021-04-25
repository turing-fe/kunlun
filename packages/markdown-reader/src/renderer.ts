import marked from 'marked'
import hljs from 'highlight.js' // 'highlight.js/lib/core'

const defalutLanguages: string[] = [
  'javascript',
  'bash',
  'xml',
  'css',
  'markdown',
  'less',
  'bash',
  'css',
  'diff',
  'django',
  'dockerfile',
  'nginx',
  'node-repl',
  'pgsql',
  'scss',
  'shell',
  'sql',
  'typescript'
]

function getSupportLanguage(lang: string) {
  if (lang === 'js') {
    lang = 'javascript'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'html') {
    lang = 'xml'
  }
  if (lang === 'sass') {
    lang = 'scss'
  }
  return lang
}

/**
 * 强化 markdown loader 语法高亮
 * @param languages
 * @returns
 */
export default function renderer(languages = defalutLanguages) {
  languages.forEach(langName => {
    const lang = getSupportLanguage(langName)
    if (defalutLanguages.includes(lang)) {
      const langModule = require(`highlight.js/lib/languages/${lang}`)
      hljs.registerLanguage(lang, langModule)
    }
  })

  const renderer = new marked.Renderer()
  const codeRenderer = function (code: string, lang: string) {
    const langName = getSupportLanguage(lang)
    const hlCode = langName
      ? hljs.highlight(code, { language: langName }).value
      : hljs.highlightAuto(code).value
    return `<div class="doc-highlight"><pre><code class="${
      langName || ''
    }">${hlCode}</code></pre></div>`
  }
  renderer.code = codeRenderer

  return renderer
}
