const express = require('express');
const mysql = require('mysql');

const app = express();

//创建连接
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
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
    if (err) {
      console.error("err:", err);
    }
  })
})



app.listen('3000', () => {
  console.log('server started on port 3000');
})