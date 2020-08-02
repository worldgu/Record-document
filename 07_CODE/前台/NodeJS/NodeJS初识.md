# NodeJS初识

Node.JS组成

1. **引入required模块:** 我们可以使用require执行来载入Node.js模块
2. **创建服务器:**  服务器可以监听客户端的请求，类似于Apache、Nginx等HTTP服务器
3. **接受请求与相应请求:**  服务器很容易创建，客户端可以使用浏览器或终端发送HTTP请求，服务器接受请求后返回响应数据。



## 创建服务器

```javascript
// 引入http模块
var http = require('http');

// 创建服务，并进行服务监听
http.createServer(function (request, response) {

	// 发送 HTTP头部
	//  HTTP 状态值： 200 ： ok
	// 内容类型 : text/plain
	response.writeHead(200, {'Context-Type':'text/plain'});

	//  发送相应数据 "Hello Wrold"
	response.end("Hello World\n");
}).listen(8888);

// 终端打印如下信息
console.log("Server running at http：// 127.0.0.1：8888/");
```

