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
import { Component } from 'react';
import classnames from 'classnames';
import { isNil, isUndefined, isEmpty } from 'lodash';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/css/css';
import 'codemirror/mode/diff/diff';
import 'codemirror/mode/django/django';
import 'codemirror/mode/dockerfile/dockerfile';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/python/python';
import 'codemirror/mode/sass/sass';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/comment/continuecomment';
import 'codemirror/addon/runmode/runmode';
import Icon, { CopyOutlined } from '@ant-design/icons';
import BracketIcon from './assets/editor-bracket-big.svg';
import CodeEditor from './CodeEditor';
import { Markdown } from '../../markdown-reader/lib';
import parseHTML from './parseHTML';
import Preview from './Preview';
var React = require('react');
var ReactDOM = require('react-dom');
var CodeRender = (function (_super) {
    __extends(CodeRender, _super);
    function CodeRender(props) {
        var _this = _super.call(this, props) || this;
        _this.initialExample = {};
        _this.timer = {};
        _this.executeCode = function (ix, nextCode) {
            var _a = _this.props, babelTransformOptions = _a.babelTransformOptions, dependencies = _a.dependencies;
            var originalRender = ReactDOM.render;
            var hasError = false;
            ReactDOM.render = function (element) {
                _this.initialExample[ix] = element;
            };
            try {
                var code = window.Babel.transform(nextCode, babelTransformOptions).code;
                var statement_1 = '';
                if (dependencies) {
                    Object.keys(dependencies).forEach(function (key) {
                        statement_1 += "var " + key + " = dependencies." + key + ";\n";
                    });
                }
                eval(statement_1 + " " + code);
            }
            catch (err) {
                hasError = true;
                console.error(err);
            }
            finally {
                ReactDOM.render = originalRender;
                if (!hasError) {
                    _this.forceUpdate();
                }
            }
        };
        _this.handleCodeChange = function (ix, val) {
            _this.setState({
                hasError: false,
                errorMessage: null
            });
            _this.executeCode(ix, val);
        };
        _this.handleShowCode = function () {
            _this.setState({ showCode: !_this.state.showCode });
        };
        _this.handleCopyCode = function () {
            console.log("Copy success");
        };
        _this.handleError = function (error) {
            _this.setState({
                hasError: true,
                errorMessage: error.message
            });
        };
        _this.addPrefix = function (name) {
            var classPrefix = _this.props.classPrefix;
            if (classPrefix) {
                return "" + classPrefix + name;
            }
            return name;
        };
        var children = props.children, source = props.source, _a = props.showCode, showCode = _a === void 0 ? true : _a;
        var content = parseHTML(children || source);
        _this.state = {
            content: content,
            showCode: showCode,
            hasError: false,
            errorMessage: null
        };
        if (content) {
            content.forEach(function (i, ix) {
                if (i.type === 'code') {
                    _this.timer[ix] = window.setTimeout(function () {
                        _this.executeCode(ix, i.content);
                    }, props.delay);
                }
            });
        }
        return _this;
    }
    CodeRender.getDerivedStateFromProps = function (nextProps, preState) {
        var content = parseHTML(nextProps.children || nextProps.source);
        if (!isNil(content) &&
            !isNil(preState.content) &&
            ((content === null || content === void 0 ? void 0 : content.length) !== preState.content.length ||
                content.some(function (i, ix) {
                    return i.type === 'code' &&
                        i.content !== preState.content[ix].content;
                }))) {
            return { content: content };
        }
        return null;
    };
    CodeRender.prototype.componentWillUnmount = function () {
        if (!isEmpty(this.timer)) {
            Object.values(this.timer).map(function (timer) {
                clearTimeout(timer);
            });
        }
    };
    CodeRender.prototype.renderExample = function (ix) {
        var _a = this.state, hasError = _a.hasError, errorMessage = _a.errorMessage;
        return (_jsx(Preview, __assign({ hasError: hasError, errorMessage: errorMessage, onError: this.handleError }, { children: _jsx("div", { children: this.initialExample[ix] ? (this.initialExample[ix]) : (_jsx("div", { children: "loading..." }, void 0)) }, void 0) }), void 0));
    };
    CodeRender.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, theme = _a.theme, showCodeIcon = _a.showCodeIcon, renderToolbar = _a.renderToolbar, buttonClassName = _a.buttonClassName;
        var _b = this.state, showCode = _b.showCode, content = _b.content;
        var showCodeButton = (_jsxs("div", { children: [_jsx("button", __assign({ className: classnames(this.addPrefix('btn'), this.addPrefix('btn-xs'), buttonClassName), onClick: this.handleShowCode }, { children: !isUndefined(showCodeIcon) ? (showCodeIcon) : (_jsx("span", { children: _jsx(Icon, { component: BracketIcon, className: classnames(this.addPrefix('icon'), this.addPrefix('icon-code')) }, void 0) }, void 0)) }), void 0),
                _jsx("button", __assign({ className: classnames(this.addPrefix('btn'), this.addPrefix('btn-xs'), buttonClassName), onClick: this.handleCopyCode }, { children: _jsx(CopyOutlined, {}, void 0) }), void 0)] }, void 0));
        return (_jsx("div", __assign({ className: className, style: style }, { children: content === null || content === void 0 ? void 0 : content.map(function (i, ix) {
                if (i.type === 'code') {
                    return (_jsxs("div", __assign({ className: "code-render-wrapper" }, { children: [_this.renderExample(ix), _jsx("div", __assign({ className: "code-render-toolbar" }, { children: renderToolbar
                                    ? renderToolbar(showCodeButton)
                                    : showCodeButton }), void 0),
                            _jsx(CodeEditor, { index: ix, code: i.content, theme: "base16-" + theme, onChange: _this.handleCodeChange, className: "doc-code " + (showCode ? 'show' : '') }, void 0)] }), ix + "-code"));
                }
                else if (i.content) {
                    return _jsx(Markdown, { children: i.content }, ix + "-markdown");
                }
                return null;
            }) }), void 0));
    };
    CodeRender.defaultProps = {
        theme: 'light',
        delay: 0,
        showCode: true,
        babelTransformOptions: {
            presets: ['env', 'react'],
            plugins: []
        }
    };
    return CodeRender;
}(Component));
export default CodeRender;
