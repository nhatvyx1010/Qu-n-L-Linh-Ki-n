const mysql = require('mysql');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'qllk'
});
//connect to database
// connection.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('connected to database');
//     connection.query("select * from member", function(err, result){
//         if(err) throw err;
//         console.log(result);
//     });
//     connection.query("select * from sanpham", function(err, result){
//         if(err) throw err;
//         console.log(result);
//     })
// });

module.exports = connection;