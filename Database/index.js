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
    password:''
});
db.connect(function (err) {
    if(err){
        console.log(err);
    }
    else{
        console.log("connection created with Mysql successfully");
    }
 });

 //Registration
app.post('/api/register',(req,res)=>{
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const dob=req.body.dob;
    const email=req.body.email;
    const pwd=req.body.pwd;
    const phno=req.body.phno;
    const stmt="INSERT INTO user (firstname,lastname,email,dob,pwd,phonenumber) VALUES (?,?,?,?,?,?);";
    db.query(stmt,[firstname,lastname,email,dob,pwd,phno],(errs,result)=>{
        console.log(errs)
        res.send("Hello world")
    })

})
//Login check
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

//get details for profile viewing and editing
app.post('/api/getDetails',(req,res)=>{
    const email=req.body.email;
    const stmt="SELECT * FROM user WHERE email=?;";
    db.query(stmt,[email],(errs,result)=>{
        res.send(result)
        }
    )
})
app.post('/api/update',(req,res)=>{
    const firstname=req.body.firstname;
    console.log(firstname)
    const lastname=req.body.lastname;
    const email=req.body.email;
    const phno=req.body.phno;
    const summary=req.body.summary;
    const stmt="UPDATE user SET firstname=?,lastname=?,email=?,phonenumber=?,summary=? WHERE email=?;";
    db.query(stmt,[firstname,lastname,email,phno,summary,email],(errs,result)=>{
        console.log(result)
        res.send("Hello world")
    })

})

app.post('/api/delete',(req,res)=>{
    const emails=req.body.email;
    console.log(emails);
    const stmt="DELETE FROM user WHERE email=?";
    db.query(stmt,[emails],(errs,result)=>{
        console.log(result)
        res.send("Hello world")
    })
})


app.get('/',(req,res)=>{
    res.send("frty")
})
app.listen(3001,()=>{
    console.log("Connected to port 3001");
})
