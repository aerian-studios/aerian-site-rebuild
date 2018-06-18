import * as React from "react";

interface State {
    hasError: boolean;
}

interface Props {}

const DEFAULT_STATE: State = { hasError: false };
class ErrorBoundary extends React.Component<Props, State> {
    public readonly state: State = DEFAULT_STATE;

    componentDidCatch() {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
