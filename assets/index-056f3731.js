import{d as q,r as v,a as d,c as $,b as e,w as o,u as n,g as A,o as h,e as r,f as i,p as G,F as H,h as J,i as K,t as M,m as P,_ as Q}from"./index-3c84571d.js";const W={class:"box-editor-chart"},X={class:"item-image"},Y=["src"],Z={style:{padding:"14px"}},ee={style:{float:"right"}},oe={class:"el-dropdown-link"},te={style:{float:"right"}},le={class:"dialog-footer"},ne=q({__name:"index",setup(ae){const b=A().proxy,k=b.$router;b.$route;const C=v({data:[{id:"123",title:"我的低代码"}]}),U=function(s){a.dialog.visible=!0},B=function(s){const l=k.resolve({path:`/editor/${s}`});window.open(l.href,"_blank")},N=function(){a.dialog.visible=!0},I=function(s){},L=function(s){},O=function(s){const l=k.resolve({path:`/view/${s}`});window.open(l.href,"_blank")},S=function(s){return s==null||s==""||s=="#"?new URL(""+new URL("logo-03d6d6da.png",import.meta.url).href,self.location):s},a=v({dialog:{visible:!1},form:{}}),z=()=>{C.data.push({...a.form}),a.dialog.visible=!1},m=v({form:{}}),D=()=>{};return(s,l)=>{const c=d("el-input"),u=d("el-form-item"),g=d("el-button"),y=d("el-form"),p=d("el-col"),w=d("el-row"),V=d("el-icon"),x=d("el-card"),_=d("el-dropdown-item"),E=d("el-dropdown-menu"),F=d("el-dropdown"),R=d("el-pagination"),j=d("el-dialog");return h(),$("div",W,[e(w,{gutter:10},{default:o(()=>[e(p,null,{default:o(()=>[e(y,{inline:!0,model:n(m).form},{default:o(()=>[e(u,{label:"关键词"},{default:o(()=>[e(c,{modelValue:n(m).form.title,"onUpdate:modelValue":l[0]||(l[0]=t=>n(m).form.title=t),placeholder:"请输入关键词",clearable:""},null,8,["modelValue"])]),_:1}),e(u,null,{default:o(()=>[e(g,{type:"primary",onClick:D},{default:o(()=>[r("搜索")]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]),_:1}),e(w,{gutter:10},{default:o(()=>[e(p,{span:4},{default:o(()=>[e(x,{"body-style":{padding:"0px"},shadow:"hover"},{default:o(()=>[i("div",{class:"add-card",onClick:N},[e(V,{size:100},{default:o(()=>[e(n(G))]),_:1})])]),_:1})]),_:1}),(h(!0),$(H,null,J(n(C).data,(t,T)=>(h(),K(p,{span:4,key:T},{default:o(()=>[e(x,{"body-style":{padding:"0px"},shadow:"hover"},{default:o(()=>[i("div",X,[i("img",{class:"image",src:S(t.img),alt:""},null,8,Y)]),i("div",Z,[i("span",null,M(t.title),1),i("span",ee,[e(F,{trigger:"click"},{dropdown:o(()=>[e(E,null,{default:o(()=>[e(_,{onClick:f=>U(t.id)},{default:o(()=>[r("编辑")]),_:2},1032,["onClick"]),e(_,{onClick:f=>B(t.id)},{default:o(()=>[r("设计")]),_:2},1032,["onClick"]),e(_,{onClick:f=>I(t)},{default:o(()=>[r("复制")]),_:2},1032,["onClick"]),e(_,{onClick:f=>L(t.id)},{default:o(()=>[r("删除")]),_:2},1032,["onClick"]),e(_,{onClick:f=>O(t.id)},{default:o(()=>[r("访问")]),_:2},1032,["onClick"])]),_:2},1024)]),default:o(()=>[i("span",oe,[e(V,{size:15},{default:o(()=>[e(n(P))]),_:1})])]),_:2},1024)])])]),_:2},1024)]),_:2},1024))),128))]),_:1}),e(w,{span:10},{default:o(()=>[e(p,null,{default:o(()=>[i("div",te,[e(R,{background:"",layout:"prev, pager, next, jumper",total:1e3})])]),_:1})]),_:1}),e(j,{modelValue:n(a).dialog.visible,"onUpdate:modelValue":l[5]||(l[5]=t=>n(a).dialog.visible=t),title:"编辑",width:"50%",draggable:"true"},{footer:o(()=>[i("span",le,[e(g,{icon:"Close",onClick:l[4]||(l[4]=t=>n(a).dialog.visible=!1)},{default:o(()=>[r("取消")]),_:1}),e(g,{type:"primary",icon:"Check",onClick:z},{default:o(()=>[r(" 确定 ")]),_:1})])]),default:o(()=>[e(y,{model:n(a).form,"label-width":"120px"},{default:o(()=>[e(u,{label:"名称："},{default:o(()=>[e(c,{modelValue:n(a).form.title,"onUpdate:modelValue":l[1]||(l[1]=t=>n(a).form.title=t)},null,8,["modelValue"])]),_:1}),e(u,{label:"密码："},{default:o(()=>[e(c,{type:"password",modelValue:n(a).form.password,"onUpdate:modelValue":l[2]||(l[2]=t=>n(a).form.password=t)},null,8,["modelValue"])]),_:1}),e(u,{label:"说明："},{default:o(()=>[e(c,{type:"textarea",modelValue:n(a).form.desc,"onUpdate:modelValue":l[3]||(l[3]=t=>n(a).form.desc=t)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"])])}}});const ie=Q(ne,[["__scopeId","data-v-3d4bc273"]]);export{ie as default};
