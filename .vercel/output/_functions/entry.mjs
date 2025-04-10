import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CynTwSyp.mjs';
import { manifest } from './manifest_yZ5E3uJ2.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/trpc/_trpc_.astro.mjs');
const _page2 = () => import('./pages/edit/account/_user_id_.astro.mjs');
const _page3 = () => import('./pages/edit/store/_store_id_.astro.mjs');
const _page4 = () => import('./pages/home/_user_id_.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/store/bill/_bill_id_.astro.mjs');
const _page7 = () => import('./pages/store/_store_id_.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/trpc/[trpc].ts", _page1],
    ["src/pages/edit/account/[user_id].astro", _page2],
    ["src/pages/edit/store/[store_id].astro", _page3],
    ["src/pages/home/[user_id].astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/store/bill/[bill_id].astro", _page6],
    ["src/pages/store/[store_id].astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "81a66249-3349-48ae-9eaf-a534971900a2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
