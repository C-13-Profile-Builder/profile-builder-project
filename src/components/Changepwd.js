import React,{useState} from 'react'
import './homepage.css'
import Axios from 'axios'
import {Button,Navbar,Nav,Form,Col,Row} from 'react-bootstrap'
import {ImProfile} from 'react-icons/im'
import {Link} from 'react-router-dom';
import {FaExclamation} from 'react-icons/fa'
import {useParams,useHistory} from 'react-router-dom'

var newpwd=''
var confirmnewpwd=''
function Changepwd() {
    let {uname}=useParams()
    function updateusertable(e){
        e.preventDefault();
        console.log(uname,newpwd,confirmnewpwd)
        if(newpwd===confirmnewpwd && newpwd!=''){
            Axios.post('http://34.67.187.5:5000/api/updatePassword',{
                email:uname,
                pwd:newpwd,
            }).then((res)=>{
                alert("Password Updated")
            })
        }
        
        else{
            const errorDiv=document.querySelector('.errorDiv')
            errorDiv.style.display='block'
        }
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
            <div className='container'>
                <Form id="Forgotform" onSubmit={updateusertable}>
                        <Form.Group id="header_Forgotpassword">
                            <center><h1>Password Change</h1></center>
                        </Form.Group>
                            <div className="errorDiv">
                                <br></br>
                                 <center><p><FaExclamation size="2em" id="errorDivIcon"/> Credentials Provided are Incorrect</p></center>
                            </div>
                        <br></br>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">
                                New Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='yyy' onChange={(e)=>{newpwd=e.target.value}}>
                            </Form.Control>  
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label id="formlabel">
                                Confirm New Password
                            </Form.Label>
                            <Form.Control type="password" placeholder='yyy' onChange={(e)=>{confirmnewpwd=e.target.value}}>
                            </Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary" id="FormButton">
                            Submit
                        </Button>
                    <br></br>
                        <Form.Group>
                            <center><Form.Text>
                               <Link to="/" id="href">Back to Login</Link>
                            </Form.Text></center>
                        </Form.Group>
                    </Form>
            </div>
        </div>
        </div>
    )
}
export default Changepwd;
