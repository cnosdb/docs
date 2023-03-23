"use strict";(self.webpackChunkCnosDB=self.webpackChunkCnosDB||[]).push([[5502],{4137:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,h=u["".concat(l,".").concat(m)]||u[m]||c[m]||i;return n?a.createElement(h,o(o({ref:t},d),{},{components:n})):a.createElement(h,o({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:r,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3643:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>c,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var a=n(7462),r=(n(7294),n(4137));const i={sidebar_position:2},o="Wirte Data",s={unversionedId:"develop/write",id:"develop/write",title:"Wirte Data",description:"CnosDB supports a variety of writing methods, including: direct writing with SQL from the command line, and writing using HTTP API.",source:"@site/docs/develop/write.md",sourceDirName:"develop",slug:"/develop/write",permalink:"/docs/develop/write",draft:!1,editUrl:"https://github.com/cnosdb/docs/docs/develop/write.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Connect to CnosDB",permalink:"/docs/develop/api"},next:{title:"Query Data",permalink:"/docs/develop/query"}},l={},p=[{value:"SQL",id:"sql",level:2},{value:"Insert One Record",id:"insert-one-record",level:3},{value:"Insert Multiple Records",id:"insert-multiple-records",level:3},{value:"HTTP API",id:"http-api",level:2},{value:"Insert One Record",id:"insert-one-record-1",level:3},{value:"Syntax",id:"syntax",level:4},{value:"Example",id:"example",level:4},{value:"Insert Multiple Records",id:"insert-multiple-records-1",level:3},{value:"Syntax",id:"syntax-1",level:4},{value:"Example",id:"example-1",level:4},{value:"Load Data",id:"load-data",level:3},{value:"Syntax",id:"syntax-2",level:4},{value:"Example",id:"example-2",level:4},{value:"Golang",id:"golang",level:2},{value:"Code",id:"code",level:4},{value:"Python",id:"python",level:2},{value:"Code",id:"code-1",level:4},{value:"Java",id:"java",level:2},{value:"Code",id:"code-2",level:4},{value:"Rust",id:"rust",level:2},{value:"Code",id:"code-3",level:4},{value:"C++",id:"c",level:2},{value:"Code",id:"code-4",level:4}],d={toc:p},u="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"wirte-data"},"Wirte Data"),(0,r.kt)("p",null,"CnosDB supports a variety of writing methods, including: direct writing with SQL from the command line, and writing using HTTP API."),(0,r.kt)("h2",{id:"sql"},"SQL"),(0,r.kt)("p",null,"CnosDB supports single write and multiple write using SQL."),(0,r.kt)("h3",{id:"insert-one-record"},"Insert One Record"),(0,r.kt)("p",null,"You can see ",(0,r.kt)("a",{parentName:"p",href:"/docs/reference/sql#insert-one-record"},"Insert One Record"),"."),(0,r.kt)("h3",{id:"insert-multiple-records"},"Insert Multiple Records"),(0,r.kt)("p",null,"You can see ",(0,r.kt)("a",{parentName:"p",href:"/docs/reference/sql#insert-multiple-records"},"Insert Multiple Records"),"."),(0,r.kt)("h2",{id:"http-api"},"HTTP API"),(0,r.kt)("h3",{id:"insert-one-record-1"},"Insert One Record"),(0,r.kt)("h4",{id:"syntax"},"Syntax"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/sql"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "<username>:<password>" -H "Accept: application/json" \\\n-XPOST "http://<cnosdb_url>:<cnosdb_port>/api/v1/sql?db=<database_name>&pretty=true" \\\n-d "<your SQL statement>"\n'))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/write"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "<username>:<password>" -H "Accept: application/json" \\\n-XPOST "http://<cnosdb_url>:<cnosdb_port>/api/v1/write?db=<database_name>&pretty=true" \\\n-d "<your data>"\n')),(0,r.kt)("p",{parentName:"li"},"Notice that the data to be inserted should be in the format of ",(0,r.kt)("a",{parentName:"p",href:"https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/"},"Line Protocol"),"."))),(0,r.kt)("h4",{id:"example"},"Example"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/sql"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "cnosdb:" -H "Accept: application/json" \\\n-XPOST "http://127.0.0.1:31007/api/v1/sql?db=oceanic_station" \\\n-d "INSERT INTO air (TIME, station, visibility, temperature, pressure) \nVALUES (1666165200290401000, \'XiaoMaiDao\', 56, 69, 77);"\n'))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/write"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "cnosdb:" -H "Accept: application/json" \\\n-XPOST "http://127.0.0.1:31007/api/v1/write?db=oceanic_station" \\\n-d "air,station=XiaoMaiDao visibility=50,temperature=63,pressure=52 1642176000000000000"\n')))),(0,r.kt)("h3",{id:"insert-multiple-records-1"},"Insert Multiple Records"),(0,r.kt)("h4",{id:"syntax-1"},"Syntax"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/sql"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "<username>:<password>" -H "Accept: application/json" \\\n-XPOST "http://<cnosdb_url>:<cnosdb_port>/api/v1/sql?db=<database_name>&pretty=true" \\\n-d "<your SQL statement>"\n'))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/write"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "<username>:<password>" -H "Accept: application/json" \\\n-XPOST "http://<cnosdb_url>:<cnosdb_port>/api/v1/write?db=<database_name>&pretty=true" \\\n-d "<your data> \n    <your data>"\n')),(0,r.kt)("p",{parentName:"li"},"  Notice that the data to be inserted should be in the format of ",(0,r.kt)("a",{parentName:"p",href:"https://docs.influxdata.com/influxdb/v2.3/reference/syntax/line-protocol/"},"Line Protocol"),"."))),(0,r.kt)("h4",{id:"example-1"},"Example"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/sql"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},"curl -i -u \"cnosdb:\" -H \"Accept: application/json\" \\\n-XPOST \"http://127.0.0.1:31007/api/v1/sql?db=oceanic_station\" \\\n-d \"INSERT INTO air (TIME, station, visibility, temperature, pressure)\nVALUES ('2022-10-19 05:40:00', 'XiaoMaiDao', 55, 68, 76), ('2022-10-19 04:40:00', 'XiaoMaiDao', 55, 68, 76);\"\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"use api ",(0,r.kt)("inlineCode",{parentName:"strong"},"/api/v1/write"))),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "cnosdb:" -H "Accept: application/json" \\\n-XPOST "http://127.0.0.1:31007/api/v1/write?db=oceanic_station" \\\n-d "air,station=XiaoMaiDao visibility=50,temperature=63,pressure=52 1642176000000000000\n    air,station=XiaoMaiDao visibility=50,temperature=63,pressure=52 1642176000000000000"\n')))),(0,r.kt)("h3",{id:"load-data"},"Load Data"),(0,r.kt)("h4",{id:"syntax-2"},"Syntax"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'curl -i -u "<username>:<password>" -H "Accept: application/json" \\\n-XPOST "http://<cnosdb_url>:<cnosdb_port>/api/v1/write?db=<database_name>&pretty=true" \\\n--data-binary @<data_file_path>\n')),(0,r.kt)("h4",{id:"example-2"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-shell"},'wget https://fastdl.cnosdb.com/cpizkpfk/oceanic_station.txt &&\ncurl -i -u "cnosdb:" -H "Accept: application/json" \\\n-XPOST "http://127.0.0.1:31007/api/v1/write?db=oceanic_station" \\\n--data-binary @./oceanic_station.txt\n')),(0,r.kt)("h2",{id:"golang"},"Golang"),(0,r.kt)("h4",{id:"code"},"Code"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport (\n    "fmt"\n    "net/http"\n    "bytes"\n    "encoding/base64"\n)\n\nfunc main() {\n    username := "<username>"\n    password := "<password>"\n    url := "http://<cnosdb_url>:<cnosdb_port>/api/v1/sql?db=<database_name>&pretty=true"\n    sqlStatement := "<your SQL statement>"\n\n    client := &http.Client{}\n    req, err := http.NewRequest("POST", url, bytes.NewBufferString(sqlStatement))\n    if err != nil {\n        panic(err)\n    }\n\n    // add Authorization header\n    authStr := username + ":" + password\n    encodedAuth := base64.StdEncoding.EncodeToString([]byte(authStr))\n    req.Header.Set("Authorization", "Basic "+encodedAuth)\n\n    // add Accept header\n    req.Header.Set("Accept", "application/json")\n\n    resp, err := client.Do(req)\n    if err != nil {\n        panic(err)\n    }\n    defer resp.Body.Close()\n\n    // print response\n    fmt.Println("Status Code:", resp.StatusCode)\n    fmt.Println("Response Body:")\n    buf := new(bytes.Buffer)\n    buf.ReadFrom(resp.Body)\n    fmt.Println(buf.String())\n}\n')),(0,r.kt)("p",null,"When using the api ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write"),", just replace the api address wth ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write")," and replace ",(0,r.kt)("inlineCode",{parentName:"p"},"<your SQL statement>")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"<your data>"),"."),(0,r.kt)("h2",{id:"python"},"Python"),(0,r.kt)("h4",{id:"code-1"},"Code"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},'import requests\n\nusername = "<username>"\npassword = "<password>"\ncnosdb_url = "<cnosdb_url>"\ncnosdb_port = "<cnosdb_port>"\ndatabase_name = "<database_name>"\nsql_statement = "<your SQL statement>"\n\nurl = f"http://{cnosdb_url}:{cnosdb_port}/api/v1/sql?db={database_name}&pretty=true"\nheaders = {"Accept": "application/json"}\ndata = {"query": sql_statement}\n\nresponse = requests.post(url, auth=(username, password), headers=headers, json=data)\n\nprint(response.text)\n')),(0,r.kt)("p",null,"When using the api ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write"),", just replace the api address wth ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write")," and replace ",(0,r.kt)("inlineCode",{parentName:"p"},"<your SQL statement>")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"<your data>"),"."),(0,r.kt)("h2",{id:"java"},"Java"),(0,r.kt)("h4",{id:"code-2"},"Code"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'import java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.net.HttpURLConnection;\nimport java.net.URL;\nimport java.util.Base64;\n\npublic class CurlToJava {\n\n    public static void main(String[] args) throws Exception {\n        String username = "<username>";\n        String password = "<password>";\n        String cnosdbUrl = "<cnosdb_url>";\n        String cnosdbPort = "<cnosdb_port>";\n        String dbName = "<database_name>";\n        String sqlStatement = "<your SQL statement>";\n        \n        String apiUrl = "http://" + cnosdbUrl + ":" + cnosdbPort + "/api/v1/sql?db=" + dbName + "&pretty=true";\n        String auth = username + ":" + password;\n        byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());\n        String authHeaderValue = "Basic " + new String(encodedAuth);\n        \n        URL url = new URL(apiUrl);\n        HttpURLConnection connection = (HttpURLConnection) url.openConnection();\n        connection.setRequestMethod("POST");\n        connection.setRequestProperty("Accept", "application/json");\n        connection.setRequestProperty("Authorization", authHeaderValue);\n        connection.setDoOutput(true);\n\n        String requestBody = sqlStatement;\n        connection.getOutputStream().write(requestBody.getBytes());\n\n        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));\n        String line;\n        while ((line = bufferedReader.readLine()) != null) {\n            System.out.println(line);\n        }\n        bufferedReader.close();\n        connection.disconnect();\n    }\n}\n')),(0,r.kt)("p",null,"When using the api ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write"),", just replace the api address wth ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write")," and replace ",(0,r.kt)("inlineCode",{parentName:"p"},"<your SQL statement>")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"<your data>"),"."),(0,r.kt)("h2",{id:"rust"},"Rust"),(0,r.kt)("h4",{id:"code-3"},"Code"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-rust"},'use reqwest::header::{Authorization, HeaderValue, ACCEPT};\nuse std::error::Error;\n\n#[tokio::main]\nasync fn main() -> Result<(), Box<dyn Error>> {\n    let username = "<username>";\n    let password = "<password>";\n    let cdb_url = "<cnosdb_url>";\n    let cdb_port = "<cnosdb_port>";\n    let database_name = "<database_name>";\n    let sql_statement = "<your SQL statement>";\n\n    let url = format!(\n        "http://{}:{}/api/v1/sql?db={}&pretty=true",\n        cdb_url, cdb_port, database_name\n    );\n    \n    let client = reqwest::Client::new();\n    let res = client\n        .post(&url)\n        .header(ACCEPT, "application/json")\n        .header(\n            Authorization(format!("Basic {}", base64::encode(format!("{}:{}", username, password))))\n        )\n        .body(sql_statement)\n        .send()\n        .await?;\n\n    println!("{}", res.text().await?);\n\n    Ok(())\n}\n')),(0,r.kt)("p",null,"When using the api ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write"),", just replace the api address wth ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write")," and replace ",(0,r.kt)("inlineCode",{parentName:"p"},"<your SQL statement>")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"<your data>"),"."),(0,r.kt)("h2",{id:"c"},"C++"),(0,r.kt)("h4",{id:"code-4"},"Code"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-cpp"},'#include <iostream>\n#include <curl/curl.h>\n\nint main() {\n  CURL *curl;\n  CURLcode res;\n\n  std::string username = "your_username";\n  std::string password = "your_password";\n  std::string cnosdb_url = "your_cnosdb_url";\n  int cnosdb_port = 1234;\n  std::string database_name = "your_database_name";\n  std::string sql_statement = "your_sql_statement";\n\n  std::string url = "http://" + cnosdb_url + ":" + std::to_string(cnosdb_port) + "/api/v1/sql?db=" + database_name + "&pretty=true";\n\n  curl_global_init(CURL_GLOBAL_DEFAULT);\n  curl = curl_easy_init();\n  if (curl) {\n    curl_easy_setopt(curl, CURLOPT_URL, url.c_str());\n    curl_easy_setopt(curl, CURLOPT_USERNAME, username.c_str());\n    curl_easy_setopt(curl, CURLOPT_PASSWORD, password.c_str());\n    curl_easy_setopt(curl, CURLOPT_HTTPHEADER, "Accept: application/json");\n    curl_easy_setopt(curl, CURLOPT_POSTFIELDS, sql_statement.c_str());\n    curl_easy_setopt(curl, CURLOPT_POST, 1L);\n    res = curl_easy_perform(curl);\n\n    if (res != CURLE_OK) {\n      std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;\n    }\n\n    curl_easy_cleanup(curl);\n  }\n\n  curl_global_cleanup();\n  return 0;\n}\n')),(0,r.kt)("p",null,"When using the api ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write"),", just replace the api address wth ",(0,r.kt)("inlineCode",{parentName:"p"},"/api/v1/write")," and replace ",(0,r.kt)("inlineCode",{parentName:"p"},"<your SQL statement>")," with ",(0,r.kt)("inlineCode",{parentName:"p"},"<your data>"),"."))}c.isMDXComponent=!0}}]);