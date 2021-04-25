import type { RefObject } from 'react';
import { Component } from 'react';
import CodeMirror from 'codemirror';
interface CodeEditorProps {
    index: number;
    code: string;
    mode?: 'jsx' | 'javascript' | 'css' | 'diff' | 'django' | 'dockerfile' | 'htmlembedded' | 'htmlmixed' | 'python' | 'sass' | 'shell' | 'sql' | 'yaml' | 'yaml-frontmatter' | 'xml' | 'text/typescript' | 'application/ld+json';
    theme?: string;
    tabSize?: number;
    readOnly?: boolean;
    lineNumbers?: boolean;
    lineWrapping?: boolean;
    toolbar?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (index: number, value: string) => void;
}
declare class CodeEditor extends Component<CodeEditorProps> {
    static defaultProps: {
        mode: string;
        index: number;
        tabSize: number;
        theme: string;
        readOnly: boolean;
        lineNumbers: boolean;
        lineWrapping: boolean;
    };
    textareaRef: RefObject<HTMLTextAreaElement>;
    editor: CodeMirror.EditorFromTextArea;
    componentDidMount(): void;
    componentDidUpdate(): void;
    handleChange: () => void;
    render(): JSX.Element;
}
export default CodeEditor;
