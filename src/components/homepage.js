import React,{useState} from 'react'
import {Button,Navbar,NavDropdown,Nav,Form,Carousel,Col,Row} from 'react-bootstrap'
import './homepage.css'
import Axios from 'axios'
import carousel1 from '../images/carousel1.jpeg'
import carousel2 from '../images/carousel2.jpg'
import {FaHome} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import {IoReturnUpBackSharp} from 'react-icons/io5'
import {MdFavorite} from 'react-icons/md'
import {GiTeacher} from 'react-icons/gi'

import {AiFillProfile} from 'react-icons/ai'

function Homepage(props) {
    
    const [fname,setfname]=useState('')
    const [lname,setlastname]=useState('');
    const [dob,setdob]=useState('');
    const [email,setemail]=useState('');
    const [phno,setphno]=useState('');
    const [summary,setsummary]=useState('')
    const username=" "+props.username;
    function profile(){
        const profile=document.querySelector('.Profile')
        const home=document.querySelector('.home')
        profile.style.display='block'
        home.style.display='none'
        Axios.post('http://localhost:3001/api/getDetails',{
            email:props.username
        }).then((det)=>{
            setfname(det.data['0']['firstname'])
            setlastname(det.data['0']['lastname'])
            setdob(det.data['0']['dob'])
            setemail(det.data['0']['email'])
            setphno(det.data['0']['phonenumber'])
            setsummary(det.data['0']['summary'])
        })
    }
    function update(){
        console.log(fname)
        Axios.post('http://localhost:3001/api/update',{
        firstname:fname,
        lastname:lname,
        email:email,
        phno:phno,
        summary:summary,
        }).then(()=>{
            alert("Update Successful")
        })
    }
    function GotoHome(){
        const profile=document.querySelector('.Profile')
        const home=document.querySelector('.home')
        profile.style.display='none'
        home.style.display='block'
    }
    
    return (
        
        <div>
            <div className="home">
            <div>
                <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                    <Navbar.Brand><ImProfile size='2em'/> Profile_Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
        
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-success">Search</Button>
                    
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="#link" id="HomeLink"><FaHome size='1.5em'/> HOME</Nav.Link>
                        <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={profile}>Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Sign Out</NavDropdown.Item>
                        </NavDropdown>  
                    </Navbar.Collapse>
                </Navbar>
            </div>
                <Carousel>
                    <Carousel.Item>
                        <img
                        src={carousel1}
                        alt="First slide"
                        width='100%'
                        height='400px'
                        id="carousel1"
                        />
                        <Carousel.Caption>
                        <h3 id="carouselHead">First slide label</h3>
                        <br></br>
                        <br></br>
                        <p id="carouselPara">
                            Join over 140,000 teachers, students, educators and professionals from
                            110 countries that use PortfolioGen to share and showcase
                            their skills, education, work, achievements and professional growth
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>      
                    <Carousel.Item>
                        <img
                        src={carousel2}
                        alt="Second slide"
                        width='100%'
                        height='400px'
                        id="carousel1"
                        />
                        <Carousel.Caption>
                        <h3 id="carouselHead">First slide label</h3>
                        <br></br>
                        <br></br>
                        <p id="carouselPara">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>    
                </Carousel>
                <br></br>

                <div id="WhyPB">
                    <h3 id="featureHeader">Why use <span>ProfileBuilder</span> ?</h3>    
                    <p>
                    Profile Builder gives teachers and students a tool needed to highlight and demonstrate their skills in a modern and unique way. 
                    This allows Teachers to import your profile from Amrita Faculty Website and Google Scholar and edit it and display it accordingly 
                    in the Profile Builder. Additionally teachers can add their resumes, paper Works and many more resources into profile builder. 
                    Students can visit teacher’s profiles and can request them for their guidance. Profile Builder thus makes it easy to create a 
                    customized portfolio to showcase and share your skills, education, work experience and achievements, while providing an opportunity 
                    for reflection and continued professional growth and students to be aspired, guided and grow from them.
                    </p>
                </div>
                <br></br>

                <div id="Features">
                    <center>
                        <h4 id="featureHeader">ProfileBuilder <span>Features</span></h4>    
                    </center>
                    
                    <Row id="FeaturesRow">
                        <Col sm={12} lg={4} id="FeaturesRowCol">
                            <center><h5>Consultation</h5></center>
                            <center><GiTeacher size="3em" color="white"/></center>
                            <p>Students can visit teacher’s profiles and can request them for their guidance, by mailing them separately or applying for 
                                consulting through the Profile Builder website</p>
                        </Col>
                        <Col sm={12} lg={3} id="FeaturesRowCol">
                            <center><h5>Favorite Profile</h5></center>
                            
                            <center><MdFavorite size="3em" color="white"/></center>
                            <p>Favouriting a profile is like private bookmark to make it easier to find them again later. The other user is never notified 
                                that you have saved them as a favourite.</p>
                        </Col>
                        <Col sm={12} lg={4} id="FeaturesRowCol">
                            <center><h5>Profile Generation</h5></center>
                            <center><AiFillProfile size="3em" color="white"/></center>
                            <p>Faculty members can import their profile from Amrita Faculty Website and Google Scholar. They can edit and display the contents
                                 accordingly. Additional resources can also be added explicitly by a faculty.</p>
                        </Col>
                    </Row>
                </div>
                <br></br>
                <div id="footer">
                    <center>
                        <h4 id="footerHeader">ProfileBuilder</h4>    
                    </center>
                    <hr></hr>
                    <footer>
                        <center><p>2021 Profile Builder Team</p></center>
                    </footer>
                </div>
            </div>

            <div className='Profile'>
                <div>
                <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                    <Navbar.Brand><ImProfile size='2em'/> Profile_Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse className="justify-content-end">
                    <Nav.Link href="#home" id="HomeLink"><IoReturnUpBackSharp size="1.5em"/>  GO BACK</Nav.Link>
                    <Nav.Link onClick={GotoHome} id="HomeLink"><FaHome size="1.5em"/>  HOME</Nav.Link>
                        <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">Sign Out</NavDropdown.Item>
                        </NavDropdown>  
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <div className="Details">
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label id="formlabel">First Name</Form.Label>
                        <Form.Control type="text" placeholder='firstname' value={fname} onChange={(e)=>{setfname(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label id="formlabel">Last Name</Form.Label>
                        <Form.Control type="text" placeholder='lastname' value={lname} onChange={(e)=>{setlastname(e.target.value)}} />
                    </Form.Group>
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label id="formlabel">PhNumber</Form.Label>
                            <Form.Row>
                                <Col >
                                    <Form.Control id="formlabel" plaintext readOnly defaultValue="+91" />
                                </Col>
                                <Col xs={10}>
                                    <Form.Control type="text" placeholder='PhNO' value={phno} onChange={(e)=>setphno(e.target.value)}/>
                                </Col>
                            </Form.Row>
                    </Form.Group>
                    <Form.Group controlId='formBasicEmail'>
                        <Form.Label id="formlabel">Email Address</Form.Label>
                        <Form.Control type="email" placeholder='mailId' value={email} onChange={(e)=>setemail(e.target.value)} ></Form.Control>
                    </Form.Group> 
                    <Form.Group controlId="formPlaintextEmail">
                        <Form.Label id="formlabel">Summary(Max 1000 char)</Form.Label>
                        <Form.Control type="text" maxLength="1000" rows={5} value={summary} onChange={(e)=>setsummary(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" onClick={update}>Edit</Button>
                </div>
            </div>   
        </div>
    )
}
export default Homepage;