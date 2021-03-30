const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mysql=require('mysql');
const request = require("request");// Simplify HTTP requests
const cheerio = require('cheerio'); // Parse HTML)password
const cors=require('cors');
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

app.get('/gs/:scholarID', (req, res) => {
    gsID=req.params.scholarID
    request.get({
      uri: 'https://scholar.google.co.uk/citations?user=' +  gsID,//+ "&sortby=pubdate",
      encoding: "binary"
    }, function (error, request, body) {
  
      let $ = cheerio.load(body);
      let articles=[];
      let profile={
        'prfphoto':$("#gsc_prf_pup-img").attr('src'),
        'prfname':$("#gsc_prf_in").text(),
        'prfdesc':$(".gsc_prf_il").eq(0).text(),
        'prfarea':$(".gsc_prf_inta").toArray().map(element => $(element).text()),
      };
      $(".gsc_a_tr").each(function (i, elem) {
        let inner = $(this);
        let article={
              'title':inner.find(".gsc_a_at").text(),
              'author':inner.find(".gs_gray").eq(0).text(),
              //'info':inner.find(".gs_gray").eq(1).text(),
              'cite':Number(inner.find(".gsc_a_c").find(".gs_ibl").text()),
              'year':Number(inner.find(".gsc_a_y").find(".gs_ibl").text())
          };
          articles.push(article);
      });
      profile['articles']=articles;
      const q1="INSERT INTO gsprofile (id,gs_id,prf_name,prf_des,photo_url) VALUES (?,?,?,?,?);";
      db.query(q1,[10,gsID,profile.prfname,profile.prfdesc,profile.prfphoto],(errs,result)=>{console.log(errs)})
      
      profile.prfarea.forEach((elem)=>{
        const q2="INSERT INTO gswork (id,domain) VALUES (?,?);";
        db.query(q2,[10,elem],(errs,result)=>{console.log(errs)})
      });

      articles.forEach((elem)=>{
        const q3="INSERT INTO gsarticle (id,title,cite,year,authors) VALUES (?,?,?,?,?);";
        db.query(q3,[10,elem.title,elem.cite,elem.year,elem.author],(errs,result)=>{console.log(err)})
      });
//      console.log(profile);
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(profile));  
    });
});

app.get('/',(req,res)=>{
    res.send("frty")
})
app.listen(3001,()=>{
    console.log("Connected to port 3001");
})
