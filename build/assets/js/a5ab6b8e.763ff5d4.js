"use strict";(self.webpackChunkCnosDB=self.webpackChunkCnosDB||[]).push([[9314],{4137:(t,e,n)=>{n.d(e,{Zo:()=>m,kt:()=>k});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function o(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},l=Object.keys(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(a=0;a<l.length;a++)n=l[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var s=a.createContext({}),p=function(t){var e=a.useContext(s),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},m=function(t){var e=p(t.components);return a.createElement(s.Provider,{value:e},t.children)},d="mdxType",c={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},u=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,l=t.originalType,s=t.parentName,m=o(t,["components","mdxType","originalType","parentName"]),d=p(n),u=r,k=d["".concat(s,".").concat(u)]||d[u]||c[u]||l;return n?a.createElement(k,i(i({ref:e},m),{},{components:n})):a.createElement(k,i({ref:e},m))}));function k(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=t,o[d]="string"==typeof t?t:r,i[1]=o;for(var p=2;p<l;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4986:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=n(7462),r=(n(7294),n(4137));const l={sidebar_position:8},i="Benchmark",o={unversionedId:"reference/performance",id:"reference/performance",title:"Benchmark",description:"To present CnosDB performance more intuitively, we do performance test of CnosDB and InfluxDB of the same time series database by using tsdb-comparisons.",source:"@site/docs/reference/performance.md",sourceDirName:"reference",slug:"/reference/performance",permalink:"/docs/reference/performance",draft:!1,editUrl:"https://github.com/cnosdb/docs/docs/reference/performance.md",tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"tutorialSidebar",previous:{title:"Eco-integration",permalink:"/docs/reference/ecosystem"},next:{title:"Manage",permalink:"/docs/category/manage-1"}},s={},p=[{value:"Basic Information",id:"basic-information",level:2},{value:"Testing Environment",id:"testing-environment",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Specific Steps",id:"specific-steps",level:2},{value:"Test Results",id:"test-results",level:2},{value:"Conclusion",id:"conclusion",level:2}],m={toc:p},d="wrapper";function c(t){let{components:e,...l}=t;return(0,r.kt)(d,(0,a.Z)({},m,l,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"benchmark"},"Benchmark"),(0,r.kt)("p",null,"To present CnosDB performance more intuitively, we do performance test of CnosDB and InfluxDB of the same time series database by using ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/cnosdb/tsdb-comparisons"},"tsdb-comparisons"),"."),(0,r.kt)("h2",{id:"basic-information"},"Basic Information"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null}),(0,r.kt)("th",{parentName:"tr",align:"center"},"CnosDB"),(0,r.kt)("th",{parentName:"tr",align:"center"},"InfluxDB"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Version"),(0,r.kt)("td",{parentName:"tr",align:"center"},"2.0.1"),(0,r.kt)("td",{parentName:"tr",align:"center"},"1.8.10")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Implementation language"),(0,r.kt)("td",{parentName:"tr",align:"center"},"rust"),(0,r.kt)("td",{parentName:"tr",align:"center"},"go")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Official website"),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("a",{parentName:"td",href:"http://www.cnosdb.com"},"www.cnosdb.com")),(0,r.kt)("td",{parentName:"tr",align:"center"},(0,r.kt)("a",{parentName:"td",href:"https://www.influxdata.com"},"https://www.influxdata.com"))))),(0,r.kt)("h2",{id:"testing-environment"},"Testing Environment"),(0,r.kt)("p",null,"To avoid being affected by network bandwidth while better simulating multi- tenant scenarios, our service side server opens a virtual machine as service side machines, while the client machine opens two Benchmark clients simultaneously and writes data to different databases of the service side virtual machine, CanosDB, or InfluxDB"),(0,r.kt)("p",null,"All tests run on our servers, with the following configurations:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Service side server\uff1a32 CPUs x Intel(R) Xeon(R) Gold 5218 CPU @ 2.30GHz\uff08memory\uff1a255.65 GB\uff09"),(0,r.kt)("p",{parentName:"li"},"Virtual machine CPU allocates 16 cores."),(0,r.kt)("p",{parentName:"li"},"Two disks in total, one is loaded into a virtual machine / opt- sdc1, performance Bench is as follows:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{src:n(4798).Z,width:"421",height:"586"})),(0,r.kt)("p",{parentName:"li"},"Other directory disk performance of virtual machines is as follows:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{src:n(9919).Z,width:"419",height:"584"})))),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Client server: 32 CPUs x Intel (R) Xion (R) Gold 5218 CPU @ 2.30GHz (memory 256)"),(0,r.kt)("p",{parentName:"li"},"Disk performance Bench is as follows:"),(0,r.kt)("p",{parentName:"li"},(0,r.kt)("img",{src:n(3450).Z,width:"426",height:"602"})))),(0,r.kt)("h2",{id:"configuration"},"Configuration"),(0,r.kt)("p",null,"The configuration of the CosDB is as follows:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"[storage]\n# Directory for summary: $path/summary/\n# Directory for index: $path/index/$database/\n# Directory for tsm: $path/data/$database/tsm/\n# Directory for delta: $path/data/$database/delta/\npath = '/opt/data/db'\nmax_summary_size = 134217728 # 128 * 1024 * 1024\nmax_level = 4\nbase_file_size = 16777216 # 16 * 1024 * 1024\ncompact_trigger = 4\nmax_compact_size = 2147483648 # 2 * 1024 * 1024 * 1024\ndio_max_resident = 1024\ndio_max_non_resident = 1024\ndio_page_len_scale = 10\nstrict_write = false\n\n[wal]\nenabled = true\npath = '/opt-sdc1/data/wal'\nsync = false\n\n[cache]\nmax_buffer_size = 10485760 # 10 * 1024 * 1024\nmax_immutable_number = 4\n\n[log]\nlevel = 'info'\npath = 'data/log'\n\n[security]\n# [security.tls_config]\n# certificate = \"./config/tls/server.crt\"\n# private_key = \"./config/tls/server.key\"\n")),(0,r.kt)("p",null,"InfluxDB is the default configuration except ","[data]"," and ","[meta]"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'[meta]\n  # Where the metadata/raft database is stored\n  dir = "/opt-sdc1/var/lib/influxdb/meta"\n[data]\n  # The directory where the TSM storage engine stores TSM files.\n  dir = "/opt/var/lib/influxdb/data"\n\n  # The directory where the TSM storage engine stores WAL files.\n  wal-dir = "/opt-sdc1/var/lib/influxdb/wal"\n')),(0,r.kt)("h2",{id:"specific-steps"},"Specific Steps"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install the db environment, go environment, etc. of the corresponding machine in advance, and ensure normal connection.")),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Install CnosDB\uff1a"),(0,r.kt)("p",{parentName:"li"},"Pull the code off GitHub."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"git clone https://github.com/cnosdb/cnosdb.git\n")),(0,r.kt)("p",{parentName:"li"},"Modify partial configurations in the ",(0,r.kt)("inlineCode",{parentName:"p"},"config/config.toml"),", run"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"cargo run --release run --cpu 64\n")),(0,r.kt)("p",{parentName:"li"},"Download InfluxDB, modify configurations in ",(0,r.kt)("inlineCode",{parentName:"p"},"etc/influxdb/influxdb.conf"),", run"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"wget https://dl.influxdata.com/influxdb/releases/influxdb-1.8.10_linux_amd64.tar.gz\ntar xvfz influxdb-1.8.10_linux_amd64.tar.gz\n./influxd run -config ../../etc/influxdb/influxdb.conf\n"))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Tsdb-comparisons generate data"),(0,r.kt)("p",{parentName:"li"},"Pull the code off GitHub."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},"git clone https://github.com/cnosdb/tsdb-comparisons.git\n")),(0,r.kt)("p",{parentName:"li"},"Compile Running Generated Data"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'cd tsdb-comparisons/cmd/generate_data\ngo build\n./generate_data --use-case="iot" --seed=123 --scale=100          --timestamp-start="2022-01-01T00:00:00Z" --timestamp-end="2023-01-01T00:00:00Z" --log-interval="50s" --format="influx"   > <file_path>/data.txt\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Test CnosDB writes"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'cd tsdb-comparisons/cmd/load_cnosdb\ngo build\n./load_cnosdb --do-abort-on-exist=false --do-create-db=false --gzip=false        --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:31007"   --batch-size=<batch_size_num> --workers=<workers_num>\n'))),(0,r.kt)("li",{parentName:"ol"},(0,r.kt)("p",{parentName:"li"},"Test InfluxDB writes"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre"},'cd tsdb-comparisons/cmd/load_influx\ngo build\n./load_influx --do-abort-on-exist=false --do-create-db=true --gzip=false --file=<file_path>/data.txt  --db-name=<db_name> --urls="http://<ip>:8086"  --batch-size=<batch_size_num> --workers=<workers_num>\n')))),(0,r.kt)("h2",{id:"test-results"},"Test Results"),(0,r.kt)("p",null,"In our test scenario, InfluxDB can but do wrokers = 100(100 concurrent scenarios), with the test results as follows (row and metric units: 10,000):"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null}),(0,r.kt)("th",{parentName:"tr",align:null},"CnosDB"),(0,r.kt)("th",{parentName:"tr",align:null}),(0,r.kt)("th",{parentName:"tr",align:null},"InfluxDB"),(0,r.kt)("th",{parentName:"tr",align:null}))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch-size"),(0,r.kt)("td",{parentName:"tr",align:null},"overall row/s"),(0,r.kt)("td",{parentName:"tr",align:null},"overall metric/s"),(0,r.kt)("td",{parentName:"tr",align:null},"overall row/s"),(0,r.kt)("td",{parentName:"tr",align:null},"overall metric/s")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"20000"),(0,r.kt)("td",{parentName:"tr",align:null},"75"),(0,r.kt)("td",{parentName:"tr",align:null},"604"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"10000"),(0,r.kt)("td",{parentName:"tr",align:null},"68"),(0,r.kt)("td",{parentName:"tr",align:null},"538"),(0,r.kt)("td",{parentName:"tr",align:null},"54"),(0,r.kt)("td",{parentName:"tr",align:null},"420")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"5000"),(0,r.kt)("td",{parentName:"tr",align:null},"66"),(0,r.kt)("td",{parentName:"tr",align:null},"512"),(0,r.kt)("td",{parentName:"tr",align:null},"61"),(0,r.kt)("td",{parentName:"tr",align:null},"480")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2500"),(0,r.kt)("td",{parentName:"tr",align:null},"53"),(0,r.kt)("td",{parentName:"tr",align:null},"420"),(0,r.kt)("td",{parentName:"tr",align:null},"57"),(0,r.kt)("td",{parentName:"tr",align:null},"450")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1000"),(0,r.kt)("td",{parentName:"tr",align:null},"43"),(0,r.kt)("td",{parentName:"tr",align:null},"330"),(0,r.kt)("td",{parentName:"tr",align:null},"49"),(0,r.kt)("td",{parentName:"tr",align:null},"389")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"6"),(0,r.kt)("td",{parentName:"tr",align:null},"48"),(0,r.kt)("td",{parentName:"tr",align:null},"2.5"),(0,r.kt)("td",{parentName:"tr",align:null},"15")))),(0,r.kt)("p",null,"We take the data in Benchmark when database writing levels off which is valued at the sum of two clients."),(0,r.kt)("p",null,"When the batch-size is set to 20,000, InfluxDB returns an error on the client:"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},'{"error":"engine: cache-max-memory-size exceeded: (1074767264/1073741824)"}'),"\uff0c"),(0,r.kt)("p",null,"So we did not test the performance of InfluxDB in this case, but you can see that CnosDB is better than InfluxDB in most scenarios."),(0,r.kt)("p",null,"In addition, CnosDB supports higher concurrent numbers, and we also test the performance of CnosDB under workrs = 200 (200 concurrent scenarios). The results are as follows (row and metric units: 10,000):"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null}),(0,r.kt)("th",{parentName:"tr",align:null},"CnosDB"),(0,r.kt)("th",{parentName:"tr",align:null}))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"batch-size"),(0,r.kt)("td",{parentName:"tr",align:null},"overall row/s"),(0,r.kt)("td",{parentName:"tr",align:null},"overall metric/s")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"20000"),(0,r.kt)("td",{parentName:"tr",align:null},"75"),(0,r.kt)("td",{parentName:"tr",align:null},"601")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"10000"),(0,r.kt)("td",{parentName:"tr",align:null},"75"),(0,r.kt)("td",{parentName:"tr",align:null},"607")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"5000"),(0,r.kt)("td",{parentName:"tr",align:null},"67"),(0,r.kt)("td",{parentName:"tr",align:null},"518")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"2500"),(0,r.kt)("td",{parentName:"tr",align:null},"60"),(0,r.kt)("td",{parentName:"tr",align:null},"463")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1000"),(0,r.kt)("td",{parentName:"tr",align:null},"49"),(0,r.kt)("td",{parentName:"tr",align:null},"382")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"1"),(0,r.kt)("td",{parentName:"tr",align:null},"6"),(0,r.kt)("td",{parentName:"tr",align:null},"47")))),(0,r.kt)("p",null,"With the increase of concurrent numbers, performance in some scenarios will also be improved, and CnosDB performance has a higher ceiling."),(0,r.kt)("h2",{id:"conclusion"},"Conclusion"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"CnosDB has higher performance than InfluxDB in most cases."),(0,r.kt)("li",{parentName:"ol"},"CnosDB can support higher concurrent, higher batch-size than InfluxDB."),(0,r.kt)("li",{parentName:"ol"},"We do not compare with other time series databases that do not support Line Productol or transform line Protocol on the client, which is not fair for CnosDB and InfluxDB that writes directly to Line Protocol.")))}c.isMDXComponent=!0},3450:(t,e,n)=>{n.d(e,{Z:()=>a});const a=n.p+"assets/images/19bench-0c2a4a2fb850aa7694a2ca431424b9b7.png"},4798:(t,e,n)=>{n.d(e,{Z:()=>a});const a=n.p+"assets/images/nvme_bench-74fe5521e5e035ac95179228e7e7500b.png"},9919:(t,e,n)=>{n.d(e,{Z:()=>a});const a=n.p+"assets/images/other_bench-8bd47e323a157d9f38fd9f392cf49e83.png"}}]);