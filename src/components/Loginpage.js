import React, { Component,useState } from 'react'
import {Button,Navbar,Nav,Form,Col,Row,Modal} from 'react-bootstrap'
import './Loginpage.css'
import Axios from 'axios'
import * as emailjs from 'emailjs-com'
import {ImProfile} from 'react-icons/im'
import {FaExclamation} from 'react-icons/fa'
import { Router, Route, Switch, BrowserRouter,useHistory } from 'react-router-dom';
var Errorstag=[]

function Loginpage(){
    let history=useHistory()
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
    const[errors,seterror]=useState([])
    const [sendEmail,setsendEmail]=useState('');
    var [Studentcheck,setStudentcheck]=useState(false);
    var [Facultycheck,setFacultycheck]=useState(false);
    var [forgotpasswordmsg,setforgotpasswordmsg]=useState('Enter the email address you have registerd with. We ll send you a link to reset your password.')
    var [countoflogin,setcountoflogin]=useState(0)
    var [loginerrorcheckmsg,setloginerrorcheckmsg]=useState('Credentials Provided are Incorrect')
   function register(e){
       console.log(GSurl)
       const urlParams = new URLSearchParams(GSurl);
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
        Axios.post('http://localhost:3001/api/register',
        {firstname:firstname,
        lastname:lastname,
        dob:dob,
        email:email,
        pwd:pwd,
        phno:phno,
        userType:Studentcheck?'N':'Y',
        GS_ID:urlParams.get('user'),
        count:1,
    }).then(()=>{
        console.log(Studentcheck)
        history.push("/homepage/"+email+'/'+false)
        errorDiv.style.display='none'
        Axios.post('http://localhost:3001/api/getDetails',{
        email:email
        }).then((result)=>{
            console.log(result,result.data['0']['id'])
        Axios.post('http://localhost:3001/gs/generate',
        {
        GS_ID:urlParams.get('user'),
        userid:result.data['0']['id'],
        })
    })
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
    
    function Login(e){
        e.preventDefault();
        Axios.post('http://localhost:3001/api/login',{
            email:email,
            pwd:pwd,
        }).then((l)=>{
            console.log(l.data)
            const errorDiv=document.querySelector('.errorDiv')
            const errorDivLogin=document.querySelector('.errorDivLogin')
            const errorDivRegister=document.querySelector('.errorDivRegister')
        if(l.data=="Yes"){
            console.log("e:"+email)
            Axios.post("http://localhost:3001/api/showRating",{
                email:email,
                }).then((t)=>{
                    console.log(t)
                    if(t.data=="Yes"){
                        //setShowrating(true);
                        console.log("poi")
                        history.push("/homepage/"+email+'/'+true)
                    }
                    else{
                        history.push("/homepage/"+email+'/'+false)
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
            Axios.post("http://localhost:3001/api/updateActivate_account",{
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
            register.style.fontSize='large'
            register.style.fontWeight='bold'
            register.style.textDecoration='underline'
            login.style.fontWeight='normal'
            login.style.textDecoration='none'
            errorDiv.style.display='none';
    
        }
        else if(type=="login"){
            loginform.style.display='block'
            registerform.style.display='none'
    
            login.style.fontSize='large'
            login.style.fontWeight='bold'
            login.style.textDecoration='underline'
            errorDiv.style.display='none';
            register.style.fontWeight='normal'
            register.style.textDecoration='none'
        }
    }
    function student_facultycheck(type)
    {
        const gsurl=document.getElementById('GsURL')
        if(type=='student'){
            setStudentcheck(true)
            setFacultycheck(false)
            console.log("In student")
            gsurl.style.display='none'
        }
        else{
            setStudentcheck(false)
            setFacultycheck(true)
            console.log("In faculty")
            gsurl.style.display='block'

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
        forgotpasswordform.style.display='block'
        loginform.style.display='none'
        const formnav=document.getElementById('formnav')
        formnav.style.display='none'
    }
    function backtologin(){
        const forgotpasswordform=document.getElementById('ForgotPasswordForm');
        const loginform=document.getElementById('LoginForm')
        forgotpasswordform.style.display='none'
        loginform.style.display='block'
        const formnav=document.getElementById('formnav')
        formnav.style.display='block'
    }
    function activateAccount(e){
        const tag1=document.querySelector('.errorInactivatemodal')
        Axios.post("http://localhost:3001/api/getDetails",{
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

        return (        
            <div id="bodyClass">
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
                                <a onClick={forgotpassword} id="href">Forgot Password</a>
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="checkbox"> 
                        <Form.Check type="checkbox" label='Remember me'></Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="primary" id="FormButton" to="/hii">
                            Submit
                        </Button>
                    </Form>
                    
                    <Form id="RegisterForm" onSubmit={register}>
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
                            <Form.Control type="text" placeholder='url' onChange={(e)=>{seturl(e.target.value)}}>
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
                            Register
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
                               <a onClick={backtologin} id="href">Back to Login</a>
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
                    <Button variant="primary" onClick={activateAccount}>
                        Send Mail
                    </Button>
                    </Modal.Footer>
                </Modal>
                {/* <div className="Homepage">
                    <Homepage username={email}>

                    </Homepage>
                </div> */}
                
                    
                
            </div>
            
        )
    }


export default Loginpage;
