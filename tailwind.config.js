/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                paper: "#F5F6F4",
                panel: "#FFFFFF",
                ink: "#151C24",
                navy: "#1F3A5F",
                route: "#2E7D5B",
                muted: "#586170",
                hair: "#E0E2DD",
            },
            fontFamily: {
                display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
                serif: ['"Source Serif 4"', "Georgia", "serif"],
                mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
            },
        },
    },
    plugins: [],
}
