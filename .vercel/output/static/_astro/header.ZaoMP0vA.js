import{B as h}from"./button.DqptQiOU.js";/* empty css                           */import{_ as y}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{c as p,a as n,b as a,d as t,e as c,f as u,w as f,r as m,o as i}from"./runtime-core.esm-bundler.BBEKxJJC.js";import{c as l}from"./createLucideIcon.9kFW5APZ.js";/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=l("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=l("menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=l("moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=l("sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]),M={__name:"header",setup(k,{expose:o}){o();const r=m(!1);function e(){r.value=!r.value}function d(){window.location.href="/login"}const s={isDarkMode:r,toggleTheme:e,handleClick:d,get Moon(){return _},get Sun(){return x},get ChevronDown(){return g},get Menu(){return v},ref:m,Button:h};return Object.defineProperty(s,"__isScriptSetup",{enumerable:!1,value:!0}),s}},w={class:"desktop-nav"},C={class:"desktop-theme-login"},b={class:"mobile-nav"};function B(k,o,r,e,d,s){return i(),p("header",null,[o[4]||(o[4]=n("a",{class:"logo",href:"/"},[n("img",{src:"/src/assets/billhub.svg",alt:"logo",width:"40"}),n("h4",null,"Bill Hub")],-1)),n("nav",w,[n("ul",null,[n("li",null,[o[0]||(o[0]=a("Product")),t(e.ChevronDown)]),n("li",null,[o[1]||(o[1]=a("Team")),t(e.ChevronDown)]),n("li",null,[o[2]||(o[2]=a("Pricing")),t(e.ChevronDown)])]),n("div",C,[e.isDarkMode?(i(),c(e.Moon,{key:0,onClick:e.toggleTheme})):u("",!0),e.isDarkMode?u("",!0):(i(),c(e.Sun,{key:1,onClick:e.toggleTheme})),t(e.Button,{onClick:e.handleClick},{default:f(()=>o[3]||(o[3]=[a("Login")])),_:1})])]),n("div",b,[t(e.Menu)])])}const V=y(M,[["render",B],["__scopeId","data-v-26219c3b"]]);export{V as default};
