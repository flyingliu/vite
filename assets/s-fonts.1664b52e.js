import{f as a,g as l}from"./util.70a3f6d9.js";import{m as e,s,r as t,o,c as i,w as n,i as u,j as r,h as f,q as m,u as c,F as d,v as p,k as y}from"./vendor.d1aacc18.js";const b={class:"cc"},F=y("本地字体"),h=y("本机字体"),v={props:["state"],setup(y){const v=y,L=e({isComputerFontsLoads:!1,familylist:a.map((a=>"string"==typeof a?{label:l(a),value:a,isLoad:!1}:a))});async function g(){const a=await queryLocalFonts();if(a.length){L.isComputerFontsLoads=!0;a.filter((a=>{return l=a.fullName,/[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/.test(l);var l})).forEach((a=>{L.familylist.map((a=>a.label)).includes(a.fullName)||L.familylist.push({label:a.fullName,value:a.family,isLoad:!0})}))}else alert("请配置本机字体访问权限")}const w=a=>{const l=L.familylist.find((l=>l.value===a));l&&q(l)},_=a=>{const e=window.URL.createObjectURL(a.raw),s=l(a.name),t=L.familylist;t.find((a=>a.label!=s))&&t.push({value:e,label:s,isLoad:!1}),q(t.find((a=>a.label==s)))};function q(a={}){if(a.isLoad)v.state.fontFamily=a.label;else{const l=document.fonts,e=new FontFace(a.label,"url("+a.value+")");e.load().then((s=>(l.add(e),v.state.fontFamily=a.label,a.isLoad=!0,a))).catch((a=>{alert("字体加载错误！"),console.error(a)}))}}return s((()=>{!async function(){const{state:a}=await navigator.permissions.query({name:"local-fonts"});console.log(a),"granted"===a&&g()}(),q(L.familylist[0])})),(a,l)=>{const e=t("el-option"),s=t("el-select"),y=t("el-button"),q=t("el-upload"),C=t("el-form-item");return o(),i(C,{label:"字体设置"},{default:n((()=>[u("div",b,[r(s,{placeholder:"please select your zone",onChange:w,modelValue:v.state.fontFamily,"onUpdate:modelValue":l[0]||(l[0]=a=>v.state.fontFamily=a),size:"small"},{default:n((()=>[(o(!0),f(d,null,m(c(L).familylist,(a=>(o(),i(e,{value:a.value,label:a.label},null,8,["value","label"])))),256))])),_:1},8,["modelValue"]),r(q,{class:"upload-demo",action:"#","on-change":_,"http-request":()=>{},"file-list":[],"show-file-list":!1},{default:n((()=>[r(y,{size:"small",type:"primary",plain:""},{default:n((()=>[F])),_:1})])),_:1},8,["http-request"]),c(L).isComputerFontsLoads?p("",!0):(o(),i(y,{key:0,size:"small",type:"primary",plain:"",onClick:g},{default:n((()=>[h])),_:1}))])])),_:1})}}};export{v as _};