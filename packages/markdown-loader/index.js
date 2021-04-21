'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var marked = require('marked')
var hljs = require('highlight.js/lib/core')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

var marked__default = /*#__PURE__*/ _interopDefaultLegacy(marked)
var hljs__default = /*#__PURE__*/ _interopDefaultLegacy(hljs)

var Markdown = function Markdown(_ref) {
  var children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? 'markdown' : _ref$className
  return /*#__PURE__*/ React.createElement('div', {
    dangerouslySetInnerHTML: {
      __html: children
    },
    className: className
  })
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
/**
 * 强化 markdown loader 语法高亮
 * @param languages
 * @returns
 */

function renderer() {
  var languages =
    arguments.length > 0 && arguments[0] !== undefined
      ? arguments[0]
      : defalutLanguages
  languages.forEach(function (langName) {
    var lang = getSupportLanguage(langName)

    if (defalutLanguages.includes(lang)) {
      var langModule = require('highlight.js/lib/languages/'.concat(lang))

      hljs__default['default'].registerLanguage(lang, langModule)
    }
  })
  var renderer = new marked__default['default'].Renderer()

  var codeRenderer = function codeRenderer(code, lang) {
    var langName = getSupportLanguage(lang)
    var hlCode = langName
      ? hljs__default['default'].highlight(code, {
          language: langName
        }).value
      : hljs__default['default'].highlightAuto(code).value
    return '<div class="doc-highlight"><pre><code class="'
      .concat(langName || '', '">')
      .concat(hlCode, '</code></pre></div>')
  }

  renderer.code = codeRenderer
  return renderer
}

exports.Markdown = Markdown
exports.renderer = renderer
