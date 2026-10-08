import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')

// The build prerenders App into index.html (see scripts/prerender.mjs), so in
// production we hydrate that markup instead of throwing it away and re-rendering.
if (root.hasChildNodes()) {
    ReactDOM.hydrateRoot(
        root,
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
} else {
    ReactDOM.createRoot(root).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
}
