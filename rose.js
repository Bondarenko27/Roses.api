const express = require('express')
const multer = require('multer')
const upload = multer ({dest:'statique/'})
const app = express()
var port = process.env.PORT||3000;
const mysql = require('mysql');
app.use(express.json());
app.use(express.static('/statique'));
app.use(express.urlencoded({ extended: true }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:'',
    database: "roses.api",
});

app.post('/addRose',upload.single('image'), (req, res) =>  {

    try{
        console.log(req.file,req.body);
    
    const roseName = (req.body.roseName)
    const roseType = (req.body.roseType)
    const fragrant = (req.body.fragrant)
    const roseColour =(req.body.roseColour)
    const image=(req.body.image)
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'statique/');
        },
    
        // By default, multer removes file extensions so let's add them back
        filename: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });
        con.connect(function(err){
        if (err) throw err;
        console.log("Connected!"); 
        var sql = "INSERT INTO roses(roseName, roseType, fragrant,roseColour,image) VALUES ('" + roseName + "','" + roseType + "','" + fragrant + "','" + roseColour + "','" + image + "');";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.send("1 record inserted");
            
          });

        });}
        
        catch(error){
            console.log()
        }
    

        

    });
    app.get('/listRoses', (req, res) => {
        //show list of roses
            con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "SELECT * FROM roses";
            con.query(sql, function (err, result) {
                if (err) throw err;
                res.send(result);
            });
            
        });
    
    });
    app.get("/image",(req,res)=>{
    const id =1
        const sqlInsert ="SELECT image FROM roses WHERE id =?;"
        con.query(sqlInsert,[id],(err,result)=>{
            if(err){
                console.log(err)
                res.send({
                    msg: err
                })
            }
            if(result){
                console.log(result);
                const path = require('path');

                var options = {
                    root: path.join('statique')
                };
                res.sendFile(result.image,options,function(err){
                    if(err){
                        console.log();
                    }
                })
                ({
                    
                });
            }

        });
    })
    
    app.get('/roseID', (req, res) => {
            //show pages with id
            
            con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            var sql = "SELECT * FROM roses ORDER BY id DESC LIMIT 5 OFFSET 0 ";
            con.query(sql, function (err, result) {
            
            res.json(result)
      })
    
    })   

})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });

