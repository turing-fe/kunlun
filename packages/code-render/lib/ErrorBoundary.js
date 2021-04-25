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
import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
var ErrorBoundary = (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, info) {
        var onError = this.props.onError;
        onError && onError(error, info);
    };
    ErrorBoundary.prototype.render = function () {
        var _a = this.props, hasError = _a.hasError, errorMessage = _a.errorMessage, children = _a.children;
        if (hasError) {
            return _jsx("pre", __assign({ className: "code-render-error" }, { children: errorMessage }), void 0);
        }
        return children;
    };
    return ErrorBoundary;
}(Component));
export default ErrorBoundary;
