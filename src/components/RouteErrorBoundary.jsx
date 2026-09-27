import { Component } from "react";

/**
 * Catches a render error under the routed <Suspense> — in practice almost
 * always a lazy page chunk that failed to load — and shows a plain message with
 * a Reload button instead of a blank white page.
 *
 * Why chunks fail here: HTML used to be cacheable, and the daily price-snapshot
 * commits redeploy with new chunk hashes. A visitor holding stale HTML asks for
 * a Guide-<oldhash>.js that no longer exists, gets the SPA shell back as
 * text/html under nosniff, and the dynamic import rejects. On patchy 3G a plain
 * network drop does the same. Without a boundary React unmounts the whole tree.
 *
 * Deliberately self-contained: it must not import Nav/Footer or anything else
 * that could itself live in a chunk that failed to load.
 *
 * `resetKey` (the pathname) clears the error when the visitor navigates, so a
 * failure on one route doesn't wedge the rest of the site.
 */
export default class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error) {
    console.error("Route failed to render:", error);
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="bg-base min-h-screen flex items-center justify-center px-6">
        <div role="alert" className="text-center max-w-[420px]">
          <h1 className="text-[1.5rem] md:text-[1.8rem] font-extrabold font-heading text-text-primary mb-3">
            This page didn&rsquo;t load.
          </h1>
          <p className="text-text-secondary text-lg mb-8 font-body">
            Check your connection and try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white rounded-btn px-8 py-4 text-base font-bold font-heading transition-all"
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}
