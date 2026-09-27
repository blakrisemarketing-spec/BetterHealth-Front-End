import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// A lazy page chunk failed to load. After a redeploy that usually means this tab
// holds HTML pointing at chunk hashes that no longer exist, and a reload fetches
// fresh HTML that points at the new ones. Reload at most once per session so a
// chunk that is genuinely broken can't loop the page; after that the error
// reaches RouteErrorBoundary, which shows a Reload button. Skipped when the
// browser says it is offline, since a reload then just swaps our message for
// the browser's own offline page. The event is not preventDefault()ed, so the
// error still propagates to the boundary if the reload doesn't happen.
const PRELOAD_RELOAD_KEY = 'bh:chunk-reload'
window.addEventListener('vite:preloadError', () => {
  if (navigator.onLine === false) return
  try {
    if (sessionStorage.getItem(PRELOAD_RELOAD_KEY)) return
    sessionStorage.setItem(PRELOAD_RELOAD_KEY, '1')
  } catch {
    // sessionStorage blocked (private mode, storage disabled): without the
    // guard a reload could loop, so leave recovery to the boundary.
    return
  }
  window.location.reload()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
