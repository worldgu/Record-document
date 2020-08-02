// 引入events 模块
var events = require('events');
// 创建eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
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
eventEmitter.emit('connection');

console.log('程序执行完毕');