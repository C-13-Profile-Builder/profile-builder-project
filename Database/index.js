const express=require('express');
const app=express();
const bodyParser=require('body-parser')
const mysql=require('mysql');
const cors=require('cors')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json())
app.use(cors())
const db=mysql.createConnection({
    host:'localhost',
    port:3306,
    database:'sedb',
    user:'root',
    password:'password'
});
db.connect(function (err) {
    if(err){
        console.log(err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

app.post('/api/register',(req,res)=>{
    console.log("hii")
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const dob=req.body.dob;
    const email=req.body.email;
    const pwd=req.body.pwd;
    (firstname)
    // const stmt="INSERT INTO userss (fname,lname,dob,email,pwd) VALUES(?,?,?,?,?)"
    // db.query(stmt,[firstname,lastname,dob,email,pwd],(err,result=>{

    // }))
    const stmt="INSERT INTO user (firstname,lastname,email,dob,pwd) VALUES (?,?,?,?,?);";
    db.query(stmt,[firstname,lastname,email,dob,pwd],(errs,result)=>{
        console.log(errs)
        //res.send("Hello world")
    })

})
app.post('/api/login',(req,res)=>{
    const email=req.body.email;
    const pwd=req.body.pwd;
    const stmt="SELECT * FROM user WHERE email=? and pwd=?;";
    db.query(stmt,[email,pwd],(errs,result)=>{
        if(result.length>0)
        res.send("Yes")
        else{
            res.send("no")
        }
    })
})

app.get('/',(req,res)=>{
    res.send("frty")
})
app.listen(3001,()=>{
    console.log("Connected to port 3001");
})
