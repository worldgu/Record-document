# MongoDB 数据库

```javascript
// cnpm 安装 mongodb
cnpm install mongodb

// 创建数据库
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/zero";

MongoClient.connection(url, {userNewUrlParser: true},function(err,db){
    if (err) throw err;
    console.log("数据库已创建!");
    db.close;
})



```



```shell
# 查看数据库
show dbs
# 显示所有表
show tables
# 显示表下的数据
db.tables.find()

```

