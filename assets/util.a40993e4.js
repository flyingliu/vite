const t=t=>t.split("/").reverse()[0].split(".")[0],s=["/fonts/卢中南.woff","/fonts/徐冰.woff"],a=(t,s)=>(s=null==s||s?1:-1,function(a,i){return(a=a[t])<(i=i[t])?-1*s:a>i?1*s:0});class i{constructor(t,s={}){this.option=s,this.cache=new Map,this.vm=t}hash(t){return JSON.stringify(t)}api(t,s){const a=t+this.hash(s);return new Promise(((i,o)=>{if(this.cache.has(a))return i({data:this.cache.get(a)});this.option.api?"function"==typeof this.option.api[t]&&this.option.api[t](s).then((t=>200===t.code?(this.cache.set(a,t.data),i({data:t.data})):(this.vm.$message(t.msg),o({data:t})))).catch((t=>(console.error(t),o(t)))):console.error("请传入api对象")}))}}export{i as C,s as f,t as g,a as s};