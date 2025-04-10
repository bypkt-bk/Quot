import 'kleur/colors';
import { g as decodeKey } from './chunks/astro/server_btTrVRkr.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_DkIQu7Uk.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/user/Desktop/work/bill-hub/","cacheDir":"file:///Users/user/Desktop/work/bill-hub/node_modules/.astro/","outDir":"file:///Users/user/Desktop/work/bill-hub/dist/","srcDir":"file:///Users/user/Desktop/work/bill-hub/src/","publicDir":"file:///Users/user/Desktop/work/bill-hub/public/","buildClientDir":"file:///Users/user/Desktop/work/bill-hub/dist/client/","buildServerDir":"file:///Users/user/Desktop/work/bill-hub/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/trpc/[trpc]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/trpc\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"trpc","dynamic":false,"spread":false}],[{"content":"trpc","dynamic":true,"spread":false}]],"params":["trpc"],"component":"src/pages/api/trpc/[trpc].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/user/Desktop/work/bill-hub/src/pages/edit/account/[user_id].astro",{"propagation":"none","containsHead":true}],["/Users/user/Desktop/work/bill-hub/src/pages/edit/store/[store_id].astro",{"propagation":"none","containsHead":true}],["/Users/user/Desktop/work/bill-hub/src/pages/home/[user_id].astro",{"propagation":"none","containsHead":true}],["/Users/user/Desktop/work/bill-hub/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/user/Desktop/work/bill-hub/src/pages/login.astro",{"propagation":"none","containsHead":true}],["/Users/user/Desktop/work/bill-hub/src/pages/store/[store_id].astro",{"propagation":"none","containsHead":true}],["/Users/user/Desktop/work/bill-hub/src/pages/store/bill/[bill_id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:src/pages/edit/account/[user_id]@_@astro":"pages/edit/account/_user_id_.astro.mjs","\u0000@astro-page:src/pages/edit/store/[store_id]@_@astro":"pages/edit/store/_store_id_.astro.mjs","\u0000@astro-page:src/pages/store/[store_id]@_@astro":"pages/store/_store_id_.astro.mjs","\u0000@astro-page:src/pages/home/[user_id]@_@astro":"pages/home/_user_id_.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/store/bill/[bill_id]@_@astro":"pages/store/bill/_bill_id_.astro.mjs","\u0000@astro-page:src/pages/api/trpc/[trpc]@_@ts":"pages/api/trpc/_trpc_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/user/Desktop/work/bill-hub/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DWr08Ldf.mjs","\u0000@astrojs-manifest":"manifest_yZ5E3uJ2.mjs","@/components/organisms/header.vue":"_astro/header.ZaoMP0vA.js","@/components/organisms/login.vue":"_astro/login.BkyssYI6.js","@/components/organisms/footer.vue":"_astro/footer.DMLaWA75.js","@/components/organisms/navigation.vue":"_astro/navigation.CqyluMDw.js","@/components/organisms/bill-table.tsx":"_astro/bill-table.WJ6lP3ZP.js","@/components/organisms/select-item-table.tsx":"_astro/select-item-table.D8xmOTS5.js","@/components/organisms/store-table.tsx":"_astro/store-table.i7Nu41rU.js","@/components/organisms/card.vue":"_astro/card.Bo7ubJ05.js","@/components/organisms/cardlock.vue":"_astro/cardlock.C0jnm5Yi.js","/Users/user/Desktop/work/bill-hub/src/components/organisms/edit-store.vue":"_astro/edit-store.D1LLp1QV.js","/Users/user/Desktop/work/bill-hub/src/components/organisms/edit-account.vue":"_astro/edit-account.CtxWRCu9.js","@/components/organisms/hero.vue":"_astro/hero.DHNxm7gB.js","@astrojs/vue/client.js":"_astro/client.F_S_JA0A.js","@astrojs/react/client.js":"_astro/client.lzrmtfC5.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/_user_id_.XZ316AJq.css","/favicon.svg","/_astro/Combination.TJ497vir.js","/_astro/_bill_id_.Crg58cNX.css","/_astro/_plugin-vue_export-helper.DlAUqK2U.js","/_astro/_store_id_.BfBMUcqG.css","/_astro/_user_id_.5DLlLKCo.css","/_astro/_user_id_.B8LsYQjN.css","/_astro/bill-table.WJ6lP3ZP.js","/_astro/button.DqptQiOU.js","/_astro/card.Bo7ubJ05.js","/_astro/cardlock.C0jnm5Yi.js","/_astro/check.CzOWfGvD.js","/_astro/circle-user-round.DkJGLutA.js","/_astro/client.F_S_JA0A.js","/_astro/client.lzrmtfC5.js","/_astro/createLucideIcon.9kFW5APZ.js","/_astro/edit-account.CtxWRCu9.js","/_astro/edit-store.D1LLp1QV.js","/_astro/footer.DMLaWA75.js","/_astro/header.ZaoMP0vA.js","/_astro/hero.DHNxm7gB.js","/_astro/index.B6GjznTe.css","/_astro/index.Dy7WD_uu.js","/_astro/login.BkyssYI6.js","/_astro/login.WdROMzfv.css","/_astro/navigation.CqyluMDw.js","/_astro/runtime-core.esm-bundler.BBEKxJJC.js","/_astro/runtime-dom.esm-bundler.CrU1BFRw.js","/_astro/select-item-table.D8xmOTS5.js","/_astro/store-table.i7Nu41rU.js","/_astro/store.BL1BM1VU.js","/_astro/table.DIsnQHwN.js","/_astro/tslib.es6.CDuPK5Eb.js","/login/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"Z8wgX3oXvL6p0tHZ3DHDGVn5MwLQYQJlnB1tpOG6iz0="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
