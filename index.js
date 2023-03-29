var express = require('express')
var app = express();
var conn = require('./db');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

//ket qua
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.sendFile(__dirname+'/register.html');
});
app.post('/', function(req, res){
    console.log(req.body);
    var name = req.body.name;
    var diaChi = req.body.diaChi;
    var viTri = req.body.viTri;
    var phone = req.body.phone;
    var username = req.body.username;
    var password = req.body.password;
    
    conn.connect(function(err){
        if(err) throw err;
        var sql = "insert into member(hoTen, diaChi, viTri, soDienThoai, username, password) values('"+name+"','"+diaChi+"', '"+viTri+"', '"+phone+"','"+username+"', '"+password+"')";
        conn.query(sql, function(err, result){
            if(err){
                throw err;
            }
            // res.send('member id: '+result.insertId);
            res.redirect('/memberEjs');
        });
    });
});
app.get('/product', function(req, res){
    res.sendFile(__dirname+'/product.html');
})
app.post('/product', function(req, res){
    var tenSanPham = req.body.tenSanPham;
    var giaBan = req.body.giaBan;
    var tonKho = req.body.tonKho;
    var img = req.body.img;

    conn.connect(function(err){
        console.log(req.body);
        if(err) throw err;
        var sql = "insert into sanpham(tenSanPham, tonKho, gia, img) values ('"+tenSanPham+"', '"+tonKho+"', '"+giaBan+"', '"+img+"')";
        conn.query(sql, function(err, result){
            if(err) throw err;
            res.redirect('/productEjs');
            
            // res.send('product id: '+result.insertId);
        });
    });
    
});

app.get('/memberEjs', function(req, res){
    conn.connect(function(err){
        if(err){
            throw err;
        }
        var sql = "select * from member";
        conn.query(sql, function(err, result){
            if(err){
                throw err;
            }
            res.render(__dirname+"/views/memberEjs", {memberEjs:result});
        });
    });
});
app.get('/productEjs', function(req, res){
    conn.connect(function(err){
        if(err) throw err;
        var sql = "select * from sanpham";
        conn.query(sql, function(err, result){
            if(err) throw err;
            res.render(__dirname+"/views/productEjs", {productEjs:result});
        });
    });
});
// DELETE
app.get('/delete-member', function(req, res){
    conn.connect(function(err){
        if(err) throw err;
        var sql = "delete from member where memberID=?";
        var id = req.query.id;
        console.log(sql);
        conn.query(sql, [id], function(err, result){
            if(err) throw err;
            res.redirect('/memberEjs');
        });
    });
});
app.get('/delete-product', function(req, res){
    conn.connect(function(err){
        if(err) throw err;
        var sql = "delete from sanpham where sanphamID=?";
        var id = req.query.id;
        console.log(sql);
        conn.query(sql, [id], function(err, result){
            if(err) throw err;
            res.redirect('/productEjs');
        });
    });
});

// UPDATE
app.get('/update-member', function(req, res){
    conn.connect(function(err){
        if(err) throw err;
        var sql = "select * from member where memberID=?";
        var id = req.query.id;
        conn.query(sql, [id], function(err, result){
            if(err) throw err;
            // res.redirect('/productEjs');
            res.render(__dirname+"/views/update-member", {memberEjs:result});
        });
    });
});
app.get('/update-product', function(req, res){
    conn.connect(function(err){
        if(err) throw err;
        var sql = "select * from sanpham where sanphamID=?";
        var id = req.query.id;
        conn.query(sql, [id], function(err, result){
            if(err) throw err;
            // res.redirect('/productEjs');
            res.render(__dirname+"/views/update-product", {productEjs:result});
        });
    });
});
app.get('/update-member', function(req, res){
    var name = req.body.name;
    var diaChi = req.body.diaChi;
    var viTri = req.body.viTri;
    var soDienThoai = req.body.soDienThoai;
    var username = req.body.username;
    var password = req.body.password;
    var id = req.query.id;
    conn.connect(function(err){
        if(err) throw err;
        var sql = "UPDATE member set hoTen=?,diaChi=?, viTri=?, soDienThoai=?, username=?, password=? where id=?";

        conn.query(sql, [name, diaChi, viTri, soDienThoai, username, password, id], function(err, result){
            if(err) throw err;
            console.log("dsadas");
            res.redirect('/memberEjs');
        });
    });
});
// set the app to listen on the port
app.listen(3000, () => {
    console.log(`Server running on port: 3000`);
});