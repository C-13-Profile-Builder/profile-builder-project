import React from 'react'
import './homepage.css'
import Axios from 'axios'
import {Navbar,Button} from 'react-bootstrap'
import {ImProfile} from 'react-icons/im'

import {FaExclamation} from 'react-icons/fa'
import {useParams} from 'react-router-dom'
function Activateaccount() {
    let {uname}=useParams()
    function reactivate(){
        console.log("gtreuwhlawljsaks")
        Axios.post("http://34.67.187.5:5000/api/updateActivate_account",{
            email:uname,
            yes_no:'Y',
        })
        const tag1=document.querySelector('.hideactivateaccount')
        const tag2=document.querySelector('.hideh2inactivateaccount')
        tag1.style.display='none'
        tag2.style.display='block'
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
                <div className='container' style={{width:'90%',backgroundColor:'white',backgroundImage:'none'}}>
                    <h1 style={{padding:'20px'}}>Welcome <span style={{color:'#e3a026'}}>{uname},</span></h1>
                    <div className="hideactivateaccount">
                        <center><Button size='lg' variant="outline-success" onClick={reactivate}>
                            Click here to activate
                        </Button></center>
                    </div>
                    <div className="hideh2inactivateaccount" style={{display:'none'}}>
                        <h4>&emsp;<FaExclamation size='2em' id="errorDivIcon"/> Your Account is Successfully Activated, Login With your Credentials</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Activateaccount;