"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Markdown = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? 'markdown' : _b;
    return (jsx_runtime_1.jsx("div", { dangerouslySetInnerHTML: { __html: children }, className: className }, void 0));
};
exports.default = Markdown;
//# sourceMappingURL=Markdown.js.map