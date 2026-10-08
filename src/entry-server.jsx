import { renderToString } from 'react-dom/server'
import App from './App'

// Used only at build time by scripts/prerender.mjs to bake the markup into
// dist/index.html. Social unfurlers and non-Google crawlers do not run JS.
export function render() {
    return renderToString(<App />)
}
