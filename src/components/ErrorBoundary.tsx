import * as React from "react";

interface State {
    hasError: boolean;
}

const DEFAULT_STATE: State = { hasError: false };
class ErrorBoundary extends React.Component<{}, State> {
    public readonly state: State = DEFAULT_STATE;

    public componentDidCatch() {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
