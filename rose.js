const express = require('express')
const app = express()
const port = process.env.PORT||3000;
const mysql = require('mysql');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:'',
    database: "roses.api",
});

app.post('/addRose', (req, res) =>  {
    
    roseName = (req.body.roseName),
    roseType = (req.body.roseType),
    fragrant = (req.body.fragrant),
    roseColour =(req.body.roseColour)
        con.connect(function(err){
        if (err) throw err;
        console.log("Connected!"); 
        var sql = "INSERT INTO roses(roseName, roseType, fragrant,roseColour) VALUES ('" + roseName + "','" + roseType + "','" + fragrant + "','" + roseColour + "');";
        con.query(sql, function (err, result) {
            if (err) throw err;
            res.send("1 record inserted");
            
          });

        });

        

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

