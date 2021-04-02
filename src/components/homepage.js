import React,{useState} from 'react'
import {Button,Navbar,NavDropdown,Nav,Form,Carousel,Col,Row} from 'react-bootstrap'
import './homepage.css'
import './Loginpage.css'
import Loginpage from './Loginpage'
import Axios from 'axios'
import carousel1 from '../images/carousel1.jpeg'
import carousel2 from '../images/carousel2.jpg'
import {FaHome} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import {IoReturnUpBackSharp} from 'react-icons/io5'
import {MdFavorite} from 'react-icons/md'
import {GiTeacher} from 'react-icons/gi'
import {AiFillProfile} from 'react-icons/ai'
import { HandIndex } from 'react-bootstrap-icons'


function Homepage(props) {
    const [profilegenerate,setProfileGenerate]=useState('');
    const [fname,setfname]=useState('');
    const [lname,setlastname]=useState('');
    const [dob,setdob]=useState('');
    const [email,setemail]=useState('');
    const [phno,setphno]=useState('');
    const [summary,setsummary]=useState('')
    const username=" "+props.username;
    var [FacultyProfileData,setFacultyProfileData]=useState([])
    const [IndividualProfile,setIndividualProfile]=useState([])
    var [domains,setdomain]=useState([])
    var [articles,setarticles]=useState([])
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
        const IndividualFacultyProfile=document.querySelector('.IndividualFacultyProfile')
        const Generation=document.querySelector('.Generation')
        profile.style.display='none'
        home.style.display='block'
        IndividualFacultyProfile.style.display='none'
        Generation.style.display='none'
    }
    
    function GotoLogin(){
        const profile=document.querySelector('.deleteProfilePage')
        const login=document.querySelector('.LoginRegister')
        const home=document.querySelector('.home')
        const Generation=document.querySelector('.Generation')
        Generation.style.display='none'
        home.style.display='none'
        profile.style.display='none'
        login.style.display='block'
    }

    function deleteProfile(){
        const home=document.querySelector('.home')
        const profile=document.querySelector('.deleteProfilePage')
        profile.style.display='block'
        home.style.display='none'
    }

    function deleteProf(){
        Axios.post('http://localhost:3001/api/delete',{
            email:props.username,
        }).then(()=>{
            GotoLogin();
            alert("Delete Successful")
        })
    }
    
    function ProfileGenerate(from){
        if(profilegenerate!=''){
            Axios.post('http://localhost:3001/api/generate',{
              subject: profilegenerate
            }).then((result)=>{
                console.log(result.data)
                console.log(result)
                setFacultyProfileData(result.data)
                console.log(FacultyProfileData)
                FacultyProfileData.map((p)=>{
                    console.log(p)
                })
            })
            const Generation=document.querySelector('.Generation')
            const fromclass=document.querySelector('.'+from)
            Generation.style.display='block'
            fromclass.style.display='none'
        }
    }
    function ViewCompleteArticle(gsid){
        const generation=document.querySelector('.Generation')
        const IndividualFacultyProfile=document.querySelector('.IndividualFacultyProfile')
        generation.style.display='none'
        IndividualFacultyProfile.style.display='block'
        console.log(gsid)
        Axios.post("http://localhost:3001/api/generateallarticleOfAFaculty",{
            gsid:gsid
        }).then((res)=>{
            setIndividualProfile(res.data['1'])
            setdomain(res.data['0'])
            console.log(domains)
            setarticles(res.data['2'])
            console.log(articles)
        })
    }
    return (
        
        <div>
            <div className="home">
            <div>
                <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                    <Navbar.Brand><ImProfile size='2em'/> Profile_Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>setProfileGenerate(e.target.value)}/>
                        <Button variant="outline-success"  onClick={()=>ProfileGenerate("home")}>Search</Button>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="#link" id="HomeLink"><FaHome size='1.5em'/> HOME</Nav.Link>
                        <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={profile} to="/Profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={deleteProfile}>Delete</NavDropdown.Item>
                            <NavDropdown.Item onClick={GotoLogin} path="/login">Sign Out</NavDropdown.Item>
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
                        <h3 id="carouselHead">"The best way to predict the future is to create it"</h3>
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
            <div className='deleteProfilePage'>
                <Form.Group controlId="formPlaintext">
                    <Form.Label id="formlabel">Click The button to delete account Permanently</Form.Label>
                </Form.Group>
                <Button type="submit" variant="primary" onClick={deleteProf}>
                    Edit
                </Button>
            </div>

            <div className='Generation'>
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
                <div className='FacultyDetails'>
                    <center><h2>{profilegenerate}</h2></center>
                    <br></br>
                    <div className="ListOfFaculties">
                        {FacultyProfileData.map((index) => (
                            <Row id="ListOfFacultiesRow">
                                <Col md={4}>
                                   <center> <img src={index.photo_url} width="128px" height="128px" id="ListOfFacultiesRowImg"/></center>
                                   <br></br>
                                </Col>
                                <Col md={7}>
                                    <Row>
                                    <p id="ListOfFacultiesPara">Name: <span>{index.prf_name}</span></p>
                                    </Row>
                                    <Row>
                                    <p id="ListOfFacultiesPara">Place of work: <span>{index.prf_des}</span></p>
                                    </Row>
                                    <Row>
                                    <p id="ListOfFacultiesPara">GS ID: <span>{index.gs_id}</span></p>
                                    </Row>
                                    <Row>
                                    <p id="ListOfFacultiesPara">Articles: <span><a onClick={()=>ViewCompleteArticle(index.gs_id)}>View Articles</a></span></p>
                                    </Row>
                                </Col>
                            </Row>
                            
                        ))}
                    </div>
                </div>
            </div>

            <div className="IndividualFacultyProfile">
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
                <div className='FacultyDetails'>
                        <div className="ListOfFaculties">
                        <div id="subjects">
                            {IndividualProfile.map((index) => (
                                <div id="ListOfFacultiesRow">
                                <Row >
                                    <Col md={4}>
                                    <center> <img src={index.photo_url} width="128px" height="128px" id="ListOfFacultiesRowImg"/></center>
                                    <br></br>
                                    </Col>
                                    <Col md={7}>
                                        <Row>
                                        <p id="ListOfFacultiesPara">Name: <span>{index.prf_name}</span></p>
                                        </Row>
                                        <Row>
                                        <p id="ListOfFacultiesPara">Place of work: <span>{index.prf_des}</span></p>
                                        </Row>
                                        <Row>
                                        <p id="ListOfFacultiesPara">GS ID: <span>{index.gs_id}</span></p>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row id="subjectRow">
                                {domains.map((index) => (
                                    <Col>
                                       <center> <p id="ListOfFacultiesPara">{index.domain}</p></center>
                                    </Col>
                                ))}
                            </Row>
                            <br></br>
                                </div>
                                
                            ))}
                            
                            </div> 
                        </div>
                        <br></br>
                        <br></br>
                </div>

                <div className="articles">
                <div>
                    {articles.map((index) => (
                        
                        <div id="articleRow">
                            <p id="ListOfFacultiesPara">Title: <span>{index.title}</span></p>
                            <Row xs={6}>      
                              <Col><p id="ListOfFacultiesPara">Cite: <span>{index.cite}</span></p></Col>                     
                              <Col><p id="ListOfFacultiesPara">Year: <span>{index.year}</span></p></Col>
                            </Row>  
                            <p id="ListOfFacultiesPara">Authors: <span>{index.authors}</span></p>
                            
                        </div>
                            ))}
                        </div>
                </div>
            </div>

        </div>
    )
}
export default Homepage;