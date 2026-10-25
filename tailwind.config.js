/** @type {import('tailwindcss').Config} */
// Colours point at the CSS variables in src/index.css, which follow the
// instrument house style (jarvis/frontend/src/styles/tokens.css). Edit the
// values there, not here.
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ground: "var(--ground)",
                panel: "var(--panel)",
                "panel-lit": "var(--panel-lit)",
                engrave: "var(--engrave)",
                ink: "var(--ink)",
                "ink-dim": "var(--ink-dim)",
                arc: "var(--arc)",
                "arc-dim": "var(--arc-dim)",
                gold: "var(--gold)",
                slate: "var(--slate)",
            },
            fontFamily: {
                data: ['Archivo', "system-ui", "sans-serif"],
                mono: ['"Plex Mono"', "ui-monospace", '"Roboto Mono"', "monospace"],
            },
            borderWidth: {
                rule: "2px",
            },
        },
    },
    plugins: [],
}
