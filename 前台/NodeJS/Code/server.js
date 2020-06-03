var http = require('http');

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

