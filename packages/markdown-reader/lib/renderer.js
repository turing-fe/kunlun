"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var marked_1 = __importDefault(require("marked"));
var highlight_js_1 = __importDefault(require("highlight.js"));
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
];
function getSupportLanguage(lang) {
    if (lang === 'js') {
        lang = 'javascript';
    }
    if (lang === 'ts') {
        lang = 'typescript';
    }
    if (lang === 'html') {
        lang = 'xml';
    }
    if (lang === 'sass') {
        lang = 'scss';
    }
    return lang;
}
function renderer(languages) {
    if (languages === void 0) { languages = defalutLanguages; }
    languages.forEach(function (langName) {
        var lang = getSupportLanguage(langName);
        if (defalutLanguages.includes(lang)) {
            var langModule = require("highlight.js/lib/languages/" + lang);
            highlight_js_1.default.registerLanguage(lang, langModule);
        }
    });
    var renderer = new marked_1.default.Renderer();
    var codeRenderer = function (code, lang) {
        var langName = getSupportLanguage(lang);
        var hlCode = langName
            ? highlight_js_1.default.highlight(code, { language: langName }).value
            : highlight_js_1.default.highlightAuto(code).value;
        return "<div class=\"doc-highlight\"><pre><code class=\"" + (langName || '') + "\">" + hlCode + "</code></pre></div>";
    };
    renderer.code = codeRenderer;
    return renderer;
}
exports.default = renderer;
//# sourceMappingURL=renderer.js.map