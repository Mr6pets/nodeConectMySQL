const express = require('express');
const mysql = require('mysql');

const app = express();

//创建连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})

//connect
db.connect(function (err) {
  if (err) {
    console.error('error connecting: ', err)
  }
  console.log('connection id is ', db.threadId);
})

//创建数据库
app.get("/createdb", (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';//'CREATE DATABASE'为sql语句，'nodemysql'为数据库名称
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('server is created');
  })
})

//创建表
app.get("/createpoststable", (res, req) => {
  //创建一个表为posts 
  //其中包含 id 类型是整形 自增; title body primary:主键为id
  let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("posts表已近建立");
  })
})

//插入内容 post1
app.get('/addpost1', (res, req) => {
  let post = { title: 'post one', body: 'this is post one' };
  let sql = 'INSERT INTO posts SET ?';//这里的问号可以将上面的post的值通过db.query(sql,post)添加
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('内容已经插入到表中');
  })
})

//插入内容 post2
app.get('/addpost2', (res, req) => {
  let post = { title: 'post two', body: 'this is post two' };
  let sql = 'INSERT INTO posts SET ?';//这里的问号可以将上面的post的值通过db.query(sql,post)添加
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('内容已经插入到表中');
  })
})

//查询多条内容
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("查询成功");
    res.json(result);
  })
})

//查询单条内容
app.get('/getposts/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  })
})

//更新内容
app.get('/updatepost/:id', (req, res) => {
  let newTitle = "update title";
  // ${newTitle} 的内容是字符串 所以要用单引号引起来；
  let sql = `UPDATE posts SET title='${newTitle}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  })
})

//删除内容
app.get('/deletepost/:id', (req, res) => {
  let sql = `DELETE FROM posts WHERE id =${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  })
})


app.listen('3000', () => {
  console.log('server started on port 3000');
})