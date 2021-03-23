import React, { Component,useState } from 'react'
import {Button,Navbar,Nav,Form} from 'react-bootstrap'
import './Loginpage.css'
import Axios from 'axios'
function Loginpage(){
    const [firstname,setfirstname]=useState('');
    const [lastname,setlastname]=useState('');
    const [dob,setdob]=useState('');
    const [email,setemail]=useState('');
    const [pwd,setpwd]=useState('');
    const [confirmpwd,setconfirmpwd]=useState('');
    const[errors,seterror]=useState('')

   function register(e){
       alert('defght');
       console.log("Hii")
    e.preventDefault();
        Axios.post('http://localhost:3001/api/register',
        {firstname:firstname,
        lastname:lastname,
        dob:dob,
        email:email,
        pwd:pwd,
    }).then(()=>{
        alert('Successful Insert');
    })
    }

    function Login(e){
        alert(email);
        e.preventDefault();
        Axios.post('http://localhost:3001/api/login',{
            email:email,
            pwd:pwd,
        }).then((l)=>{
        console.log(l);
    })
}

    function display(type){
        console.log("hi")
        const loginform=document.getElementById('LoginForm')
        const registerform=document.getElementById('RegisterForm')
        const login=document.getElementById('loginNav')
        const register=document.getElementById('registerNav')
        if(type=="register"){
            loginform.style.display='none'
            registerform.style.display='block'
            register.style.fontSize='large'
            register.style.fontWeight='bold'
            register.style.textDecoration='underline'
            login.style.fontWeight='normal'
            login.style.textDecoration='none'
    
        }
        else if(type=="login"){
            loginform.style.display='block'
            registerform.style.display='none'
    
            login.style.fontSize='large'
            login.style.fontWeight='bold'
            login.style.textDecoration='underline'
            
            register.style.fontWeight='normal'
            register.style.textDecoration='none'
        }
    }
    
    function forgotpassword(){
        const forgotpasswordform=document.getElementById('ForgotPasswordForm');
        const loginform=document.getElementById('LoginForm')
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
    

        return (
            
            <div id="bodyClass">
                <div>
                <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                    <Navbar.Brand>Profile_Builder</Navbar.Brand>
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
                        <Button type="submit" variant="primary" id="FormButton">
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
                                Conifrm Password
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
                               <center> Enter the email address you have registerd with. We'll send you a link to reset your password.</center>
                            </Form.Text>
                        </Form.Group>
                    <br></br>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label id="formlabel">
                                Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder='mailId'>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="primary" id="FormButton">
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

            
        )
    }


export default Loginpage;
