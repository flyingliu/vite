import{C as t}from"./util.70a3f6d9.js";import{q as s,o as r,c as a}from"./index.94cbc2d4.js";const u={__name:"index",setup(i){const c={good:()=>new Promise((e,o)=>o({code:404,data:{name:"flying"},msg:"success"}))},n=s().appContext.config.globalProperties;return new t(n,{api:c}).api("good",{}).then(e=>{console.log("%c [ res ]-34","font-size:13px; background:pink; color:#bf2c9f;",e)}).catch(e=>{console.log("%c [ err ]-39","font-size:13px; background:pink; color:#bf2c9f;",e)}),(e,o)=>(r(),a("div",null," abc "))}};export{u as default};