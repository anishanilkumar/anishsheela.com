import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
    plugins: [react()],
    base: '/',
    // The SSR pass only needs the rendered markup; copying public/ into
    // dist-ssr would just duplicate every asset.
    publicDir: isSsrBuild ? false : 'public',
}))
