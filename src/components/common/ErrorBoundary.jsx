import React from 'react';
import { AlertTriangle } from 'lucide-react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }
    render() {
        if (this.state.hasError)
            return (
                <div className="min-h-screen bg-bg-main flex flex-col items-center justify-center text-text-main">
                    <AlertTriangle className="w-12 h-12 text-accent-pink mb-4" />
                    <h2 className="text-xl font-bold mb-2">
                        Something went wrong.
                    </h2>
                    <button
                        onClick={() => {
                            localStorage.removeItem("wishlist");
                            window.location.reload();
                        }}
                        className="mt-6 px-6 py-2 bg-accent-purple text-bg-main rounded-full font-bold"
                    >
                        새로고침
                    </button>
                </div>
            );
        return this.props.children;
    }
}
