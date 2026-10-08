// Injects the server-rendered markup into dist/index.html after `vite build`.
//
// Without this the deployed page is an empty <div id="root">, which means every
// share on LinkedIn/Slack/WhatsApp unfurls with no content behind it and the
// crawlers that do not execute JS (Bing, DuckDuckGo, most LLM crawlers) see
// nothing at all. Also removes the blank-paint flash on first load.

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = resolve(root, 'dist/index.html')

const { render } = await import(resolve(root, 'dist-ssr/entry-server.mjs'))
const markup = render()

const html = await readFile(htmlPath, 'utf8')
const marker = '<div id="root"></div>'

if (!html.includes(marker)) {
    throw new Error(`prerender: could not find ${marker} in dist/index.html`)
}

await writeFile(htmlPath, html.replace(marker, `<div id="root">${markup}</div>`), 'utf8')

console.log(`prerender: injected ${markup.length.toLocaleString()} chars into dist/index.html`)
