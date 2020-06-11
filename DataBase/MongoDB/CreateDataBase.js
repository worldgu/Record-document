var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/zero";

//  创建数据库
// MongoClient.connect(url, {userNewUrlParser: true},function(err,db){
//     if (err) throw err;
//     console.log("数据库已创建!");
//     db.close;
// })

//  创建集合
// MongoClient.connect(url, {userNewUrlParser: true}, function (err, db) {
// 	if (err) throw err;
// 	console.log("创建数据库");
// 	var dbase = db.db("zero");
// 	dbase.createCollection('site', function(err, res) {
// 		if (err) throw err;
// 		console.log("创建集合!");
// 		db.close();
// 	})
// })

//  ===  数据库操作 ===
// 插入数据
// MongoClient.connect(url, {userNewUrlParser: true}, function (err, db) {
// 	if (err) throw err;
// 	var dbase = db.db("zero");
// 	var myobj = {name:"Test" , url : "zero"};

// 	dbase.collection("site").insertOne(myobj, function(err,res) {
// 		if (err) throw err;
// 		console.log("文档插入成功");

// 		db.close();
// 	})
// })

// 批量插入数据
MongoClient.connect(url, {userNewUrlParser:true},function(err,db){
	if (err) throw err;
	var dbase = db.db("zero");

	var myobj = [
		{ name : 'git', url: 'dfadfadfsa', type:'cn'},
		{ name : 'Google', url: 'dfadfadfsa', type:'cn'},
		{ name : 'FaceBook', url: 'dfadfadfsa', type:'cn'},
	]

	dbase.collection("site").insertMany(myobj, function(err,res) {
		if (err) throw err;
		console.log("插入的文档数量为： " + res.insertedCount);
		db.close();
	})
})
