import type { ReactNode, CSSProperties } from 'react';
import { Component } from 'react';
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
interface CodeRenderProps {
    children?: ReactNode;
    theme?: 'light' | 'dark';
    source?: any;
    delay?: number;
    showCode?: boolean;
    buttonClassName?: string;
    showCodeIcon?: ReactNode;
    renderToolbar?: (...args: any[]) => any;
    dependencies?: Record<string, any>;
    babelTransformOptions?: {
        filename?: string;
        presets?: string[];
        plugins?: string[];
    };
    className?: string;
    classPrefix?: string;
    style?: CSSProperties;
}
declare type ContentItemType = {
    type: 'markdown' | 'code';
    content: string;
};
export interface CodeRenderState {
    content: ContentItemType[] | null;
    showCode: boolean;
    hasError: boolean;
    errorMessage: string | null;
}
export default class CodeRender extends Component<CodeRenderProps, CodeRenderState> {
    static defaultProps: {
        theme: string;
        delay: number;
        showCode: boolean;
        babelTransformOptions: {
            presets: string[];
            plugins: never[];
        };
    };
    initialExample: Record<string, any>;
    timer: Record<string, number>;
    static getDerivedStateFromProps(nextProps: CodeRenderProps, preState: CodeRenderState): Partial<CodeRenderState> | null;
    constructor(props: CodeRenderProps);
    componentWillUnmount(): void;
    executeCode: (ix: number, nextCode?: string | undefined) => void;
    handleCodeChange: (ix: number, val: string) => void;
    handleShowCode: () => void;
    handleCopyCode: () => void;
    handleError: (error: Error) => void;
    addPrefix: (name: string) => string;
    renderExample(ix: number): JSX.Element;
    render(): JSX.Element;
}
export {};
