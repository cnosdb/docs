"use strict";(self.webpackChunkCnosDB=self.webpackChunkCnosDB||[]).push([[4546],{4137:(t,e,a)=>{a.d(e,{Zo:()=>p,kt:()=>k});var n=a(7294);function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){r(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}function o(t,e){if(null==t)return{};var a,n,r=function(t,e){if(null==t)return{};var a,n,r={},l=Object.keys(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||(r[a]=t[a]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)a=l[n],e.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(t,a)&&(r[a]=t[a])}return r}var u=n.createContext({}),m=function(t){var e=n.useContext(u),a=e;return t&&(a="function"==typeof t?t(e):i(i({},e),t)),a},p=function(t){var e=m(t.components);return n.createElement(u.Provider,{value:e},t.children)},d="mdxType",c={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},s=n.forwardRef((function(t,e){var a=t.components,r=t.mdxType,l=t.originalType,u=t.parentName,p=o(t,["components","mdxType","originalType","parentName"]),d=m(a),s=r,k=d["".concat(u,".").concat(s)]||d[s]||c[s]||l;return a?n.createElement(k,i(i({ref:e},p),{},{components:a})):n.createElement(k,i({ref:e},p))}));function k(t,e){var a=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=a.length,i=new Array(l);i[0]=s;var o={};for(var u in e)hasOwnProperty.call(e,u)&&(o[u]=e[u]);o.originalType=t,o[d]="string"==typeof t?t:r,i[1]=o;for(var m=2;m<l;m++)i[m]=a[m];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}s.displayName="MDXCreateElement"},5529:(t,e,a)=>{a.r(e),a.d(e,{assets:()=>u,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>m});var n=a(7462),r=(a(7294),a(4137));const l={sidebar_position:7},i="Configuration",o={unversionedId:"reference/config",id:"reference/config",title:"Configuration",description:"Introduction",source:"@site/docs/reference/config.md",sourceDirName:"reference",slug:"/reference/config",permalink:"/docs/reference/config",draft:!1,editUrl:"https://github.com/cnosdb/docs/docs/reference/config.md",tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7},sidebar:"tutorialSidebar",previous:{title:"CnosDB Tools",permalink:"/docs/reference/tools"},next:{title:"Eco-integration",permalink:"/docs/reference/ecosystem"}},u={},m=[{value:"Introduction",id:"introduction",level:2},{value:"query",id:"query",level:2},{value:"storage",id:"storage",level:2},{value:"wal",id:"wal",level:2},{value:"cache",id:"cache",level:2},{value:"log",id:"log",level:2},{value:"security",id:"security",level:2},{value:"security.tls_config",id:"securitytls_config",level:3},{value:"reporting_disabled",id:"reporting_disabled",level:2}],p={toc:m},d="wrapper";function c(t){let{components:e,...a}=t;return(0,r.kt)(d,(0,n.Z)({},p,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"configuration"},"Configuration"),(0,r.kt)("h2",{id:"introduction"},"Introduction"),(0,r.kt)("p",null,"The configuration adopts TOML syntax."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"query query interface configuration"),(0,r.kt)("li",{parentName:"ul"},"storage storage configuration"),(0,r.kt)("li",{parentName:"ul"},"wal write pre-log configuration"),(0,r.kt)("li",{parentName:"ul"},"cache cache configuration"),(0,r.kt)("li",{parentName:"ul"},"log runs log configuration"),(0,r.kt)("li",{parentName:"ul"},"security configuration")),(0,r.kt)("h2",{id:"query"},"[query]"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"max_server_connections"),(0,r.kt)("td",{parentName:"tr",align:null},"Maximum concurrent connection request")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"query_sql_limit"),(0,r.kt)("td",{parentName:"tr",align:null},"The maximum SQL accounting when the request is requested")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"write_sql_limit"),(0,r.kt)("td",{parentName:"tr",align:null},"When writing a request on LINE_PROTOCOL, request  the maximum number of bytes")))),(0,r.kt)("h2",{id:"storage"},"[storage]"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"path"),(0,r.kt)("td",{parentName:"tr",align:null},"Data storage location")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"max_summary_size"),(0,r.kt)("td",{parentName:"tr",align:null},"The largest summary log size is used to restore data in the database, default: 134217728")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"max_level"),(0,r.kt)("td",{parentName:"tr",align:null},"LSM","'","s maximum number of layers, value range 0-4, default: 4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"base_file_size"),(0,r.kt)("td",{parentName:"tr",align:null},"Single file data size, default: 16777216")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"compact_trigger"),(0,r.kt)("td",{parentName:"tr",align:null},"Trigger the number of files file, default: 4")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"max_compact_size"),(0,r.kt)("td",{parentName:"tr",align:null},"Maximum compression size, default: 2147483648")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"dio_max_resident"),(0,r.kt)("td",{parentName:"tr",align:null},"Document IO","'","s maximum resident Page, default: 1024")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"dio_max_non_resident"),(0,r.kt)("td",{parentName:"tr",align:null},"Document IO Maximum Non-residing Page Quantity, Default: 1024")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"dio_page_len_scale"),(0,r.kt)("td",{parentName:"tr",align:null},"File IO Page Zoom ratio, default: 1")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"strict_write"),(0,r.kt)("td",{parentName:"tr",align:null},"Whether it is strictly written, default is False")))),(0,r.kt)("h2",{id:"wal"},"[wal]"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"enabled"),(0,r.kt)("td",{parentName:"tr",align:null},"Whether to enable Wal, default: false")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"path"),(0,r.kt)("td",{parentName:"tr",align:null},"Remote log path")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"sync"),(0,r.kt)("td",{parentName:"tr",align:null},"Synchronous Write WAL Remote Log, Default False")))),(0,r.kt)("h2",{id:"cache"},"[cache]"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"max_buffer_size"),(0,r.kt)("td",{parentName:"tr",align:null},"Maximum cache size, default: 134217728")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"max_immutable_number"),(0,r.kt)("td",{parentName:"tr",align:null},"ImmemTable maximum, default: 4")))),(0,r.kt)("h2",{id:"log"},"[log]"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"level"),(0,r.kt)("td",{parentName:"tr",align:null},"Log Level (Debug, Info, Error, Warn), Default: Info")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"path"),(0,r.kt)("td",{parentName:"tr",align:null},"Log storage location")))),(0,r.kt)("h2",{id:"security"},"[security]"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"tls_config"),(0,r.kt)("td",{parentName:"tr",align:null},"Optional, TLS configuration")))),(0,r.kt)("h3",{id:"securitytls_config"},"[security.tls_config]"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Parameter"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"certificate"),(0,r.kt)("td",{parentName:"tr",align:null},"TLS service certificate")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"private_key"),(0,r.kt)("td",{parentName:"tr",align:null},"TLS service private key")))),(0,r.kt)("h2",{id:"reporting_disabled"},"reporting_disabled"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Note"),"\uff1aIf close information collection"),(0,r.kt)("p",null,"The CnosDB collects information to better improve the product"),(0,r.kt)("p",null,"We do not collect user data, we only collect"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Database instance running time"),(0,r.kt)("li",{parentName:"ul"},"Operating system type and architecture run by database instance."),(0,r.kt)("li",{parentName:"ul"},"Database version"),(0,r.kt)("li",{parentName:"ul"},"Areas run by database instances, only at the provincial level, state level")),(0,r.kt)("p",null,"You can set this as True to shut down information collection at the top of the configuration file."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"reporting_disabled = true\n")))}c.isMDXComponent=!0}}]);