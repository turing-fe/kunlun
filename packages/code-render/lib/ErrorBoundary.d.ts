import { Component } from 'react';
export interface ErrorBoundaryProps {
    hasError: boolean;
    errorMessage: string | null;
    onError: (...args: any[]) => any;
}
export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
    componentDidCatch(error: any, info: any): void;
    render(): import("react").ReactNode;
}
