import { Component } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

// Without this, any uncaught render error (bad data shape, undefined
// field, etc.) unmounts the whole React tree and leaves a blank white
// page with no clue why. This catches it and shows the real error.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Global Lead Finder crashed while rendering:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10">
            <AlertTriangle size={26} strokeWidth={2} className="text-rose-500" />
          </div>
          <h1 className="mt-5 text-lg font-semibold text-navy-950">
            Something broke while rendering the results
          </h1>
          <p className="mt-2 max-w-lg text-sm text-navy-600">
            This usually means the data returned by your n8n workflow doesn't
            match the shape the frontend expects. Open your browser's
            DevTools (F12) → Console tab for the full error and stack trace.
          </p>
          <pre className="mt-4 max-w-lg overflow-auto rounded-lg border border-navy-800 bg-navy-900 p-3 text-left text-xs text-rose-300">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-accent-400"
          >
            <RotateCcw size={15} strokeWidth={2.25} />
            Reload and try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}