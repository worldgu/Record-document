# NodeJS Learing Log

> 进行nodeJSdemo级别的学习

## 回调函数

异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了

回调函数在完成任务后就会被调用，Node使用大量的回调函数，Node所有API都支持回调函数。

**案例**

我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回，这样在执行代码时就没有阻塞或等待文件I/O操作，

好处提高NodeJS的性能，可以处理大量额并发请求。

**CodeDemo**

### 阻塞代码示例

1. 创建一个文件 input.txt

   > 我要赚钱
   
    *小记: 以前我在看 Java的输入输出流的时候，老师讲他们记混，后来掌握了一个小窍门，以代码为对象，将文件读入程序使用inputi相关的类，将程序write到磁盘中的使用write相关的函数。*
   
2. main_Sync.js 文件

   ```javascript
   var fs = require("fs");
   
   var data = fs.readFileSync("input")
   
   console.log(data.toString());
   console.log("程序执行结束")
   ```

   

### 非阻塞代码实例

1.  创建main_Non_blocking.js

   ```javascript
   var fs = require("fs");
   
   fs.readFile("input.txt", function(err,data) {
       if (err) return console.error(err);
       console.log(data.toString());
   })
   
   console.log("程序执行结束!");
   ```

   

阻塞程序顺序执行，非阻塞程序可以和别的程序同时执行；

*小记: 又想起以前看到的JavaScript运行机制，Java进行初始化加载的时候，在比如说初始化方法中init();  里面有方法顺序调用，但是这些方法在执行的时候，可能不是顺序执行的，javaScript中有一个EventLoopGroup, 浏览器对Group中的所有方法loop执行,  <font color="red">看的时候偶尔有这个印象，如果有误欢迎指出</font>*



## 事件循环

1. Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。
2. Node.js 几乎每一个 API 都是支持回调函数的。
3. Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
4. Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

### 事件驱动程序

1. Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。
2. 当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。
3. 这个模型非常高效可扩展性非常强，因为 webserver 一直接受请求而不等待任何读写操作。（这也称之为非阻塞式IO或者事件驱动IO）
4. 在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

![image-20200604230533534](H:\MsbSpace\Zero\Record-document\前台\NodeJS\IMAGE\Event Loop.png)

 5. 整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(Subject)，而所有注册到这个事件上的处理函数相当于观察者(Observer)。

 6. 通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件。

    ```javascript
    // 引入events模块
    var events = require('events');
    // 创建 eventEmitter对象
    var eventEmitter = new events.EventEmitter();
    
    // 程序绑定事件处理程序
    eventEmitter.on('eventName', eventHandler);
    
    // 触发事件
    eventEmitter.emit('eventName');
    ```

	7. Demo

    ```javascript
    // 引入events 模块
    var events = require('events');
    // 创建eventEmitter 对象
    var eventEmitter = new events.EventEmitter();
    
    // 创建事件处理程序
    var connectHandler = function.connected() {
        console.log("连接成功");
        
        // 触发 data_received 事件
        eventEmitter.emit('data_received');    
    }
    
    // 绑定 connection 事件处理程序
    eventEmitter.on('connection', connectHandler);
    
    // 使用匿名函数绑定 data_received 事件
    eventEmitter.on('data_received', function() {
        console.log('数据接受成功');
    })
    
    // 触发 connection 事件
    eventEmitter.memit('connection');
    
    console.log('程序执行完毕');
    
    ```

    



















