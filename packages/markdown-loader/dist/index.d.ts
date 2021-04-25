import { jsx } from 'react/jsx-runtime'
import marked from 'marked'
import hljs from 'highlight.js'

var Markdown = function (_a) {
  var children = _a.children,
    _b = _a.className,
    className = _b === void 0 ? 'markdown' : _b
  return jsx(
    'div',
    { dangerouslySetInnerHTML: { __html: children }, className: className },
    void 0
  )
}

var defalutLanguages = [
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
function getSupportLanguage(lang) {
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
function renderer(languages) {
  if (languages === void 0) {
    languages = defalutLanguages
  }
  languages.forEach(function (langName) {
    var lang = getSupportLanguage(langName)
    if (defalutLanguages.includes(lang)) {
      var langModule = require('highlight.js/lib/languages/' + lang)
      hljs.registerLanguage(lang, langModule)
    }
  })
  var renderer = new marked.Renderer()
  var codeRenderer = function (code, lang) {
    var langName = getSupportLanguage(lang)
    var hlCode = langName
      ? hljs.highlight(code, { language: langName }).value
      : hljs.highlightAuto(code).value
    return (
      '<div class="doc-highlight"><pre><code class="' +
      (langName || '') +
      '">' +
      hlCode +
      '</code></pre></div>'
    )
  }
  renderer.code = codeRenderer
  return renderer
}

export { Markdown, renderer }
//# sourceMappingURL=index.d.ts.map
