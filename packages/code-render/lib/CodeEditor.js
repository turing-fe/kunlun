var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component, createRef } from 'react';
import CodeMirror from 'codemirror';
import { trim, isUndefined } from 'lodash';
var CodeEditor = (function (_super) {
    __extends(CodeEditor, _super);
    function CodeEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textareaRef = createRef();
        _this.handleChange = function () {
            var _a = _this.props, _b = _a.index, index = _b === void 0 ? 0 : _b, readOnly = _a.readOnly, onChange = _a.onChange;
            if (!readOnly && onChange) {
                onChange(index, _this.editor.getValue());
            }
        };
        return _this;
    }
    CodeEditor.prototype.componentDidMount = function () {
        var _a = this.props, mode = _a.mode, theme = _a.theme, tabSize = _a.tabSize, readOnly = _a.readOnly, lineNumbers = _a.lineNumbers, lineWrapping = _a.lineWrapping;
        if (isUndefined(CodeMirror)) {
            return;
        }
        if (this.textareaRef && this.textareaRef.current) {
            this.editor = CodeMirror.fromTextArea(this.textareaRef.current, {
                mode: mode,
                theme: theme,
                tabSize: tabSize,
                readOnly: readOnly,
                lineNumbers: lineNumbers,
                lineWrapping: lineWrapping
            });
        }
        this.editor.on('change', this.handleChange);
    };
    CodeEditor.prototype.componentDidUpdate = function () {
        var _a = this.props, code = _a.code, readOnly = _a.readOnly;
        if (readOnly) {
            this.editor.setValue(code);
        }
    };
    CodeEditor.prototype.render = function () {
        var _a = this.props, style = _a.style, className = _a.className, code = _a.code, toolbar = _a.toolbar;
        return (_jsxs("div", __assign({ style: style, className: className }, { children: [_jsx("textarea", { ref: this.textareaRef, defaultValue: trim(code) }, void 0), toolbar] }), void 0));
    };
    CodeEditor.defaultProps = {
        mode: 'javascript',
        index: 0,
        tabSize: 2,
        theme: 'default',
        readOnly: false,
        lineNumbers: true,
        lineWrapping: true
    };
    return CodeEditor;
}(Component));
export default CodeEditor;
