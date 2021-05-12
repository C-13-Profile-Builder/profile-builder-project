const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mysql=require('mysql');
const request = require("request");
const cheerio = require('cheerio'); 
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
    var count=req.body.count;
    console.log("count:"+count)
    const stmt="INSERT INTO user (firstname,lastname,email,dob,pwd,phonenumber,Faculty,GS_ID) VALUES (?,?,?,?,?,?,?,?);";
    const stmt2="INSERT INTO logtable (user_email,count) VALUES (?,?);";
    
    db.query(stmt,[firstname,lastname,email,dob,pwd,phno,userType,GS_ID],(errs,result)=>{
        console.log(errs)
        db.query(stmt2,[email,count],(errs1,result1)=>{
            console.log(errs1)
        })
        res.send("Hello world")
    })
    
})
//Login check
app.post('/api/login',(req,res)=>{
    const email=req.body.email;
    const pwd=req.body.pwd;
    const stmt="SELECT * FROM user WHERE email=? and pwd=?;";
    const stmt1="UPDATE logtable SET count=count+1 where user_email=?";
    db.query(stmt,[email,pwd],(errs,result)=>{
        //console.log(email,pwd,result.length,result[0]['activate_acc'])
        if(result.length>0 && result[0]['activate_acc']=='Y')
        {
            res.send("Yes")
            db.query(stmt1,[email],(errs1,result1)=>{
                console.log(errs1)
            })
        }
        else if(result.length>0 && result[0]['activate_acc']=='N'){
            res.send("activate")
        }
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
        db.query(stmt,[id,gsid],(errs1,result1)=>{
            console.log(errs1)
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
    const stmt="UPDATE user SET pwd=? WHERE email=?;";
    db.query(stmt,[pwd,email],(errs,result)=>{
        console.log(result)
        res.send("Hello world")
    })
})
//activate_account
app.post('/api/updateActivate_account',(req,res)=>{
    const email=req.body.email;
    const type=req.body.yes_no;
    const stmt1="SELECT email from user WHERE email=?;";
    const stmt="UPDATE user SET activate_acc=? WHERE email=?;";
    db.query(stmt1,[email],(errs,result1)=>{
        if(result1.length>=1){
            db.query(stmt,[type,email],(errs,result)=>{
                console.log(result)
                res.send("yes")
            })
        }
        else{
            res.send("no")
        }
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
//get GSdetails for profile page
app.post('/api/getgsdetailsgorprofile',(req,res)=>{
    const mail=req.body.mail;
    const stmt="SELECT gsprofile.gs_id,gsprofile.prf_des,gsprofile.photo_url,COUNT(gsarticle.id) FROM gsprofile,user,gsarticle where user.email=? and user.id=gsprofile.id and user.id=gsarticle.id"
    const stmt1="SELECT gswork.domain FROM user,gswork where user.email=? and user.id=gswork.id"
    db.query(stmt,[mail],(err,result)=>{
        db.query(stmt1,[mail],(err1,result1)=>{
            res.send([result,result1])
        })
        
    })
})
//get prf_name, domain
app.post('/api/getForDropdown',(req,res)=>{
    const stmt="SELECT prf_name FROM gsprofile"
    const stmt1="SELECT DISTINCT(domain) FROM gswork"
    db.query(stmt,(err,result)=>{
        db.query(stmt1,(err1,result1)=>{
            res.send([result,result1]) 
        })
    })
})
//update article
app.post('/api/deletegsarticles',(req,res)=>{
    const id=req.body.id;
    const stmt="DELETE FROM gsarticle WHERE gsarticleid=?";
    db.query(stmt,[id],(err,result)=>{
        res.send("Success")
    })
})
//check count of user login
app.post("/api/showRating",(req,res)=>{
    const email=req.body.email;
    const stmt="SELECT count from logtable where user_email=?";
    const stmt1="UPDATE logtable SET count=0 where user_email=?";
    db.query(stmt,[email],(err,result)=>{
        console.log("hello "+result,result[0]['count'])
        if(result[0]['count']>=3){
            console.log(result,result[0]['count'])
            db.query(stmt1,[email],(err,result)=>{
            })
            res.send("Yes")
         }
         else{
             res.send("No")
         }
    })
    
})
//update Review
app.post("/api/updatereview",(req,res)=>{
    
    const email=req.body.email;
    const rating=req.body.rating;
    const stmt="INSERT INTO reviews (user_email,rating) VALUES (?,?);";
    db.query(stmt,[email,rating],(err,result)=>{

    })
})
//submitreport
app.post("/api/submit_report",(req,res)=>{
    const email=req.body.email;
    const report=req.body.report;
    const stmt="INSERT INTO report (user_email,report_stated) VALUES (?,?);";
    db.query(stmt,[email,report],(err,result)=>{

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
                let arr=[result,results,resultss]
                console.log(arr[0])
                res.send([result,results,resultss])
            })
        })
    })
})
//generate articles in profile
app.post('/api/generatearticlesinprofile',(req,res)=>{
    const mail=req.body.mail;
    const stmt="SELECT gsarticle.gsarticleid,gsarticle.title,gsarticle.cite,gsarticle.year,gsarticle.authors from gsarticle,user where user.email=? and user.id=gsarticle.id"
    db.query(stmt,[mail],(err,result)=>{
        res.send(result)
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
        db.query(q2,[userid,elem],(errs,result1)=>{console.log(errs)})
      });

      articles.forEach((elem)=>{
        const q3="INSERT INTO gsarticle (id,title,cite,year,authors) VALUES (?,?,?,?,?);";
        db.query(q3,[userid,elem.title,elem.cite,elem.year,elem.author],(errs,result2)=>{console.log(errs)})
      });

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify(profile));  
    });
});

app.get('/',(req,res)=>{
    res.send("frty")
})

app.post('/api/amrgenerate', (req, res)  => {
    amrid=String(req.body.amrid);
    uid=Number(req.body.userid);
    const stmt="SELECT count(*) as count from amrprofile where uid=?";
    db.query(stmt,[uid],(err,result)=>{
        console.log(result,amrid,uid,req.body);
          if (result[0]['count']>0){
            db.query("delete from amrprofile where uid=?",[uid]);
            db.query("delete from amrpub where uid=?",[uid]);
          };
    });
    request.get({
        uri: amrid,
        encoding: "binary"
      }, function (error, request, body) {
        let $ = cheerio.load(body);
        let publications=[];
        let profile={
          'prfphoto':$(".field-name-field-blog-image").find('img').attr('src'),
          'prfname':$(".col-sm-12").find('h1').text().trim(),
          'prfdesig':$("h5").find('.field-content').eq(0).text(),
          'prfqual':$(".field-name-field-faculty-qualification").find('.field-items').text(),
          'prfemail':$(".field-name-field-faculty-email").find('.field-items').text().trim(),
          'prfsummary':$(".field-type-text-with-summary > .field-items > .field-item > p").text().trim() || $(".col-md-12 > p").text().trim(),
          'prfresearch':$(".field-name-field-faculty-research-interest").find('.field-items').text().trim(),
        };
        $(".views-table").each(function(i,elem){
          let type=$(this).find("caption").text().trim();
          $(this).find("tbody").find("tr").each(function(i,elem){
            let publication={
              'type':type,
              'year':Number($(this).find(".views-field-biblio-year > p").text().trim()),
              'title':$(this).find(".views-field-title > p").text().trim(),
            };
            publications.push(publication)
          });
        });
        profile['Publications']=publications;
        console.log(profile);
        const q1="INSERT INTO amrprofile (uid,amr_id,name,email,photo_url,designation,qualification,description,research) VALUES (?,?,?,?,?,?,?,?,?);";
        db.query(q1,[uid,amrid,profile.prfname,profile.prfemail,profile.prfphoto,profile.prfdesig,profile.prfqual,profile.prfsummary,profile.prfresearch],(errs,result)=>{console.log(errs)})
  
        publications.forEach((elem)=>{
          const q2="INSERT INTO amrpub (uid,type,title,year) VALUES (?,?,?,?);";
          db.query(q2,[uid,elem.type,elem.title,elem.year],(errs,result2)=>{console.log(errs)})
        });
  
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(profile)); 
      });
  
  });

module.exports = app.listen(3001, function() {
    console.log("Server Running at 3001");
});