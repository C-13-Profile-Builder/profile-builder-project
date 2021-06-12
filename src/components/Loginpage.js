import React, { Component,useState,useEffect } from 'react'
import {Button,Navbar,Nav,Form,Col,Row,Modal,Spinner} from 'react-bootstrap'
import './Loginpage.css'
import Axios from 'axios'
import * as emailjs from 'emailjs-com'
import {ImProfile} from 'react-icons/im'
import {FaExclamation} from 'react-icons/fa'
import {RiNumber0,RiNumber1,RiNumber2} from "react-icons/ri"
import { Router, Route, Switch, BrowserRouter,useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import {FcGoogle} from "react-icons/fc"
var Errorstag=[]


function Loginpage(){
    let history=useHistory()
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [firstname,setfirstname]=useState('');
    const [lastname,setlastname]=useState('');
    const [dob,setdob]=useState('');
    const [email,setemail]=useState('');
    const [pwd,setpwd]=useState('');
    const [phno,setphno]=useState('');
    const [confirmpwd,setconfirmpwd]=useState('');
    const [GSurl,seturl]=useState('');
    const [fac_weburl,setfacweburl]=useState('')
    const[errors,seterror]=useState([])
    const [sendEmail,setsendEmail]=useState('');
    var [Studentcheck,setStudentcheck]=useState(false);
    var [Facultycheck,setFacultycheck]=useState(false);
    var [forgotpasswordmsg,setforgotpasswordmsg]=useState('Enter the email address you have registerd with. We ll send you a link to reset your password.')
    var [countoflogin,setcountoflogin]=useState(0)
    var [loginerrorcheckmsg,setloginerrorcheckmsg]=useState('Credentials Provided are Incorrect')
    
    
    useEffect(() => {
        document.title = "PB-SignUp/SignIn";
      });

   function register(e){
    
        const tag1=document.querySelector('#loadingGIF')
        tag1.style.display='block'
       console.log(GSurl)
       const urlParams = new URLSearchParams(String(GSurl));
       console.log(GSurl)
       console.log(urlParams.get('user'))
    Errorstag=[]
      e.preventDefault()
      if(firstname===''){
          Errorstag.push("FirstName field is Empty")
      }
    if(dob===''){
        Errorstag.push("DOB field is Empty")
    }
    if(phno===''){
        Errorstag.push("Phone Number field is Empty")
    }
    if(!Studentcheck && !Facultycheck)
    {
        Errorstag.push("UserType field is Empty")   
    }
    if(Facultycheck && GSurl==='')
    {
        Errorstag.push("Faculty GS-ID field is Empty")   
    }
    if(pwd==''){
        Errorstag.push("Password field is Empty")
    }
    if(pwd!=confirmpwd && pwd!=''){
        Errorstag.push("Password and Confirm password fields doesnt match")
    }
    seterror(Errorstag);
    const errorDiv=document.querySelector('.errorDiv')
    if(Errorstag.length==0)
    {
        Axios.post('http://34.67.187.5:5000/api/register',
        {firstname:firstname,
        lastname:lastname,
        dob:dob,
        email:email,
        pwd:pwd,
        phno:phno,
        userType:Studentcheck?'N':'Y',
        facweburl:fac_weburl,
        GS_ID:urlParams.get('user'),
        count:1,
    }).then(()=>{
        console.log(Studentcheck)
        //history.push("/homepage/"+email+'/'+false)
        errorDiv.style.display='none'
        homepageusercount();
        if(!Studentcheck){
            Axios.post('http://34.67.187.5:5000/api/getDetails',{
            email:email
            }).then((result)=>{
                console.log(result,result.data['0']['id'])
                Axios.post('http://34.67.187.5:5000/gs/generate',
                {
                GS_ID:urlParams.get('user'),
                userid:result.data['0']['id'],
                })
                console.log("helloguyss",fac_weburl,result.data['0']['id'])
                if(fac_weburl!==''){
                    Axios.post('http://34.67.187.5:5000/api/amrgenerate',
                    {
                    amrid:fac_weburl,
                    userid:result.data['0']['id'],
                    })
                }
                history.push("/homepage/"+email+'/'+false)
                })
            
        }
        else{
            history.push("/homepage/"+email+'/'+false)
        }
    })
   }

   else
   {        
    errorDiv.style.display='block'
    const errorDivLogin=document.querySelector('.errorDivLogin')
    errorDivLogin.style.display='none'
    const errorDivRegister=document.querySelector('.errorDivRegister')
    errorDivRegister.style.display='block'
    console.log(Errorstag)

   }
    }

    function homepageusercount(){
        Axios.post("http://34.67.187.5:5000/api/getcountfromusers",{
        }).then((t)=>{
            console.log(t)
            sessionStorage.setItem("totalusers",t.data['0']['0']['count'])
            sessionStorage.setItem("Facusers",t.data['1']['0']['count'])
            sessionStorage.setItem("Studusers",t.data['2']['0']['count'])
        })
        Axios.post("http://34.67.187.5:5000/api/getratingfromreview",{
        }).then((t)=>{
            console.log(t.data['0']['sumof'],t.data['0']['count'])
            sessionStorage.setItem('rating',Math.floor(t.data['0']['sumof']/t.data['0']['count']))
            console.log(sessionStorage)
        })
    }
    function getNotification(type){
        Axios.post("http://34.67.187.5:5000/api/getdetails",{
            email:email,
        }).then((t)=>{
            if(t.data['0']['Faculty']==="N"){
                Axios.post("http://34.67.187.5:5000/api/selectnotification",{
                    stid:t.data['0']['id'],
                }).then((t1)=>{
                    if(t1.data.length>0){
                    console.log(t1.data)
                    var a=''
                    for(var i=0;i<t1.data.length;i++){
                        
                        if(i===t1.data.length-1){
                            a=a+t1.data[String(i)]['prf_name']
                        }
                        else{
                            a=a+t1.data[String(i)]['prf_name']+' , '
                        }
                    }
                    console.log(a)
                    localStorage.setItem('notificationProfile',a)
                    localStorage.setItem('Booleannoti',true)
                    console.log(localStorage.getItem('notificationProfile'))
                    console.log(localStorage)
                    history.push("/homepage/"+email+'/'+type);
                }
                else{
                    localStorage.setItem('Booleannoti',false)
                    console.log(localStorage)
                    history.push("/homepage/"+email+'/'+type);
                }
                })
                Axios.post("http://34.67.187.5:5000/api/deletenotification",{
                    stid:t.data['0']['id'],
                })
            }
            else{
                localStorage.setItem('Booleannoti',false)
                history.push("/homepage/"+email+'/'+type); 
            }
        })
    }
    
    function Login(e){
        e.preventDefault();
        const tag1=document.querySelector('#loadingGIF')
        tag1.style.display='block'
        Axios.post('http://34.67.187.5:5000/api/login',{
            email:email,
            pwd:pwd,
        }).then((l)=>{
            console.log(l.data)
            const errorDiv=document.querySelector('.errorDiv')
            const errorDivLogin=document.querySelector('.errorDivLogin')
            const errorDivRegister=document.querySelector('.errorDivRegister')
        if(l.data=="Yes"){
            console.log("e:"+email)
            Axios.post("http://34.67.187.5:5000/api/showRating",{
                email:email,
                }).then((t)=>{
                    console.log(t)
                    if(t.data=="Yes"){
                        //document.cookie = expires + ";path=/homepage/:"+email+"/:"+true;
                        //document.cookie = "username="+email+"; expires=Sat, 29 May 2021 15:48:00 UTC; path=/homepage/"+email+"/"+false+";";
                        //setShowrating(true);
                        homepageusercount()
                        getNotification(true)
                       //history.push("/homepage/"+email+'/'+true);
                    }
                    else{
                        homepageusercount()
                        getNotification(false)
                        //document.cookie = expires + ";path=/homepage/:"+email+"/:"+false;
                        //document.cookie = "username="+email+"; expires=Sat, 29 May 2021 15:48:00 UTC; path=/homepage/"+email+"/"+false+";";
                        
                    }    
                    
                })
                errorDiv.style.display='none'}
        else if(l.data=="activate"){
            console.log("hello avtivate")
            setloginerrorcheckmsg("Activate Your Account By clicking the link in your mail")
            errorDiv.style.display='block';
            errorDivRegister.style.display='none'
            errorDivLogin.style.display='block'
        }
        else{
            setloginerrorcheckmsg('Credentials Provided are Incorrect')
            setcountoflogin(countoflogin+1)
            errorDiv.style.display='block';
            errorDivRegister.style.display='none'
            errorDivLogin.style.display='block'
        }
        console.log("ght "+countoflogin)
        if(countoflogin>=2){
            Axios.post("http://34.67.187.5:5000/api/updateActivate_account",{
                email:email,
                yes_no:'N',
                }).then((t)=>{
                    if(t.data=='yes'){
                        setShow(true)
                    }
                })
            }
        })
        setcountoflogin(0)
    }

    function display(type){
        const loginform=document.getElementById('LoginForm')
        const registerform=document.getElementById('RegisterForm')
        const login=document.getElementById('loginNav')
        const register=document.getElementById('registerNav')
        const errorDiv=document.querySelector('.errorDiv')
        
        if(type=="register"){
            loginform.style.display='none'
            registerform.style.display='block'
            registerform.style.animationName='login_register'
            registerform.style.animationDuration='1s'
            register.style.fontSize='large'
            register.style.fontWeight='bold'
            register.style.textDecoration='underline'
            login.style.fontWeight='normal'
            login.style.textDecoration='none'
            errorDiv.style.display='none';
    
        }
        else if(type=="login"){
            registerform.style.display='none'
            loginform.style.display='block'            
            loginform.style.animationName='login_register'
            loginform.style.animationDuration='1s'
            login.style.fontSize='large'
            login.style.fontWeight='bold'
            login.style.textDecoration='underline'
            errorDiv.style.display='none';
            register.style.fontWeight='normal'
            register.style.textDecoration='none'
        }
    }
    function student_facultycheck(type)
    {   console.log("in",type)
        const gsurl=document.querySelectorAll('#GsURL')
        console.log(gsurl)
        if(type=='student'){
            setStudentcheck(true)
            setFacultycheck(false)
            console.log("In student")
            gsurl.forEach((index)=>{
                index.style.display='none'
            })
        }
        else{
            setStudentcheck(false)
            setFacultycheck(true)
            console.log("In faculty")
            gsurl.forEach((index)=>{
                index.style.display='block'
            })

        }
    }

    function forgotpasswordsendemail(e){
        var forgotpasswordemail={
            from_name:'mksroct2000@gmail.com',
            to_name:sendEmail,
            message:'http://localhost:3000/passwordChange/'+sendEmail,
            subject:'Password change request',
        }
        setforgotpasswordmsg("Link for password change has been sent. Check your mail id")
        e.preventDefault();
        console.log(forgotpasswordemail['message']);
        emailjs.send(
            'SE_Project_ProfileBuilde',
            'template_qg7xmi6',
             forgotpasswordemail,
            'user_1cNCZo5d7zPQ0cmjl3PEL'
       )
    }
    function forgotpassword(){
        const forgotpasswordform=document.getElementById('ForgotPasswordForm');
        const loginform=document.getElementById('LoginForm')
        const errorDiv=document.querySelector('.errorDiv')
        errorDiv.style.display='none';
        loginform.style.display='none'
        forgotpasswordform.style.display='block'
        forgotpasswordform.style.animationName='login_register'
        forgotpasswordform.style.animationDuration='1s'
        const formnav=document.getElementById('formnav')
        formnav.style.display='none'
    }
    function backtologin(){
        const forgotpasswordform=document.getElementById('ForgotPasswordForm');
        const loginform=document.getElementById('LoginForm')
        forgotpasswordform.style.display='none'
        loginform.style.display='block'
        loginform.style.animationName='login_register'
        loginform.style.animationDuration='1s'
        const formnav=document.getElementById('formnav')
        formnav.style.display='block'
    }
    function activateAccount(e){
        const tag1=document.querySelector('.errorInactivatemodal')
        Axios.post("http://34.67.187.5:5000/api/getDetails",{
            email:sendEmail,
        }).then((t)=>{
            console.log(t)
            if(t.data.length>0){
                var forgotpasswordemail={
                    from_name:'mksroct2000@gmail.com',
                    to_name:sendEmail,
                    message:'http://localhost:3000/activate_account/'+sendEmail,
                    subject:'Activate account',
                }
                e.preventDefault();
                emailjs.send(
                    'SE_Project_ProfileBuilde',
                    'template_qg7xmi6',
                     forgotpasswordemail,
                    'user_1cNCZo5d7zPQ0cmjl3PEL'
               )
               setsendEmail('')
               setShow(false)
               tag1.style.display='none' 
            }
            else{
                tag1.style.display='block' 
            }
        })
        
    }

    function responseGoogle(response){
        console.log(response);
        setfirstname(response.profileObj.givenName);
        setlastname(response.profileObj.familyName);
        setemail(response.profileObj.email)
        setShow1(true)
    }

    function gregister(e){
        e.preventDefault()
        console.log("In g")
        const tag1=document.querySelector('#loadingGIF')
        tag1.style.display='block'
       console.log(GSurl)
       const urlParams = new URLSearchParams(String(GSurl));
       console.log(GSurl)
       console.log(urlParams.get('user'))
    Errorstag=[]
    if(dob===''){
        Errorstag.push("DOB field is Empty")
    }
    if(phno===''){
        Errorstag.push("Phone Number field is Empty")
    }
    if(!Studentcheck && !Facultycheck)
    {
        Errorstag.push("UserType field is Empty")   
    }
    if(Facultycheck && GSurl==='')
    {
        Errorstag.push("Faculty GS-ID field is Empty")   
    }
    if(pwd==''){
        Errorstag.push("Password field is Empty")
    }
    if(pwd!=confirmpwd && pwd!=''){
        Errorstag.push("Password and Confirm password fields doesnt match")
    }
    seterror(Errorstag);
    console.log(dob,phno);
    const errorDiv=document.querySelector('.errorDiv')
    if(Errorstag.length==0)
    {
        Axios.post('http://34.67.187.5:5000/api/register',
        {firstname:firstname,
        lastname:lastname,
        dob:dob,
        email:email,
        pwd:pwd,
        phno:phno,
        userType:Studentcheck?'N':'Y',
        facweburl:fac_weburl,
        GS_ID:urlParams.get('user'),
        count:1,
    }).then(()=>{
        console.log(Studentcheck)
        //history.push("/homepage/"+email+'/'+false)
        errorDiv.style.display='none'
        homepageusercount();
        if(!Studentcheck){
            Axios.post('http://34.67.187.5:5000/api/getDetails',{
            email:email
            }).then((result)=>{
                console.log(result,result.data['0']['id'])
                Axios.post('http://34.67.187.5:5000/gs/generate',
                {
                GS_ID:urlParams.get('user'),
                userid:result.data['0']['id'],
                })
                console.log("helloguyss",fac_weburl,result.data['0']['id'])
                if(fac_weburl!==''){
                    Axios.post('http://34.67.187.5:5000/api/amrgenerate',
                    {
                    amrid:fac_weburl,
                    userid:result.data['0']['id'],
                    })
                }
                history.push("/homepage/"+email+'/'+false)
                })
            
        }
        else{
            history.push("/homepage/"+email+'/'+false)
        }
    })
   }

   else
   {        
    errorDiv.style.display='block'
    const errorDivLogin=document.querySelector('.errorDivLogin')
    errorDivLogin.style.display='none'
    const errorDivRegister=document.querySelector('.errorDivRegister')
    errorDivRegister.style.display='block'
    console.log(Errorstag)

   }
    }
    

        return (        
            <div id="bodyClass">
                <Modal show={show1} onHide={handleClose1} animation={true} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div>
                        <Form  onSubmit={gregister}>
                        <Form.Group controlId="birthDate">
                            <Form.Label id="formlabel1" font-color="black">DOB</Form.Label>
                            <Form.Control type="date" placeholder='dateOfBirth' onChange={(e)=>{setdob(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group controlId="formPlaintextEmail">
                            <Form.Label id="formlabel1" column sm="2">PhNumber</Form.Label>
                            <Form.Row>
                                <Col >
                                    <Form.Control id="formlabel1" plaintext readOnly defaultValue="+91" />
                                </Col>
                                <Col xs={10}>
                                    <Form.Control type="text" placeholder='PhNO' onChange={(e)=>{setphno(e.target.value)}}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formPlaintextEmail">
                            <Form.Label id="formlabel1">Are you a Student or Faculty?</Form.Label>
                            <br></br>
                            <Row xs={6}>
                                <Col xs={6}>
                                    <Form.Check inline
                                        type="radio"
                                        label="Faculty"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios3"
                                        style={{color:'black'}}
                                        onChange={()=>student_facultycheck('faculty')}
                                    />
                            </Col>
                                <Col xs={6}>
                                    <Form.Check inline
                                        type="radio"
                                        label="Student"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios4"
                                        onChange={()=>student_facultycheck('student')}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group id="GsURL">
                            <Form.Label id="formlabel1">
                                Google Scholar URL
                            </Form.Label>
                            <Form.Control type="text" placeholder='https://scholar.google.com/citations?hl=en&user=xxxxxxxxxx' onChange={(e)=>{seturl(e.target.value)}}>
                            </Form.Control>

                            <Form.Label id="formlabel1">
                                Amrita Faculty Website URL
                            </Form.Label>
                            <Form.Control type="text" placeholder='https://www.amrita.edu/faculty/xxxxxxxx' onChange={(e)=>{setfacweburl(e.target.value)}}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel1">
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='password' onChange={(e)=>{setpwd(e.target.value)}}>
                            </Form.Control>
                            
                        </Form.Group>
                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel1">
                                Confirm Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='Confirm_password' onChange={(e)=>{setconfirmpwd(e.target.value)}}>
                            </Form.Control>
                            
                        </Form.Group>
                        
                        <Button type="submit" variant="primary">
                            Register
                        </Button>
                        </Form>
                    </div>
                    </Modal.Body>
                </Modal>
            <div className='LoginRegister'>
                <div>
                <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                    <Navbar.Brand><ImProfile size="2em"/> Profile_Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </Navbar>
                </div>
            <div className='container-fluid'>
                <div className='container'>
                    <Navbar id="formnav">
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={()=>display("login")} size="lg" id="loginNav">Login</Nav.Link>
                            <Nav.Link onClick={()=>display("register")} size="lg" id="registerNav">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                    <div className="errorDiv">
                        <br></br>
                        <div className="errorDivLogin">  
                            <center><p><FaExclamation size="2em" id="errorDivIcon"/> {loginerrorcheckmsg}</p></center>
                        </div>
                        <div className="errorDivRegister">
                            {errors.map((index) => (
                            <center><p><FaExclamation size="1em" id="errorDivIcon"/>{index}</p></center>
                            ))
                            }
                        </div>
                    </div>
                    <Form id="LoginForm" onSubmit={Login}>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label id="formlabel">
                                Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder='mailId' onChange={(e)=>{setemail(e.target.value)}} >
                            </Form.Control>
                            <Form.Text className="text-muted">
                                We'll not share your EmailId
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">Password</Form.Label>
                            <Form.Control type="password" placeholder='password' onChange={(e)=>{setpwd(e.target.value)}} >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Text>
                                <a onClick={forgotpassword} id="href" style={{cursor:'pointer'}}>Forgot Password?</a>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="checkbox"> 
                        <Form.Check type="checkbox" label='Remember me'></Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="primary" id="FormButton" to="/hii">
                            <Row className="justify-content-center">
                                <span id="loadingGIF">
                                    <Spinner animation="border"  variant="light" role="status" size="sm">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </span>  Submit
                            </Row>
                        </Button>
                    </Form>
                    
                    <Form id="RegisterForm" onSubmit={register}>

                    <div classname="Gauthlogin">
                        <center><GoogleLogin
                            clientId="447845982903-jn3t06v40m4s8bl1c7jms8u6cb4g9o29.apps.googleusercontent.com"
                            buttonText="Sign Up with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}/>
                        </center>
                        </div>
                        <div style={{color:'azure',marginBottom:'10px',marginTop:'10px'}}><center>----------OR----------</center></div>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label id="formlabel">First Name</Form.Label>
                            <Form.Control type="text" placeholder='firstname' onChange={(e)=>{
                                setfirstname(e.target.value)
                            }}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label id="formlabel">Last Name</Form.Label>
                            <Form.Control type="text" placeholder='lastname' onChange={(e)=>{setlastname(e.target.value)}} />
                        </Form.Group>
                        <Form.Group controlId="birthDate">
                            <Form.Label id="formlabel">DOB</Form.Label>
                            <Form.Control type="date" placeholder='dateOfBirth' onChange={(e)=>{setdob(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group controlId="formPlaintextEmail">
                            <Form.Label id="formlabel" column sm="2">PhNumber</Form.Label>
                            <Form.Row>
                                <Col >
                                    <Form.Control id="formlabel" plaintext readOnly defaultValue="+91" />
                                </Col>
                                <Col xs={10}>
                                    <Form.Control type="text" placeholder='PhNO' onChange={(e)=>{setphno(e.target.value)}}/>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formPlaintextEmail">
                            <Form.Label id="formlabel">Are you a Student or Faculty?</Form.Label>
                            <br></br>
                            <Row xs={6}>
                                <Col xs={6}>
                                    <Form.Check inline
                                        type="radio"
                                        label="Faculty"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        onChange={()=>student_facultycheck('faculty')}
                                    />
                            </Col>
                                <Col xs={6}>
                                    <Form.Check inline
                                        type="radio"
                                        label="Student"
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        onChange={()=>student_facultycheck('student')}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group id="GsURL">
                            <Form.Label id="formlabel">
                                Google Scholar URL
                            </Form.Label>
                            <Form.Control type="text" placeholder='https://scholar.google.com/citations?hl=en&user=xxxxxxxxxx' onChange={(e)=>{seturl(e.target.value)}}>
                            </Form.Control>

                            <Form.Label id="formlabel">
                                Amrita Faculty Website URL
                            </Form.Label>
                            <Form.Control type="text" placeholder='https://www.amrita.edu/faculty/xxxxxxxx' onChange={(e)=>{setfacweburl(e.target.value)}}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label id="formlabel">
                                Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder='mailId'onChange={(e)=>{setemail(e.target.value)}} >
                            </Form.Control>
                            <Form.Text className="text-muted">
                                We'll not share your EmailId
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='password' onChange={(e)=>{setpwd(e.target.value)}}>
                            </Form.Control>
                            
                        </Form.Group>
                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">
                                Confirm Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='Confirm_password' onChange={(e)=>{setconfirmpwd(e.target.value)}}>
                            </Form.Control>
                            
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            <Row className="justify-content-center">
                                <span id="loadingGIF">
                                    <Spinner animation="border"  variant="light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </Spinner>
                                </span> Register
                            </Row>
                        </Button>
                    </Form>

                    <Form id="ForgotPasswordForm">
                        <Form.Group id="header_Forgotpassword">
                            <center><h1>Forgot Password?</h1></center>
                        </Form.Group>
                        <br></br>
                        <Form.Group>
                            <Form.Text className="text-mutedForgotPassword">
                               <center>{forgotpasswordmsg}</center>
                            </Form.Text>
                        </Form.Group>
                    <br></br>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label id="formlabel">
                                Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder='mailId' onChange={(e)=>setsendEmail(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary" onClick={forgotpasswordsendemail} id="FormButton">
                            Send Link
                        </Button>
                    <br></br>
                        <Form.Group>
                            <center><Form.Text>
                               <a onClick={backtologin} id="href" style={{cursor:'pointer'}}>Back to Login</a>
                            </Form.Text></center>
                        </Form.Group>
                    </Form>
                </div>
                </div>
                
                </div>
                <Modal show={show} onHide={handleClose} animation={true} backdrop="static" keyboard={false}>
                    <Modal.Header>
                    <Modal.Title>Activate account after 2 Failed attempts</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='errorInactivatemodal' style={{display:'none'}}>
                            <center><h6><FaExclamation size='2em' id="errorDivIcon"/> EmailId Doesnt exist</h6></center>
                        </div>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='MailId' onChange={(e)=>setsendEmail(e.target.value)}/>       
                            
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={activateAccount} id="ForTestingPurpose">
                        Send Mail
                    </Button>
                    </Modal.Footer>
                </Modal>
                <p id="paraForTesting"style={{display:'none'}}>hellomailsent</p>
                {/* <div className="Homepage">
                    <Homepage username={email}>

                    </Homepage>
                </div> */}
                
                    
                
            </div>
            
        )
    }


export default Loginpage;
