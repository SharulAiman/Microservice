const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

var connect = mysql.createPool({
  host: "us-cdbr-east-05.cleardb.net",
  user: "b60aeb8a3d95c4",
  password: "13f26d04",
  database: "heroku_9e3eec1049bc61a"
});

app.get('/', (req, res) => {
  res.send('hello world!');
  console.log('Running');
});

app.get('/display', (req, res) => {
  var micro_username = req.query.username;

  console.log("username: " + micro_username);

  connect.getConnection(function (err, connection) {
    if (err) { res.send('Error Database Connection'); }
    else {
      var sql = "SELECT * FROM customer";
      connect.query(sql, function (err, result) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      connection.release();
      });
    }
  });
});

app.post('/', (req, res) => {
  let micro_code = req.query.code;
  let micro_name = req.query.name;

  console.log(`code: ${micro_code} \nname: ${micro_name}`);

  connect.getConnection(function (err, connection) {
    if (err) { res.send('Error Database Connection'); }
    else {
      var sql = "INSERT INTO PROGRAM (PROGCODE, PROGNAME) VALUES('"+micro_code+"', '"+micro_name+"')";
      connect.query(sql, function (err, result) {
        if (err) {
          console.log('fail');
          res.send(result);
        }
        else {
          console.log('success');
          res.send(result);
        }
        connection.release();
      });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log('Example app listening to port 4005');
});
