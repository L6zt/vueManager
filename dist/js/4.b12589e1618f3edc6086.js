webpackJsonp([4],{285:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(297),s=r.n(n);for(var a in n)"default"!==a&&function(e){r.d(t,e,function(){return n[e]})}(a);var i=r(329),l=(r.n(i),r(70));var o=function(e){r(323)},u=Object(l.a)(s.a,i.render,i.staticRenderFns,!1,o,null,null);t.default=u.exports},297:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a(r(30)),s=a(r(325));r(22);function a(e){return e&&e.__esModule?e:{default:e}}var i=[{text:"确定",loading:!1},{text:"提交中",loading:!0}],l=[[{value:null,label:"全部"},{value:2,label:"经理"},{value:3,label:"维修人员"}],[{value:3,label:"维修人员"}],[]];t.default={data:function(){var e=this;return{isEditor:!1,dialogVisible:!1,deleteVisible:!1,deleteMsg:null,btnStatus:i[0],sort:[],pagination:{currentPage:1,pageSize:10,total:null,search:null,sortValue:null},insertForm:{name:null,nick_name:null,password:null,rePassword:null,role:null},rules:{name:[{required:!0,message:"不能为空"},{required:!0,pattern:/\w{4,8}$/,message:"用户名, 合法字符位英文和数字， 位数 4-8位"}],role:[{required:!0,message:"不能为空",type:"number"}],password:[{required:!0,validator:function(e,t,r){var n,s,a,i="密码为数字和英文组合， 位数不小于 8";n=(t=t||"").length;var l=t.replace(/[a-zA-Z]/g,"");s=l.length,a=(l=t.replace(/[0-9]/g,"")).length,!l&&n>=8?r(new Error(i)):s+a===n&&s>0&&a>0?r():r(new Error(i))}}],rePassword:[{required:!0,message:"两次密码不下一样",validator:function(t,r,n){e.insertForm.password===r?n():n(new Error("两次密码不一样"))}}]}}},watch:{pagination:{handler:function(){this.getUserMsg()},deep:!0},$gMxUserMsg:{handler:function(e){switch((e||{}).role){case 1:this.sort=l[0];break;case 2:this.sort=l[1];break;case 3:this.$router.push("/");break;default:this.sort=[]}},deep:!0,immediate:!0}},computed:{userList:function(){var e=this;return(this.$store.state.user.userList||[]).map(function(t){return t.pic=t.pic?t.pic:e.userDefaultImg,t})}},methods:{initInsertForm:function(){var e=this.insertForm;(0,s.default)(e).forEach(function(t){e[t]=null})},edit:function(e,t){var r=this.insertForm;for(var n in this.dialogVisible=!0,this.isEditor=!0,r)r[n]=t[e][n];r.index=e},select:function(e){this.sort=l[e-1]},save:function(){var e=this,t=this.$refs.form,r=this.insertForm,s=r.name,a=r.role,l=r.password;this.isEditor?t.validate().then(function(t){e.btnStatus=i[1],e.$store.dispatch("user/editUser",{params:(0,n.default)({},e.insertForm),index:e.insertForm.index,item:(0,n.default)({},e.insertForm)}).then(function(t){var r=t.errMsg;r&&e.$notify({type:"warning",message:r}),e.dialogVisible=!1,e.btnStatus=i[0],e.initInsertForm()}).catch(function(t){e.dialogVisible=!1,e.btnStatus=i[0],e.initInsertForm()})}):t.validate().then(function(t){e.btnStatus=i[1],e.$store.dispatch("user/createUser",{name:s,role:a,password:l}).then(function(t){var r=t.errMsg;if(r)throw e.$notify({type:"warning",message:r}),new Error(r);return e.getUserMsg()}).then(function(){e.dialogVisible=!1,e.btnStatus=i[0],e.initInsertForm()}).catch(function(t){e.dialogVisible=!1,e.btnStatus=i[0],e.initInsertForm()})})},add:function(){this.dialogVisible=!0,this.isEditor=!1},del:function(){var e=this;this.$store.dispatch("user/delUser",{name:this.deleteMsg.name}).then(function(t){t.data,t.flag;var r=t.errMsg;if(r)throw r;e.deleteVisible=!1}).then(function(t){return e.getUserMsg()}).catch(function(t){e.$notify({type:"warning",message:t})})},getUserMsg:function(){var e=this,t=this.pagination,r=t.currentPage,n=t.pageSize,s=t.search,a=t.sortValue;this.$store.dispatch("user/getUserList",{pageIndex:r,pageSize:n,name:s,sort:a}).then(function(t){var r=t.flag,n=t.data;t.errMsg;1===r&&(e.pagination.total=n.count)}).catch(function(e){})}},mounted:function(){var e=this;this.getUserMsg(),setTimeout(function(){e.$gMxpageLoad(!1)},1e3)}}},323:function(e,t,r){var n=r(324);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);r(282)("4ca1be6b",n,!0,{})},324:function(e,t,r){(e.exports=r(281)(!1)).push([e.i,".mg-user-container .mg-user-table-box{padding-top:10px}.mg-user-container .mg-user-pagination-box{position:relative;margin-top:10px}.mg-user-container .mg-user-filter-box{margin-top:10px;margin-bottom:10px}.mg-user-container .mguser-tb-handle-box{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around}",""])},325:function(e,t,r){e.exports={default:r(326),__esModule:!0}},326:function(e,t,r){r(327),e.exports=r(7).Object.keys},327:function(e,t,r){var n=r(40),s=r(31);r(328)("keys",function(){return function(e){return s(n(e))}})},328:function(e,t,r){var n=r(11),s=r(7),a=r(23);e.exports=function(e,t){var r=(s.Object||{})[e]||Object[e],i={};i[e]=t(r),n(n.S+n.F*a(function(){r(1)}),"Object",i)}},329:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.render=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"mg-user-container"},[r("el-row",{staticClass:"mg-user-table-box"},[r("el-col",[r("el-row",[r("el-col",[r("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.add}},[r("i",{staticClass:"el-icon-circle-plus-outline"}),e._v("\r\n                        新增\r\n                    ")])],1)],1),e._v(" "),r("el-row",{staticClass:"mg-user-filter-box",attrs:{gutter:10}},[r("el-col",{attrs:{span:6}},[r("el-input",{attrs:{type:"search",placeholder:"搜索用户名",clearable:""},on:{enter:function(t){if(!("button"in t)&&e._k(t.keyCode,"pevent",void 0,t.key))return null;e.getUserMsg(t)}},model:{value:e.pagination.search,callback:function(t){e.$set(e.pagination,"search",t)},expression:"pagination.search"}},[r("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1),e._v(" "),r("el-col",{staticStyle:{position:"relative",height:"40px",display:"block"},attrs:{span:6,offset:1}},[r("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.pagination.sortValue,callback:function(t){e.$set(e.pagination,"sortValue",t)},expression:"pagination.sortValue"}},e._l(e.sort,function(e){return r("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),r("el-col",{attrs:{span:2,offset:1}},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){t.preventDefault(),e.getUserMsg(t)}}},[e._v("搜索\r\n                    ")])],1)],1),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userList,border:""}},[r("el-table-column",{attrs:{type:"index",label:"序号"}}),e._v(" "),r("el-table-column",{attrs:{prop:"pic",label:"头像"},scopedSlots:e._u([{key:"default",fn:function(e){return[r("img",{staticStyle:{display:"inline-block",height:"30px",width:"30px","border-radius":"100%"},attrs:{src:e.row.pic,alt:""}})]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"name",label:"用户名"}}),e._v(" "),r("el-table-column",{attrs:{prop:"role",label:"角色"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\r\n                        "+e._s(2===t.row.role?"经理":"维修人员")+"\r\n                    ")]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("div",{staticClass:"mguser-tb-handle-box"},[r("el-button",{attrs:{type:"success",size:"small"},on:{click:[function(r){r.preventDefault(),e.edit(t.$index,e.userList)},function(r){e.edit(t.$index,e.userList)}]}},[e._v("\r\n                                编辑\r\n                            ")]),e._v(" "),r("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(r){r.preventDefault(),e.deleteVisible=!0,e.deleteMsg=e.userList[t.$index]}}},[e._v("\r\n                                删除\r\n                            ")])],1)]}}])})],1)],1),e._v(" "),r("el-col",[r("section",{directives:[{name:"show",rawName:"v-show",value:e.pagination.total,expression:"pagination.total"}],staticClass:"mg-user-pagination-box"},[r("el-pagination",{attrs:{layout:"prev, pager, next","current-page":e.pagination.currentPage,"page-size":e.pagination.pageSize,total:e.pagination.total,"prev-text":"上一页","next-text":"下一页",background:""},on:{"update:currentPage":function(t){e.$set(e.pagination,"currentPage",t)}}})],1)])],1),e._v(" "),r("el-dialog",{attrs:{title:"新增用户",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t},close:e.initInsertForm}},[e.dialogVisible?r("el-form",{ref:"form",attrs:{model:e.insertForm,"label-width":"100px",rules:e.rules}},[r("el-form-item",{attrs:{prop:"name",label:"用户名:"}},[r("el-input",{attrs:{type:"text"},model:{value:e.insertForm.name,callback:function(t){e.$set(e.insertForm,"name",t)},expression:"insertForm.name"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"role",label:"角色:"}},[r("el-select",{attrs:{placeholder:"请选择角色"},model:{value:e.insertForm.role,callback:function(t){e.$set(e.insertForm,"role",t)},expression:"insertForm.role"}},e._l(e.sort,function(t){return null!==t.value?r("el-option",{key:t.value,attrs:{label:t.label,value:t.value}}):e._e()}))],1),e._v(" "),r("el-form-item",{attrs:{prop:"password",label:"密码:"}},[r("el-input",{attrs:{type:"password"},model:{value:e.insertForm.password,callback:function(t){e.$set(e.insertForm,"password",t)},expression:"insertForm.password"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"rePassword",label:"确认密码:"}},[r("el-input",{attrs:{type:"password"},model:{value:e.insertForm.rePassword,callback:function(t){e.$set(e.insertForm,"rePassword",t)},expression:"insertForm.rePassword"}})],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary",loading:e.btnStatus.loading},on:{click:e.save}},[e._v("\r\n                    "+e._s(e.btnStatus.text)+"\r\n                ")])],1)],1):e._e()],1),e._v(" "),r("el-dialog",{attrs:{title:"删除用户名为"+(e.deleteMsg||{}).name+"用户吗？",visible:e.deleteVisible},on:{"update:visible":function(t){e.deleteVisible=t}}},[r("el-button",{attrs:{type:"info",size:"small"},on:{click:function(t){e.deleteVisible=!1}}},[e._v("取消")]),e._v(" "),r("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.del}},[e._v("确定")])],1)],1)},t.staticRenderFns=[]}});