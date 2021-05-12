import React,{useState} from 'react'
import {Button,Navbar,NavDropdown,Nav,Form,Carousel,Col,Row,Image,InputGroup} from 'react-bootstrap'
import './homepage.css'
import {useParams,useHistory} from 'react-router-dom'
import Axios from 'axios'
import carousel1 from '../images/carousel1.jpeg'
import carousel2 from '../images/carousel2.jpg'
import {FaHome} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'
import {IoReturnUpBackSharp,IoSend} from 'react-icons/io5'
import {MdFavorite} from 'react-icons/md'
import {GiTeacher} from 'react-icons/gi'
import {FcFeedback} from 'react-icons/fc'
import {AiFillCloseSquare,AiFillProfile,AiOutlineStar,AiOutlineMail,AiOutlinePhone} from 'react-icons/ai'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Modal from "react-bootstrap/Modal"
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Rating from '@material-ui/lab/Rating';


var historyArray=[];
var userchoice=[]
function searchdropdown() {
    var i=0
    userchoice=[]
    Axios.post("http://localhost:3001/api/getForDropdown",{}).then((t)=>{
    for(i=0;i<t.data[0].length;i++){
        userchoice.push(t.data[0][i]['prf_name'])
    }
    for(i=0;i<t.data[1].length;i++){
        userchoice.push(t.data[1][i]['domain'])
    }
    })
    
}

function Homepage(props) {
    let history=useHistory()
    let {uname,rating}=useParams()
    const [profilegenerate,setProfileGenerate]=useState('');
    const [fname,setfname]=useState('');
    const [lname,setlastname]=useState('');
    const [email,setemail]=useState('');
    const [phno,setphno]=useState('');
    const [summary,setsummary]=useState('')
    const username=" "+uname;
    var [FacultyProfileData,setFacultyProfileData]=useState([])
    const [IndividualProfile,setIndividualProfile]=useState([])
    var [domains,setdomain]=useState([])
    var [articles,setarticles]=useState([])
    var [profilearticles,setprofilearticles]=useState([])
    var [FavoriteFacultyProfile,setFavoriteFacultyProfile]=useState([])
    var [gsid,setgsid]=useState('');
    var [gsprf_des,setgsprf_des]=useState('');
    var [gsimg,setgsimg]=useState('');
    var [facwork,setfacwork]=useState();
    var [facdomain,setfacdomain]=useState('');
    var [changepageno,setchangepageno]=useState(0);
    var [student_or_faculty,setstudent_or_faculty]=useState('')
    var [paginationpageno,setpaginationpageno]=useState(1)
    var [msgShow,setmsgShow]=useState(false)
    const [show, setShow] = useState(false);
    var [reportstated,setreportstated]=useState('')
    const [ratingshow, setShowrating] = useState(rating=='false'?false:true);
    const [ratingvalue, setratingValue] = React.useState(0);
    const [hoverrating, setHoverrating] = React.useState(-1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloserating = () => setShowrating(false);
    const handlemsgShow =() => setmsgShow(false)
    var [dropdownoptions,setdropdownoptions]=useState([])
    
    

    
    searchdropdown()
    
    

    function profile(NameClass){
        const name=document.querySelector('.'+NameClass)
        const profiles=document.querySelector('.Profile')
        name.style.display='none'
        profiles.style.display='block'
        const faculty_or_not=document.querySelector('#GoogleSDetails')
        const profilearticle=document.querySelector('#GoogleSDetailsArticles')
        
        historyArray.push(NameClass)
        Axios.post('http://localhost:3001/api/getDetails',{
            email:uname
        }).then((det)=>{
            setfname(det.data['0']['firstname'])
            setlastname(det.data['0']['lastname'])
            setemail(det.data['0']['email'])
            setphno(det.data['0']['phonenumber'])
            setsummary(det.data['0']['summary'])
            if(det.data['0']['Faculty']=='Y'){
                setstudent_or_faculty('N')
                faculty_or_not.style.display='block';
                profilearticle.style.display='block'
                Axios.post('http://localhost:3001/api/getgsdetailsgorprofile',{
                    mail:uname
                }).then((result)=>{
                    var i;
                    var s=''
                    result.data['1'].forEach((index)=>{
                        s=s+','+index['domain']
                    })
                    console.log(result)
                    setgsid(result.data['0']['0']['gs_id'])
                    setgsprf_des(result.data['0']['0']['prf_des'])
                    setgsimg(result.data['0']['0']['photo_url'])
                    setfacwork(result.data['0']['0']['COUNT(gsarticle.id)'])
                    setfacdomain(s.substring(1))
                })
                profilePagination(paginationpageno)

            }
            else{
                setstudent_or_faculty('Y')
                faculty_or_not.style.display='none';
            }
        })
    }

    const paginationpagechange=(event,value)=>{
        setpaginationpageno(value)
        profilePagination(paginationpageno)
    }
    function profilePagination(val){
        console.log(val)
        var arr=[]
        Axios.post("http://localhost:3001/api/generatearticlesinprofile",{
            mail:uname
        }).then((result)=>{
            setarticles(result.data)
        })
        var m=Math.min(articles.length,(val-1)*3 + 3)
        for(var i=(val-1)*3;i<m;i++){
            arr.push(articles[i])
        }
        console.log(arr)
        setchangepageno(changepageno+3)
        setprofilearticles(arr)
    }

    function deletegsarticle(id,value){
        console.log("Hii",id,value)
        Axios.post("http://localhost:3001/api/deletegsarticles",{
            id:id
        }).then((t)=>{
            console.log(t)
            if(t.data=="Success"){
                alert("Delete Succcessful")
                profilePagination(paginationpageno)
            }
            else{
                alert("Delete failed")
            }
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

    function GotoHome(NameClass){
        const name=document.querySelector('.'+NameClass)
        const home=document.querySelector('.home')
        name.style.display='none'
        home.style.display='block'
        while(historyArray.length){
            historyArray.pop();
        }
    }
    
    function GotoLogin(){
        const faculty_or_not=document.querySelector('#GoogleSDetails')
        faculty_or_not.style.display='none'
        const profilearticle=document.querySelector('#GoogleSDetailsArticles')
        profilearticle.style.display='none'
        history.push("/")
    }


    function deleteProf(){
        Axios.post('http://localhost:3001/api/delete',{
            email:uname,
        }).then(()=>{
            GotoLogin();
        })
    }
    
    function ProfileGenerate(from){
        historyArray.push(from)
        if(profilegenerate!=''){
            Axios.post('http://localhost:3001/api/generate',{
              subject_name: profilegenerate
            }).then((result)=>{
                setFacultyProfileData(result.data)
            })
            const Generation=document.querySelector('.Generation')
            const fromclass=document.querySelector('.'+from)
            Generation.style.display='block'
            fromclass.style.display='none'
        }
    }
    function ViewCompleteArticle(gsid,NameClass){
        const IndividualFacultyProfile=document.querySelector('.IndividualFacultyProfile')
        const nc=document.querySelector('.'+NameClass)
        nc.style.display='none'
        IndividualFacultyProfile.style.display='block'
        historyArray.push(NameClass)
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
    

    function AddToFavorites(gs_id){
        Axios.post("http://localhost:3001/api/getDetails",{
            email:uname
        }).then((result)=>{
            console.log(result)
            Axios.post("http://localhost:3001/api/insertFavorites",{
                id:result.data['0']['id'],
                gsid:gs_id,
            }).then((res)=>{
                console.log(res.data)
                if(res.data=="Yes")
                {
                    var popup = document.getElementById("myPopup");
                    popup.classList.toggle("show");
                    popup.classList.toggle("popuptext::after");
                    
                }
            })
            
        })
    }
    function DisplayFavorites(NameClass){
        console.log(NameClass)
        if(NameClass!="displayFavorites")
            historyArray.push(NameClass)
        const favorite=document.querySelector('.displayFavorites')
        const name=document.querySelector('.'+NameClass)
        name.style.display='none'
        favorite.style.display='block'
        
        Axios.post("http://localhost:3001/api/getDetails",{
            email:uname
        }).then((result)=>{
            Axios.post("http://localhost:3001/api/favorites",{
                id:result.data['0']['id'],
            }).then((res)=>{
                console.log(res.data)
                setFavoriteFacultyProfile(res.data)
                console.log(FavoriteFacultyProfile)
            })
        })
    }
    function RemoveFromFavorites(gs_id){
        Axios.post("http://localhost:3001/api/getDetails",{
            email:uname
        }).then((result)=>{
            console.log(result)
            Axios.post("http://localhost:3001/api/deleteFavorites",{
                id:result.data['0']['id'],
                gsid:gs_id,
            }).then((res)=>{
                console.log(res.data)
                if(res.data=="Success"){
                    DisplayFavorites("displayFavorites")
                }
            }) 
        })
    }
    function goBack(c_page){
        if(historyArray.length>0){
        const nc=historyArray.pop()
        console.log(nc,historyArray)
        const cpage=document.querySelector('.'+c_page)
        const namec=document.querySelector('.'+nc)
        cpage.style.display='none'
        namec.style.display='block'
        }

    }

    function update_review(){
        Axios.post("http://localhost:3001/api/updatereview",{
            email:uname,
            rating:ratingvalue,
        })
        setShowrating(false);
    }
    function formfeedbackShow_End(type){
        const feedbackForm=document.querySelector('.feedbackForm')
        const formfeed=document.querySelector('.formoffeedback')
        if(type==='open'){
            formfeed.style.backgroundColor='white'
            formfeed.style.borderRadius='10px'
            formfeed.style.padding='10px'
            formfeed.style.display='block';
        }
        else{
            // feedbackForm.style.backgroundColor='none'
            // feedbackForm.style.borderRadius='0px'
            formfeed.style.display='none';
        }
    }
    function submitreport(){
        if(reportstated!==''){
            Axios.post("http://localhost:3001/api/submit_report",{
                email:uname,
                report:reportstated,
            }).then((t)=>{
                alert('Review Accepted')
            })
            setreportstated('')
        }
        else{
            alert('No text')
        }
        formfeedbackShow_End('close')  
    }

    return (
        
        <div>
            <div className="home">
            <div>
                <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                    <Navbar.Brand><ImProfile size='2em'/> Profile_Builder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse>
                        {/* <Form.Control type="text" placeholder="Search" className="mr-sm-2" onChange={(e)=>setProfileGenerate(e.target.value)}/> */}
                        <Autocomplete
                            id="combo-box-demo"
                            options={userchoice}
                            getOptionLabel={(option) => option}
                            onChange={(event, value) => setProfileGenerate(value)}
                            
                            style={{ width: 300,marginRight:20 , borderColor: '#ffffff'}}
                            renderInput={(params) => <TextField {...params}
                            label="Search" variant="outlined" id="autocompleteTextField"/>}
                        />
                        <Button variant="outline-success"  onClick={()=>ProfileGenerate("home")}>Search</Button>
                            
                        
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="#link" id="HomeLink"><FaHome size='1.5em'/> HOME</Nav.Link>
                        <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>profile("home")} >Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>DisplayFavorites("home")}>Favorites</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleShow}>Delete</NavDropdown.Item>
                            <NavDropdown.Item onClick={GotoLogin}>Sign Out</NavDropdown.Item>
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
                            their skills, education, work, achievements and professional growth.
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
                        <h3 id="carouselHead">"The best way to predict the future is to create it"</h3>
                        <br></br>
                        <br></br>
                        <p id="carouselPara">Join over 140,000 teachers, students, educators and professionals from
                            110 countries that use PortfolioGen to share and showcase
                            their skills, education, work, achievements and professional growth.</p>
                        </Carousel.Caption>
                    </Carousel.Item>    
                </Carousel>
                <br></br>
                <div className='feedbackForm'>
                    <div className='feedbackicon'>
                        <FcFeedback size='4em' onClick={()=>formfeedbackShow_End('open')}/>
                    </div>
                    <div className='formoffeedback'>
                        <Button variant="outline-danger" onClick={()=>formfeedbackShow_End('close')}><AiFillCloseSquare size='1.5em' padding='0px'/></Button>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Text className="text-muted">
                                    Hi,
                                </Form.Text>
                                <Form.Text className="text-muted">
                                    &emsp; We are here to help you have 
                                </Form.Text>
                                <Form.Text className="text-muted">
                                    the best user experience.
                                </Form.Text>  
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Your Review</Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control type="text" aria-describedby="basic-addon1" onChange={(e)=>setreportstated(e.target.value)} />
                                    <InputGroup.Prepend>
                                        <Button variant="outline-secondary" type='reset' onClick={submitreport}><IoSend/></Button>
                                    </InputGroup.Prepend>     
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
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
                    <Nav.Link id="HomeLink" onClick={()=>goBack("Profile")}><IoReturnUpBackSharp size="1.5em"/>  GO BACK</Nav.Link>
                    <Nav.Link onClick={()=>GotoHome("Profile")} id="HomeLink"><FaHome size="1.5em"/>  HOME</Nav.Link>
                        <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>DisplayFavorites("Profile")}>Favorites</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={GotoLogin}>Sign Out</NavDropdown.Item>
                        </NavDropdown>  
                    </Navbar.Collapse>
                </Navbar>
                </div>
                <div className="Details">
                    <Row>
                    <Col md={student_or_faculty=='Y'?12:6}>
                        <div id="peronalDetails">
                            <center><h2 id="featureHeader">Personal <span>Details</span></h2></center>
                            <br></br>
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
                    </Col>
                    <Col md={6}>
                        <div id="GoogleSDetails">
                            <center><h2 id="featureHeader">Google <span>Scholar</span></h2></center>
                            <br></br>
                            <center>
                            <Image src={gsimg} rounded/> </center>
                            
                            <Form.Group controlId="formPlaintextEmail">
                                <Form.Label id="formlabel">Google Scholar ID</Form.Label>
                                <Form.Control type="text" value={gsid} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formPlaintextEmail">
                                <Form.Label id="formlabel">Working At</Form.Label>
                                <Form.Control type="text" value={gsprf_des} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formPlaintextEmail">
                                <Form.Label id="formlabel">Accomplished works</Form.Label>
                                <Form.Control type="text" value={facwork} readOnly />
                            </Form.Group>
                            <Form.Group controlId="formPlaintextEmail">
                                <Form.Label id="formlabel">Domains</Form.Label>
                                <Form.Control as="textarea" rows={2} value={facdomain} readOnly />
                            </Form.Group>    
                        </div>        
                    </Col>
                    </Row>
                    <br></br>
                    <div id="GoogleSDetailsArticles">
                        <center><h1>Articles</h1></center>
                            {profilearticles.map((index) => (
                                <Typography id="articleRow">
                                    <div id="articlerowclosebutton" className="justify-content-end">
                                        <Button variant="outline-danger" onClick={()=>deletegsarticle(index.gsarticleid)}><AiFillCloseSquare size='1.5em'/> Remove</Button>
                                    </div>
                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label id="labelProfilepage" column sm="2">Title</Form.Label>
                                        <Col sm="8">
                                        <Form.Control type="text" value={index.title}/>
                                        </Col>
                                    </Form.Group>
                                    
                                    {/* <p id="ListOfFacultiesPara">Title: <span>{index.title}</span></p> */}
                                    <Row xs={6}>      
                                    <Col><p id="ListOfFacultiesPara">Cite: <span>{index.cite}</span></p></Col>                     
                                    <Col><p id="ListOfFacultiesPara">Year: <span>{index.year}</span></p></Col>
                                    </Row>  
                                    <p id="ListOfFacultiesPara">Authors: <span>{index.authors}</span></p>
                                    <hr />
                                </Typography>
                            ))}
                            <div id="articleRow">
                                <Pagination count={Math.ceil(articles.length/3)} onChange={paginationpagechange} variant="outlined" color="primary" large/>                        
                            </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>Click The button to delete account Permanently</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={deleteProf}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={ratingshow} onHide={handleCloserating} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Rate Us Based on User Eperience</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <center><Rating
                    mx="auto"
                    name="hover-feedback"
                    value={ratingvalue}
                    precision={0.5}
                    onChange={(event, newValue) => {
                    setratingValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                    setHoverrating(newHover);
                    }}
                /></center>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={update_review}>Submit</Button>
                </Modal.Footer>
            </Modal>
            
            <div className='Generation'>
                <div>
                    <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                        <Navbar.Brand><ImProfile size='2em'/> Profile_Builder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse className="justify-content-end">
                        <Nav.Link id="HomeLink" onClick={()=>goBack("Generation")}><IoReturnUpBackSharp size="1.5em"/>  GO BACK</Nav.Link>
                        <Nav.Link onClick={()=>GotoHome("Generation")} id="HomeLink"><FaHome size="1.5em"/>  HOME</Nav.Link>
                            <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>profile("Generation")}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>DisplayFavorites("Generation")}>Favorites</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={GotoLogin}>Sign Out</NavDropdown.Item>
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
                                    <p id="ListOfFacultiesPara">Articles: <span><a onClick={()=>ViewCompleteArticle(index.gs_id,'Generation')}>View Articles</a></span></p>
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
                        <Nav.Link id="HomeLink" onClick={()=>goBack("IndividualFacultyProfile")}><IoReturnUpBackSharp size="1.5em"/>  GO BACK</Nav.Link>
                        <Nav.Link onClick={()=>GotoHome("IndividualFacultyProfile")} id="HomeLink"><FaHome size="1.5em"/>  HOME</Nav.Link>
                            <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>profile("IndividualFacultyProfile")}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={()=>DisplayFavorites("IndividualFacultyProfile")}>Favorites</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={GotoLogin}>Sign Out</NavDropdown.Item>
                            </NavDropdown>  
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className='FacultyDetails'>
                        <div className="ListOfFaculties">
                        <div id="subjects">
                            {IndividualProfile.map((index) => (
                                <div id="ListOfFacultiesRow">
                                <Row className="justify-content-end" id="IndividualFacultyProfileButton">
                                    <Button variant="outline-dark" onClick={()=>AddToFavorites(index.gs_id)} id="popup"><AiOutlineStar/> Favorites<span className="popuptext" id="myPopup">Already In Favorites!</span></Button>
                                </Row>
                                <Row >
                                    <Col md={5}>
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
                                            <a id="ListOfFacultiesParaLink"><AiOutlineMail size="1.5em" color="blue"/>  <span>{index.email}</span></a>
                                        </Row>
                                        <Row>
                                            <a id="ListOfFacultiesParaLink"><AiOutlinePhone size="1.5em" color="blue"/>  <span>{index.phonenumber}</span></a>
                                        </Row>
                                        
                                    </Col>
                                </Row>
                                <br></br>
                                <Row id="subjectRow">
                                {domains.map((index1) => (
                                    <Col>
                                       <center> <p id="ListOfFacultiesPara">{index1.domain}</p></center>
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

            <div className="displayFavorites">
                <div>
                    <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                        <Navbar.Brand><ImProfile size='2em'/> Profile_Builder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse className="justify-content-end">
                        <Nav.Link id="HomeLink" onClick={()=>goBack("displayFavorites")}><IoReturnUpBackSharp size="1.5em"/>  GO BACK</Nav.Link>
                        <Nav.Link onClick={()=>GotoHome("displayFavorites")} id="HomeLink"><FaHome size="1.5em"/>  HOME</Nav.Link>
                            <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>profile("displayFavorites")}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={GotoLogin}>Sign Out</NavDropdown.Item>
                            </NavDropdown>  
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className='FacultyDetails'>
                    <center><h2>ALL FAVORITE PROFILES</h2></center>
                    <br></br>
                    <div className="ListOfFaculties">
                        {FavoriteFacultyProfile.map((index) => (
                            <div>
                                <Row className="justify-content-end" id="IndividualFacultyProfileButton">
                                    <Button variant="outline-light" onClick={()=>RemoveFromFavorites(index.gs_id)} ><AiOutlineStar/> Remove From Favorites</Button>
                                </Row>
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
                                        <p id="ListOfFacultiesPara">Articles: <span><a onClick={()=>ViewCompleteArticle(index.gs_id,'displayFavorites')}>View Articles</a></span></p>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            
                        ))}
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Homepage;