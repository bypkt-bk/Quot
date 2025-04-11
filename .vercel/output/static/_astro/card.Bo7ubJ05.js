import{w as p}from"./runtime-dom.esm-bundler.CrU1BFRw.js";/* empty css                           */import{_ as f}from"./_plugin-vue_export-helper.DlAUqK2U.js";import{h,c as s,d as n,a as o,t as d,F as u,i as k,o as i}from"./runtime-core.esm-bundler.BBEKxJJC.js";import{c as l}from"./createLucideIcon.9kFW5APZ.js";import{S as g}from"./store.BL1BM1VU.js";/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=l("crown",[["path",{d:"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",key:"1vdc57"}],["path",{d:"M5 21h14",key:"11awu3"}]]);/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=l("landmark",[["line",{x1:"3",x2:"21",y1:"22",y2:"22",key:"j8o0r"}],["line",{x1:"6",x2:"6",y1:"18",y2:"11",key:"10tf0k"}],["line",{x1:"10",x2:"10",y1:"18",y2:"11",key:"54lgf6"}],["line",{x1:"14",x2:"14",y1:"18",y2:"11",key:"380y"}],["line",{x1:"18",x2:"18",y1:"18",y2:"11",key:"1kevvc"}],["polygon",{points:"12 2 20 7 4 7",key:"jkujk7"}]]);/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=l("pencil",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);/**
 * @license lucide-vue-next v0.484.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=l("users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),S=h({__name:"card",props:{store:{}},setup(m,{expose:c}){c();function a(r){return r?r.split(" ").map(_=>_.charAt(0).toUpperCase()).join(""):""}function e(r,t){t.preventDefault(),window.location.href=`/edit/store/${r}`}const y={getInitials:a,editStore:e,get Stores(){return g},get Crown(){return x},get Users(){return L},get Landmark(){return v},get Pencil(){return w}};return Object.defineProperty(y,"__isScriptSetup",{enumerable:!1,value:!0}),y}}),M=["href"],C={class:"group"},P={class:"group"},b={class:"group"},j={class:"amount"};function I(m,c,a,e,y,r){return i(),s("a",{class:"card",href:`/store/${a.store.id}`},[n(e.Pencil,{class:"edit-icon z-10",onClick:c[0]||(c[0]=p(t=>e.editStore(a.store.id,t),["stop"])),"aria-label":"Edit store"}),n(e.Stores,{class:"store-icon"}),o("h3",null,d(a.store.name),1),o("div",C,[n(e.Crown,{class:"icon"}),(i(!0),s(u,null,k(a.store.owner,t=>(i(),s("span",{class:"badge",key:t.id},d(e.getInitials(t.name)),1))),128))]),o("div",P,[n(e.Users,{class:"icon"}),(i(!0),s(u,null,k(a.store.admin,t=>(i(),s("span",{class:"badge",key:t.id},d(e.getInitials(t.name)),1))),128))]),o("div",b,[n(e.Landmark,{class:"icon"}),o("span",j,d(a.store.revenue),1)])],8,M)}const H=f(S,[["render",I],["__scopeId","data-v-75335e7d"]]);export{H as default};
