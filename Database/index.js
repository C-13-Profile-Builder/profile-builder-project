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
    const userType=req.body.userType;
    const GS_ID=req.body.GS_ID;
    const stmt="INSERT INTO user (firstname,lastname,email,dob,pwd,phonenumber,Faculty,GS_ID) VALUES (?,?,?,?,?,?,?,?);";
    db.query(stmt,[firstname,lastname,email,dob,pwd,phno,userType,GS_ID],(errs,result)=>{
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
    console.log(email)
    const stmt="SELECT * FROM user WHERE email=?;";
    db.query(stmt,[email],(errs,result)=>{
        res.send(result)
        }
    )
})
//Insert Into Favorites Table
app.post('/api/insertFavorites',(req,res)=>{
    const id=req.body.id;
    const gsid=req.body.gsid;
    const stmt1="Select * from favorites where GS_ID=? and id=?;";
    db.query(stmt1,[gsid,id],(errs,result)=>{
    if(result.length>0){
        res.send("Yes")
    }
    else{
        const stmt="INSERT INTO favorites (id,GS_ID) VALUES (?,?);";
        db.query(stmt,[id,gsid],(errs,result)=>{
            console.log(errs)
            res.send("No")
        })
    }
    })
    
})
//Delete from Favorites Table
app.post('/api/deleteFavorites',(req,res)=>{
    const id=req.body.id;
    const gsid=req.body.gsid;
    const stmt="Delete from favorites where id=? and GS_ID=?;";
    db.query(stmt,[id,gsid],(err,result)=>{
        res.send("Success")
    })
})

//get Favorited profile's gs_id
app.post('/api/favorites',(req,res)=>{
    const userid=req.body.id;
    const stmt="SELECT gsprofile.gs_id,gsprofile.prf_name,gsprofile.prf_des,gsprofile.photo_url FROM favorites,gsprofile where favorites.id=? and favorites.GS_ID=gsprofile.gs_id"
    db.query(stmt,[userid],(err,result)=>{
        res.send(result)
    })
})
//update user details
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
//update Password
app.post('/api/updatePassword',(req,res)=>{
    
    const email=req.body.email;
    const pwd=req.body.pwd;
    const stmt="UPDATE user SET password=? WHERE email=?;";
    db.query(stmt,[pwd,email],(errs,result)=>{
        console.log(result)
        res.send("Hello world")
    })

})

//delete user
app.post('/api/delete',(req,res)=>{
    const emails=req.body.email;
    console.log(emails);
    const stmt="DELETE FROM user WHERE email=?";
    db.query(stmt,[emails],(errs,result)=>{
        console.log(result)
        res.send("Hello world")
    })
})
//generate details in webpage
app.post('/api/generate',(req,res)=>{
    const subject_name=req.body.subject_name;
    const stmt="SELECT gsprofile.gs_id,gsprofile.prf_name,gsprofile.prf_des,gsprofile.photo_url FROM gswork,gsprofile where domain=? and gswork.id=gsprofile.id"
    db.query(stmt,[subject_name],(err,result)=>{
        console.log(result)
        if(result.length==0){
            const stmt1="SELECT DISTINCT gsprofile.gs_id,gsprofile.prf_name,gsprofile.prf_des,gsprofile.photo_url FROM gswork,gsprofile where prf_name=? and gswork.id=gsprofile.id"
            db.query(stmt1,[subject_name],(err1,result1)=>{
                console.log(result1)
                res.send(result1)
            })
        }
        else{
            res.send(result)
        }
        })
})
//get prf_name, domain
app.post('/api/getForDropdown',(req,res)=>{
    const stmt="SELECT prf_name FROM gsprofile"
    const stmt1="SELECT domain FROM gswork"
    db.query(stmt,(err,result)=>{
        db.query(stmt1,(err1,result1)=>{
            res.send([result,result1]) 
        })
    })
})

//generate all details of a faculty
app.post('/api/generateallarticleOfAFaculty',(req,res)=>{
    const id=req.body.gsid;
    const stmt="SELECT gswork.domain FROM gswork,user where user.GS_ID=? and gswork.id=user.id";
    const stmtone="SELECT gsprofile.gs_id,gsprofile.prf_name,gsprofile.prf_des,gsprofile.photo_url,user.email,user.phonenumber FROM gsprofile,user where gsprofile.gs_id=? and user.id=gsprofile.id";
    const stmttwo="SELECT gsarticle.title,gsarticle.cite,gsarticle.year,gsarticle.authors from gsarticle,user where user.GS_ID=? and user.id=gsarticle.id"
    db.query(stmt,[id],(err,result)=>{
        console.log(result)
        db.query(stmtone,[id],(err1,results)=>{
            console.log(results)
            db.query(stmttwo,[id],(err2,resultss)=>{
                console.log(resultss)
                
                arr=[result,results,resultss]
                console.log(arr[0])
                res.send([result,results,resultss])
            })
        })
    })
})

app.post('/gs/generate', (req, res) => {
    const gsID=String(req.body.GS_ID);
    const userid=Number(req.body.userid);
    console.log(gsID)
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
      db.query(q1,[userid,gsID,profile.prfname,profile.prfdesc,profile.prfphoto],(errs,result)=>{console.log(errs)})
      
      profile.prfarea.forEach((elem)=>{
        const q2="INSERT INTO gswork (id,domain) VALUES (?,?);";
        db.query(q2,[userid,elem],(errs,result)=>{console.log(errs)})
      });

      articles.forEach((elem)=>{
        const q3="INSERT INTO gsarticle (id,title,cite,year,authors) VALUES (?,?,?,?,?);";
        db.query(q3,[userid,elem.title,elem.cite,elem.year,elem.author],(errs,result)=>{console.log(errs)})
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
