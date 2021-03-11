import React, { Component } from 'react'
import {Button,Navbar,Nav,Form} from 'react-bootstrap'
import { NodeMinus } from 'react-bootstrap-icons'
import './Loginpage.css'
class Loginpage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    display(type){
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
            
            login.style.fontWeight='none'
            login.style.textDecoration='none'

        }
        else if(type=="login"){
            loginform.style.display='block'
            registerform.style.display='none'

            login.style.fontSize='large'
            login.style.fontWeight='bold'
            login.style.textDecoration='underline'
            
            register.style.fontWeight='none'
            register.style.textDecoration='none'
        }
    }
    render() {
        return (
            <div id="bodyClass">
                <div>
                <Navbar bg='dark' expand='lg' variant='dark' sticky='top'>
                    <Navbar.Brand>Profile_Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                </Navbar>
                </div>
            <div className='container-fluid'>
                <div className='container'>
                    <Navbar>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={()=>this.display("login")} size="lg" id="loginNav">Login</Nav.Link>
                            <Nav.Link onClick={()=>this.display("register")} size="lg" id="registerNav">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                    <Form id="LoginForm">
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label id="formlabel">
                                Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder='mailId'>
                            </Form.Control>
                            <Form.Text className="text-muted">
                                We'll not share your EmailId
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='password'>
                            </Form.Control>
                            
                        </Form.Group>
                        <Form.Group className="checkbox"> 
                        <Form.Check type="checkbox" label='Remember me'>
                            </Form.Check>
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </Form>

                    <Form id="RegisterForm">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label id="formlabel">First Name</Form.Label>
                            <Form.Control type="text" placeholder='firstname'/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label id="formlabel">Last Name</Form.Label>
                            <Form.Control type="text" placeholder='lastname'/>
                        </Form.Group>
                        <Form.Group controlId="birthDate">
                            <Form.Label id="formlabel">DOB</Form.Label>
                            <Form.Control type="date" placeholder='dateOfBirth'/>
                        </Form.Group>
                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label id="formlabel">
                                Email Address
                            </Form.Label>
                            <Form.Control type="email" placeholder='mailId'>
                            </Form.Control>
                            <Form.Text classNmae="text-muted">
                                We'll not share your EmailId
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">
                                Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='password'>
                            </Form.Control>
                            
                        </Form.Group>
                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">
                                Conifrm Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='Confirm_password'>
                            </Form.Control>
                            
                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Register
                        </Button>
                    </Form>
                </div>

            </div>
            </div>
        )
    }
}

export default Loginpage
