import React,{useState,useEffect} from 'react'
import {Button,Navbar,NavDropdown,Nav,Form,Carousel,Col,Row,Image,InputGroup,Link, ModalBody} from 'react-bootstrap'
import './homepage.css'
import {useParams,useHistory} from 'react-router-dom'
import Axios from 'axios'
import carousel1 from '../images/carousel1.jpeg'
import carousel2 from '../images/carousel2.jpg'
import {FaHome} from 'react-icons/fa'
import {ImProfile,ImConnection} from 'react-icons/im'
import {IoReturnUpBackSharp,IoSend,IoGlobe} from 'react-icons/io5'
import {MdFavorite} from 'react-icons/md'
import {BsStarFill,BsStarHalf,BsStar} from 'react-icons/bs'
import {ImHappy2} from 'react-icons/im'
import {IoMdNotifications} from 'react-icons/io'
import {GiTeacher,GiThink} from 'react-icons/gi'
import {FcFeedback,FcInfo} from 'react-icons/fc'
import {FaExclamation} from 'react-icons/fa'
import {RiNumber0,RiNumber1,RiNumber2,RiNumber3,RiNumber4,RiNumber5,RiNumber6,RiNumber7,RiNumber8,RiNumber9} from 'react-icons/ri'
import {AiFillCloseSquare,AiFillProfile,AiOutlineStar,AiOutlineMail,AiOutlinePhone,AiOutlineArrowRight, AiFillDelete} from 'react-icons/ai'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Modal from "react-bootstrap/Modal"
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Rating from '@material-ui/lab/Rating';

var FontAwesomeIcon=require('react-fontawesome')
var historyArray=[];
var userchoice=[]
function searchdropdown() {
    var i=0
    userchoice=[]
    Axios.post("http://34.67.187.5:5000/api/getForDropdown",{}).then((t)=>{
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
    // let uname="mksroct2000@gmail.com"
    // let rating=false
    const arr=window.location.href.split('/')
    console.log(arr[arr.length-1],arr[arr.length-2],arr)
    let uname=arr[arr.length-2];
    let rating=arr[arr.length-1];
    // let {uname,rating}=useParams()
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
    var [profilePublication,setprofilePulication]=useState([])
    var [FavoriteFacultyProfile,setFavoriteFacultyProfile]=useState([])
    var [gsid,setgsid]=useState('');
    var [userid,setuserid]=useState(0);
    var [gsprf_des,setgsprf_des]=useState('');
    var [gsimg,setgsimg]=useState('');
    var [facwork,setfacwork]=useState();
    var [facdomain,setfacdomain]=useState('');
    var [changepageno,setchangepageno]=useState(0);
    var [student_or_faculty,setstudent_or_faculty]=useState('')
    var [paginationpageno,setpaginationpageno]=useState(1)
    var [msgShow,setmsgShow]=useState(false)
    const [show, setShow] = useState(false);
    const [showprofileinnetworks, setshowprofileinnetworks] = useState(false);
    var [reportstated,setreportstated]=useState('')
    var [connection_status,setconnection_status]=useState('Connect')
    var [facultyHistory, setFacultyHistory] = useState([]);
    const [ratingvalue, setratingValue] = React.useState(0);
    const [hoverrating, setHoverrating] = React.useState(-1);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [documentname,setdocumentname]=useState('PB-HomePage')
    const handleCloseprofileinnetworks =() => setshowprofileinnetworks(false);
    const handlemsgShow =() => setmsgShow(false)
    var [dropdownoptions,setdropdownoptions]=useState([])
    var [acceptedrequests,setacceptedrequests]=useState([])
    var [waitingrequests,setwaitingrequests]=useState([])
    var [deniedrequests,setdeniedrequests]=useState([])
    var [studentCertificate,setstudentCertificate]=useState([])
    var [saCourse,setsaCourse]=useState('')
    var [saPlatform,setsaPlatform]=useState('')
    var [saurl,setsaUrl]=useState('')
    var [showStudAcheivements,setshowStudAcheivements]=useState([])
    var [fullname,setfullname]=useState('')
    var [notificationShow,setnotificationShow]=useState((rating==='false'&&localStorage.getItem('Booleannoti')==='true')?true:false);
    var handleClosernotification=()=>{setnotificationShow(false);localStorage.setItem("Booleannoti",false);localStorage.removeItem("notificationProfile");console.log(localStorage)};
    const [ratingshow, setShowrating] = useState(rating==='false'?false:true);
    const handleCloserating = () => {setShowrating(false);setnotificationShow(localStorage.getItem('Booleannoti')==='false'?false:true)};
    var [popupmsg,setpopupmsg]=useState(false)
    var [textpopupmsg,settextpopupmsg]=useState('')
    var handleclosepopupmsg=()=> setpopupmsg(false)
        const starrat={
            '0':<p><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/></p>,
            '0.5':<p><BsStarHalf size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/></p>,
            '1':<p><BsStarFill size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/></p>,
            '1.5':<p><BsStarFill size='7vh'/><BsStarHalf size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/></p>,
            '2':<p><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/></p>,
            '2.5':<p><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarHalf size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/></p>,
            '3':<p><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStar size='7vh'/><BsStar size='7vh'/></p>,
            '3.5':<p><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarHalf size='7vh'/><BsStar size='7vh'/></p>,
            '4':<p><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStar size='7vh'/></p>,
            '4.5':<p><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarHalf size='7vh'/></p>,
            '5':<p><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/><BsStarFill size='7vh'/></p>
        }
        
    function totno_of_user(){
        console.log(sessionStorage)
        var v=sessionStorage.getItem('totalusers')
        console.log(v)
        var a;
        for(var i=0;i<v.length;i++){
            var b="fa-solid fa-"+v[i]
            a=a+<FontAwesomeIcon icon={b}/>
            console.log(a)
        }
        console.log(a)
        return a
    }
    function stud_user(){
        var v=sessionStorage.getItem('Studusers')
        var a;
        for(var i=0;i<v.length;i++){
            var b="fa-solid fa-"+v[i]
            a=a+<FontAwesomeIcon icon={b} />
            console.log(a)
        }
        console.log(a)
        return a
    }
    function facuser(){
        var v=sessionStorage.getItem('Facusers')
        var a;
        for(var i=0;i<v.length;i++){
            var b="fa-solid fa-"+v[i]
            a=a+<FontAwesomeIcon icon={b} />
            console.log(a)
        }
        console.log(a)
        return a
    }
    searchdropdown()
    
    useEffect(() => {
        document.title = documentname;
      });

    function profile(NameClass){
        
        console.log(window.notificationdet,localStorage)
        const name=document.querySelector('.'+NameClass)
        const profiles=document.querySelector('.Profile')
        name.style.display='none'
        profiles.style.display='block'
        const faculty_or_not=document.querySelector('#GoogleSDetails')
        const profilearticle=document.querySelector('#GoogleSDetailsArticles')
        setdocumentname('PB-ProfilePage')
        historyArray.push(NameClass)
        Axios.post('http://34.67.187.5:5000/api/getDetails',{
            email:uname
        }).then((det)=>{
            setuserid(det.data['0']['id'])
            setfname(det.data['0']['firstname'])
            setlastname(det.data['0']['lastname'])
            setemail(det.data['0']['email'])
            setphno(det.data['0']['phonenumber'])
            setsummary(det.data['0']['summary'])
            if(det.data['0']['Faculty']=='Y'){
                const tag=document.querySelector('#addStudentAccomplishments');
                tag.style.display='none';
                setstudent_or_faculty('N')
                faculty_or_not.style.display='block';
                profilearticle.style.display='block'
                Axios.post('http://34.67.187.5:5000/api/getgsdetailsgorprofile',{
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
                setpaginationpageno(1)
                profilePagination(1)

            }
            else{
                setstudent_or_faculty('Y')
                Axios.post("http://34.67.187.5:5000/api/selectFromSA",{
                    userid:det.data['0']['id'],
                }).then((t)=>{
                    console.log(t)
                    console.log(t.data)
                    setshowStudAcheivements(t.data)
                    const tag=document.querySelector('#addStudentAccomplishments');
                    tag.style.display='block';
                })
                faculty_or_not.style.display='none';
                
            }
        })
    }
    
    
    function delete_fromstudentsAccomplisments(id,course,platform,url){
        console.log(id,course,platform,url)
        Axios.post("http://34.67.187.5:5000/api/deleteFromSA",{
            userid:id,
            course:course,
            platform:platform,
            curl:url,
        }).then((t)=>{
            alert(t.data)
            Axios.post("http://34.67.187.5:5000/api/selectFromSA",{
                    userid:userid,
                }).then((t)=>{
                    setshowStudAcheivements(t.data)
                    const tag=document.querySelector('#addStudentAccomplishments');
                    tag.style.display='none';
                    tag.style.display='block';
                })

        })
    }
    function addAccomplishments_articles(type){
        if(type==='student'){
            Axios.post("http://34.67.187.5:5000/api/insertIntoSA",{
                userid:userid,
                course:saCourse,
                givenby:saPlatform,
                url:saurl,
            }).then((t1)=>{
                
                Axios.post("http://34.67.187.5:5000/api/selectFromSA",{
                    userid:userid,
                }).then((t)=>{
                    setshowStudAcheivements(t.data)
                    const tag=document.querySelector('#addStudentAccomplishments');
                    tag.style.display='none';
                    tag.style.display='block';
                })
            })
            settextpopupmsg('Accomplishment Added')
            setpopupmsg(true)
            setTimeout(() => {setpopupmsg(false)}, 2000);
        }
        else{
            console.log("Faculty....")
            Axios.post("http://34.67.187.5:5000/api/insertintogsprofile",{
                id:userid,
                title:saCourse,
                year:saPlatform,
                authors:saurl,
            }).then((t1)=>{
                
                console.log(t1.data)
                profilePagination(paginationpageno)
                profile('Profile')
                Axios.post("http://34.67.187.5:5000/api/insertnotification",{
                    userid:userid,
                    gsarticleid:t1.data,
                })
            })
            settextpopupmsg('Article Added')
            setpopupmsg(true)
            setTimeout(() => {setpopupmsg(false)}, 2000);
            
        }
        
    }
    const paginationpagechange=(event,value)=>{
        setpaginationpageno(value)
        profilePagination(value)
    }
    function profilePagination(val){
        console.log(val)
        var arr=[]
        Axios.post("http://34.67.187.5:5000/api/generatearticlesinprofile",{
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
        Axios.post("http://34.67.187.5:5000/api/deletegsarticles",{
            id:id
        }).then((t)=>{
            console.log(t)
            if(t.data=="Success"){
                settextpopupmsg('Article Deleted')
                setpopupmsg(true)
                setTimeout(() => {setpopupmsg(false)}, 2000);
                
                profilePagination(paginationpageno)
                profile('Profile')
            }
            else{
                alert("Delete failed")
            }
        })
        
    }

    function update(){
        console.log(fname)
        Axios.post('http://34.67.187.5:5000/api/update',{
        firstname:fname,
        lastname:lname,
        email:email,
        phno:phno,
        summary:summary,
        }).then(()=>{
            settextpopupmsg('Update Successful')
            setpopupmsg(true)
            setTimeout(() => {setpopupmsg(false)}, 2000);
            
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
        Axios.post('http://34.67.187.5:5000/api/delete',{
            email:uname,
        }).then(()=>{
            GotoLogin();
        })
    }

    function insertHistory(relation) {
        Axios.post('http://34.67.187.5:5000/api/getDetails', {
            email: uname
        }).then((result) => {
            console.log(result.data[0]['id'], relation.data[0]['gs_id'])
            Axios.post('http://34.67.187.5:5000/api/insertBrowserHistory', {
                id: result.data[0]['id'],
                gs_id: relation.data[0]['gs_id'],

            }).then((res) => {
                console.log(res.data);
                console.log("line 297: ", facultyHistory);
            })
        })
    }
    
    function displayHistory(NameClass) {

        if (NameClass !== "displayHistory") {
            historyArray.push(NameClass);
        }
        const history = document.querySelector('.displayHistory');
        const name = document.querySelector('.' + NameClass);
        name.style.display = 'none';
        history.style.display = 'block';
        

        Axios.post("http://34.67.187.5:5000/api/getDetails", {
            email: uname
        }).then((result) => {
            //console.log("result = ",result.data)
            Axios.post("http://34.67.187.5:5000/api/history", {
                id: result.data[0]['id'],
            }).then((res) => {
                //console.log("res = ",res.data)
                setFacultyHistory([res.data]);
            })
        })
    }

    function DeleteHistoryItem(gs_id){
        Axios.post('http://34.67.187.5:5000/api/getDetails',{
            email: uname
        }).then((result)=>{
            console.log(result.data)
            Axios.post('http://34.67.187.5:5000/api/deleteHistoryItem',{
                id: result.data['0']['id'],
                gsid: gs_id
            }).then((res)=>{
                console.log(res.data)
                if (res.data === "Successfully deleted item"){
                    displayHistory('displayHistory')
                }
            })
        })
    }

    function ProfileGenerate(from){
        historyArray.push(from)
        if(profilegenerate!=''){
            Axios.post('http://34.67.187.5:5000/api/generate',{
              subject_name: profilegenerate
            }).then((result)=>{
                setFacultyProfileData(result.data)
                insertHistory(result);
                
            })
            const Generation=document.querySelector('.Generation')
            const fromclass=document.querySelector('.'+from)
            Generation.style.display='block'
            fromclass.style.display='none'
        }
    }
    function ViewCompleteArticle(gsid,NameClass){
        const tag=document.querySelector('.articles')
        const tag1=document.querySelector('.journal')
        tag.style.display='none';
        tag1.style.display='none';
        const IndividualFacultyProfile=document.querySelector('.IndividualFacultyProfile')
        const nc=document.querySelector('.'+NameClass)
        nc.style.display='none'
        IndividualFacultyProfile.style.display='block'
        historyArray.push(NameClass)
        setdocumentname('PB-Profile')
        console.log(gsid)
        Axios.post("http://34.67.187.5:5000/api/generateallarticleOfAFaculty",{
            gsid:gsid
        }).then((res)=>{
            setIndividualProfile(res.data['1'])
            setdomain(res.data['0'])
            console.log(domains)
            setarticles(res.data['2'])
            console.log(articles)
        })
        Axios.post("http://34.67.187.5:5000/api/idgsprofile",{
            gsid:gsid,
        }).then((t)=>{
            Axios.post("http://34.67.187.5:5000/api/generatepublicationfromamrpub",{
                userid:t.data['0']['id'],
            }).then((z)=>{
                console.log(z)
                console.log(z.data)
                setprofilePulication(z.data)
            })
        })
        
        Axios.post("http://34.67.187.5:5000/api/getDetails",{
                email:uname,
            }).then((t)=>{
                
                Axios.post("http://34.67.187.5:5000/api/getDetailsfromgsprofile",{
                    gsid:gsid,
                    }).then((t1)=>{
                        Axios.post("http://34.67.187.5:5000/api/getDetailsfromconnectrequest",{
                            fromid:t.data[0]['id'],
                            toid:t1.data[0]['id'],
                            }).then((t2)=>{
                                if(t2.data.length>0)
                                {
                                    if(t2.data[0]['status']==='W'){
                                    setconnection_status('Awaiting Reply')
                                    }
                                    else if(t2.data[0]['status']==='A'){
                                    setconnection_status('Accepted')
                                    }
                                    else{
                                        setconnection_status('Connect')
                                    }
                                }
                                else
                                {
                                    setconnection_status('Connect')
                                }
                            })
                    })
            })
    }
    
    

    function AddToFavorites(gs_id){
        Axios.post("http://34.67.187.5:5000/api/getDetails",{
            email:uname
        }).then((result)=>{
            console.log(result)
            Axios.post("http://34.67.187.5:5000/api/insertFavorites",{
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
        setdocumentname('PB-Favorites')
        Axios.post("http://34.67.187.5:5000/api/getDetails",{
            email:uname
        }).then((result)=>{
            Axios.post("http://34.67.187.5:5000/api/favorites",{
                id:result.data['0']['id'],
            }).then((res)=>{
                console.log(res.data)
                setFavoriteFacultyProfile(res.data)
                console.log(FavoriteFacultyProfile)
            })
        })
    }
    function RemoveFromFavorites(gs_id){
        Axios.post("http://34.67.187.5:5000/api/getDetails",{
            email:uname
        }).then((result)=>{
            console.log(result)
            Axios.post("http://34.67.187.5:5000/api/deleteFavorites",{
                id:result.data['0']['id'],
                gsid:gs_id,
            }).then((res)=>{
                console.log(res.data)
                settextpopupmsg('Removed From favorites')
                setpopupmsg(true)
                setTimeout(() => {setpopupmsg(false)}, 2000);
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
        Axios.post("http://34.67.187.5:5000/api/updatereview",{
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
            Axios.post("http://34.67.187.5:5000/api/submit_report",{
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

    function connectwith(togsid){
        if(connection_status==='Connect'){
            Axios.post("http://34.67.187.5:5000/api/getDetails",{
                email:uname,
            }).then((t)=>{
                Axios.post("http://34.67.187.5:5000/api/getDetailsfromgsprofile",{
                    gsid:togsid,
                    }).then((t1)=>{
                        Axios.post("http://34.67.187.5:5000/api/connectrequest",{
                            fromid:t.data[0]['id'],
                            toid:t1.data[0]['id'],
                            }).then((t2)=>{
                                if(t2.data=='success'){
                                alert("inserted")
                                setconnection_status('Awaiting Reply')}
                            })
                    })
            })
        }
    }

    function shownetwork(){
        const shnet=document.querySelector('.ShowNetwork')
        shnet.style.display='block'
        const home=document.querySelector('.home')
        home.style.display='none'
        historyArray.push('home')
        setdocumentname('PB-ProfileNetwork')
        Axios.post("http://34.67.187.5:5000/api/getDetails",{
                email:uname,
            }).then((t)=>{
                if(t.data[0]['Faculty']==='N'){
                    const onlyForstudent=document.querySelector('#onlyForstudent')
                    onlyForstudent.style.display='block'
                    Axios.post("http://34.67.187.5:5000/api/getnetworkdetailsfromrequest",{
                    fromid:t.data[0]['id'],
                    status:'W',
                    }).then((t1)=>{
                        var arr=[]
                        for(var i=0;i<t1.data.length;i++){
                            arr.push(t1.data[i]['to_id'])
                        }
                        
                            Axios.post("http://34.67.187.5:5000/api/selectfromgsprofilefornetworkdetails",{
                            id:arr,
                            }).then((t2)=>{
                                const wrt=document.querySelector('#Waiting_requests_there');
                                const rt=document.querySelector('#Waiting_requests')
                                const frt=document.querySelector('#Waiting_requests_there_faculty')
                                frt.style.display='none'
                                if(t2.data.length>0){
                                    setwaitingrequests(t2.data)
                                    wrt.style.display='block'
                                    rt.style.display='none'
                                    
                                }
                                else{
                                    wrt.style.display='none'
                                    rt.style.display='block'
                                }
                            })
                        
                    })
                    Axios.post("http://34.67.187.5:5000/api/getnetworkdetailsfromrequest",{
                fromid:t.data[0]['id'],
                status:'A',
                }).then((t1)=>{
                    var arr=[]
                    for(var i=0;i<t1.data.length;i++){
                        arr.push(t1.data[i]['to_id'])
                    }
                    Axios.post("http://34.67.187.5:5000/api/selectfromgsprofilefornetworkdetails",{
                    id:arr,
                    }).then((t2)=>{
                        const art=document.querySelector('#Accepted_requests_there');
                        const rt=document.querySelector('#Accepted_requests')
                        if(t2.data.length>0){
                            setacceptedrequests(t2.data)
                            art.style.display='block'
                            rt.style.display='none'
                        }
                        else{
                            art.style.display='none'
                            rt.style.display='block'
                        }
                    })
                })

                Axios.post("http://34.67.187.5:5000/api/getnetworkdetailsfromrequest",{
                fromid:t.data[0]['id'],
                status:'D',
                }).then((t1)=>{
                    var arr=[]
                    for(var i=0;i<t1.data.length;i++){
                        arr.push(t1.data[i]['to_id'])
                    }
                    Axios.post("http://34.67.187.5:5000/api/selectfromgsprofilefornetworkdetails",{
                    id:arr,
                    }).then((t2)=>{
                        const drt=document.querySelector('#Denied_requests_there');
                        const rt=document.querySelector('#Denied_requests')
                        if(t2.data.length>0){
                            setdeniedrequests(t2.data)
                            drt.style.display='block'
                            rt.style.display='none'
                        }
                        else{
                            drt.style.display='none'
                            rt.style.display='block'
                        }
                    })
                })
            
                }
                else{
                    const onlyForstudent=document.querySelector('#onlyForstudent')
                    onlyForstudent.style.display='none'
                    Axios.post("http://34.67.187.5:5000/api/getnetworkdetailstorequest",{
                    toid:t.data[0]['id'],
                    status:'W',
                    }).then((t1)=>{
                        var arr=[]
                        for(var i=0;i<t1.data.length;i++){
                            arr.push(t1.data[i]['from_id'])
                        }
                            Axios.post("http://34.67.187.5:5000/api/selectfromuserfornetworkdetails",{
                            id:arr,
                            }).then((t2)=>{
                                //console.log(t2.data)
                                const wrt=document.querySelector('#Waiting_requests_there');
                                const rt=document.querySelector('#Waiting_requests')
                                const frt=document.querySelector('#Waiting_requests_there_faculty')
                                wrt.style.display='none'
                                if(t2.data.length>0){
                                    setwaitingrequests(t2.data)
                                    frt.style.display='block'
                                    rt.style.display='none'
                                }
                                else{
                                    frt.style.display='none'
                                    rt.style.display='block'
                                }
                            })
                        
                    })

                    Axios.post("http://34.67.187.5:5000/api/getnetworkdetailstorequest",{
                    toid:t.data[0]['id'],
                    status:'A',
                    }).then((t1)=>{
                        var arr=[]
                        for(var i=0;i<t1.data.length;i++){
                            arr.push(t1.data[i]['from_id'])
                        }
                        
                            Axios.post("http://34.67.187.5:5000/api/selectfromuserfornetworkdetails",{
                            id:arr,
                            }).then((t2)=>{
                                //console.log(t2.data)
                                const art=document.querySelector('#Accepted_requests_there');
                                const rt=document.querySelector('#Accepted_requests')
                                const artf=document.querySelector('#Accepted_requests_there_faculty')
                                if(t2.data.length>0){
                                    setacceptedrequests(t2.data)
                                    artf.style.display='block'
                                    art.style.display='none'
                                    rt.style.display='none'
                                }
                                else{
                                    artf.style.display='none'
                                    art.style.display='none'
                                    rt.style.display='block'
                                }
                            })
                    })

                    
                }
            })
    }
    function studentProfile(usid,name){
        
        Axios.post("http://34.67.187.5:5000/api/selectFromSA",{
            userid:usid,
        }).then((t)=>{
            console.log(t)
            setfullname(name)
            setstudentCertificate(t.data)
            setshowprofileinnetworks(true)
        })
    }
    function changeRequeststatus(type,fromid){
        Axios.post("http://34.67.187.5:5000/api/getDetails",{
            email:uname
        }).then((t)=>{
            if(type=='Ignore'){
                Axios.post("http://34.67.187.5:5000/api/updateRequestTable",{
                    toid:t.data[0]['id'],
                    fromid:fromid,
                    status:'D',
                }).then((t1)=>{
                    alert('Updated')
                })
            }
            else{
                Axios.post("http://34.67.187.5:5000/api/updateRequestTable",{
                    toid:t.data[0]['id'],
                    fromid:fromid,
                    status:'A',
                }).then((t2)=>{
                    alert('Updated')
                })
            }
        })
        
    }
    function showarticles_jounalinIndFacprofile(from){
        const tag=document.querySelector('.articles')
        const tag1=document.querySelector('.journal')
        if(from==='articles'){
            tag.style.display='block';
            tag1.style.display='none';
        }
        else{
            tag1.style.display='block';
            tag.style.display='none';
        }
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
                        <Nav.Link href="" id="HomeLink"><FaHome size='1.5em'/> HOME</Nav.Link>
                        <Nav.Link href="" id="HomeLink" onClick={shownetwork}><IoGlobe size='1.5em'/> NETWORKS</Nav.Link>
                        <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={()=>profile("home")} >Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={()=>DisplayFavorites("home")}>Favorites</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => displayHistory("home")}>History</NavDropdown.Item>
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
                <div id="AppRating">
                    <center>
                        <h3 id="featureHeader">Users <span>rating</span></h3>
                        <p>
                            <ImHappy2 size='7vh'/>{starrat[sessionStorage.getItem('rating')]}
                        </p>
                    </center>
                </div>
                
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
            <div className='ShowNetwork'>
                <div>
                    <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                        <Navbar.Brand><ImProfile size='2em'/> Profile_Builder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse className="justify-content-end">
                        <Nav.Link id="HomeLink" onClick={()=>goBack("ShowNetwork")}><IoReturnUpBackSharp size="1.5em"/>  GO BACK</Nav.Link>
                        <Nav.Link onClick={()=>GotoHome("ShowNetwork")} id="HomeLink"><FaHome size="1.5em"/>  HOME</Nav.Link>
                            <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={()=>DisplayFavorites("ShowNetwork")}>Favorites</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={GotoLogin}>Sign Out</NavDropdown.Item>
                            </NavDropdown>  
                        </Navbar.Collapse>
                    </Navbar>
                    <div className='Network_Details'>
                        <center><h2>CONNECTED TO</h2></center>
                        <div id='Accepted_requests_there'>
                            {acceptedrequests.map((index)=>(
                                <li style={{color:'orange'}}>
                                    <p style={{fontSize:'large',fontWeight:'bolder',color:'whitesmoke'}}>{index.prf_name}</p>
                                    <p style={{fontSize:'medium',fontWeight:'light',color:'whitesmoke'}}>{index.prf_des}</p>
                                </li>
                            ))}
                        </div>
                        <div id='Accepted_requests'>
                            <center><p style={{fontSize:'x-large',fontWeight:'bolder',color:'whitesmoke'}}><FaExclamation size="1em" id="errorDivIcon"/> NO CONNECTIONS</p></center>
                        </div>
                        <div id='Accepted_requests_there_faculty'>
                            {acceptedrequests.map((index)=>(
                                <div>
                                    <li style={{color:'orange'}}>
                                        <Row>
                                            <Col md={6}>
                                                <a id="networkA" onClick={()=>studentProfile(index.id,index.firstname+' '+index.lastname)} href='#' style={{fontSize:'large',fontWeight:'bolder',color:'#b2d0ec'}} style={{cursor:'pointer'}}>{index.firstname} {index.lastname}</a>
                                            </Col>
                                        </Row>
                                    </li>
                                </div>
                            ))}
                        </div>
                        <hr className='mt-5'/>
                        <center><h2>AWAITING REPLY FROM</h2></center>
                        <div id='Waiting_requests_there'>
                            {waitingrequests.map((index)=>(
                                <li style={{color:'orange'}}>
                                    <p style={{fontSize:'large',fontWeight:'bolder',color:'whitesmoke'}}>{index.prf_name}</p>
                                    <p style={{fontSize:'medium',fontWeight:'light',color:'whitesmoke'}}>{index.prf_des}</p>
                                </li>
                            ))}
                        </div>
                        <div id='Waiting_requests_there_faculty'>
                            {waitingrequests.map((index)=>(
                                <div>
                                    <li style={{color:'orange'}}>
                                        <Row>
                                            <Col md={6}>
                                                <a id='networkA' onClick={()=>studentProfile(index.id,index.firstname+' '+index.lastname)} href='#' style={{fontSize:'large',fontWeight:'bolder',color:'#b2d0ec'}}>{index.firstname} {index.lastname}</a>
                                            </Col>
                                            <Col md={6}>
                                                <Button type='submit' variant='outline-primary' onClick={()=>changeRequeststatus('Ignore',index.id)} inline>
                                                    Ignore
                                                </Button>
                                                <Button type='submit' variant='outline-primary' onClick={()=>changeRequeststatus('Accept',index.id)} style={{marginLeft:'10px'}}>
                                                    Accept
                                                </Button>
                                            </Col>
                                        </Row>
                                    </li>
                                </div>
                            ))}
                        </div>
                        
                        <div id='Waiting_requests'>
                            <center><p style={{fontSize:'x-large',fontWeight:'bolder',color:'whitesmoke'}}><FaExclamation size="1em" id="errorDivIcon"/> NO AWAITING REQUESTS</p></center>
                        </div>
                        <hr className='mt-5'/>
                        
                        <div id="onlyForstudent">
                            <center><h2>DENIED REQUESTS</h2></center>
                            <div id='Denied_requests_there'>
                                {deniedrequests.map((index)=>(
                                    <li style={{color:'orange'}}>
                                        <p style={{fontSize:'large',fontWeight:'bolder',color:'whitesmoke'}}>{index.prf_name}</p>
                                        <p style={{fontSize:'medium',fontWeight:'light',color:'whitesmoke'}}>{index.prf_des}</p>
                                    </li>
                                ))}
                            </div>
                            <div id='Denied_requests'>
                                <center><p style={{fontSize:'x-large',fontWeight:'bolder',color:'whitesmoke'}}><FaExclamation size="1em" id="errorDivIcon"/> NO REQUESTS DENIED</p></center>
                            </div>
                        </div>
                        <hr className='mt-5'/>
                    </div>
                </div>

            </div>
            <Modal show={showprofileinnetworks} onHide={handleCloseprofileinnetworks} animation={true}>
                <Modal.Header closeButton>
                
                </Modal.Header>
                <Modal.Body>
                <center><h3 style={{textDecoration:'underline'}}text>Profile</h3></center>
                    <Form>
                                <center><Form.Group as={Row} controlId="formPlaintextEmail">
                                    <Form.Label column sm="6" style={{color:'#e3a026',fontSize:'medium',fontWeight:'bold'}}>
                                        Name
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control plaintext readOnly value={fullname} />
                                    </Col>
                                </Form.Group></center>
                                <center><h3 style={{textDecoration:'underline'}}>Acheivements</h3></center>
                                {studentCertificate.map((index) => (
                                    <center><Form>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="6" style={{color:'#e3a026',fontSize:'medium',fontWeight:'bold'}}>
                                                Course
                                            </Form.Label>
                                            <Col sm="6">
                                                <Form.Control plaintext readOnly value={index.course} />
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="6" style={{color:'#e3a026',fontSize:'medium',fontWeight:'bold'}}>
                                                CertifiedBy
                                            </Form.Label>
                                            <Col sm="6">
                                                <Form.Control plaintext readOnly value={index.platform}/>
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="formPlaintextEmail">
                                            <Form.Label column sm="12" style={{color:'#e3a026',fontSize:'medium',fontWeight:'bold'}}>
                                                URL
                                            </Form.Label>
                                            <Col sm="12">
                                                <a href={index.certificate_link}>{index.certificate_link}</a>
                                            </Col>
                                        </Form.Group>
                                        <hr></hr>
                                    </Form></center>
                                    
                                ))}

                            </Form>
                </Modal.Body>
                
            </Modal>

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
                    <div id="addStudentAccomplishments">
                        <div id="getcertificateofstudentinprofile">
                            <center><h3><span style={{color:'black',fontWeight:'bolder'}}>ADD</span> <span style={{color:'#e3a026',fontWeight:'bolder'}}>ACCOMPLISMENTS</span></h3></center>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label style={{fontStyle:'italic',fontWeight:'bold'}}>Course</Form.Label>
                                    <Form.Control type="text" onChange={(e)=>setsaCourse(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontStyle:'italic',fontWeight:'bold'}}>GivenBy</Form.Label>
                                    <Form.Control type="text" onChange={(e)=>setsaPlatform(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontStyle:'italic',fontWeight:'bold'}}>Certificate Google drive URL</Form.Label>
                                    <Form.Control type="text" onChange={(e)=>setsaUrl(e.target.value)}/>
                                </Form.Group>
                                <Row className='justify-content-end'>
                                    <Button variant="primary" type="reset" onClick={()=>addAccomplishments_articles('student')}>ADD</Button>
                                </Row>
                            </Form>
                        </div>
                        <hr></hr>
                        <div id="showstudentAcheivements">
                            <center><h3 style={{color:'black',fontWeight:'bolder'}}>ACHEIVEMENTS</h3></center>
                            {showStudAcheivements.map((index)=>(
                                <Form>
                                    <Row>
                                            <Col xs={2}>
                                            </Col>
                                            <Col xs={10}>
                                                <Row>
                                                    <Col xs={7}>
                                                        <Form.Group as={Row} style={{marginBottom:'0px'}}>
                                                            <Form.Label column sm="3" style={{color:'#e3a026',fontSize:'medium',fontWeight:'bold'}}>Name</Form.Label>
                                                            <Col sm={8}>
                                                                <Form.Control plaintext readOnly value={index.course} />
                                                            </Col>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={5}>
                                                        <Button variant='primary' onClick={()=>delete_fromstudentsAccomplisments(index.user_id,index.course,index.platform,index.certificate_link)}><AiFillCloseSquare size='1em'/> Remove</Button>
                                                    </Col>
                                                </Row>
                                                <Form.Group as={Row} style={{marginBottom:'0px'}}>
                                                    <Form.Label column sm="3" style={{color:'#e3a026',fontSize:'medium',fontWeight:'bold'}}>Acknowledged By</Form.Label>
                                                    <Col sm={8}>
                                                        <Form.Control plaintext readOnly value={index.platform} />
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group>
                                                    <a href={index.certificate_link}>{index.certificate_link}</a>
                                                </Form.Group>
                                            </Col>
                                    </Row>
                                    
                                </Form>
                                
                            ))}
                        </div>

                    </div>
                    <div id="GoogleSDetailsArticles">
                        <div id="getcertificateofstudentinprofile">
                            <center><h3><span style={{color:'black',fontWeight:'bolder'}}>ADD </span> <span style={{color:'#e3a026',fontWeight:'bolder'}}>ARTICLES</span></h3></center>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label style={{fontStyle:'italic',fontWeight:'bold'}}>Title</Form.Label>
                                    <Form.Control type="text" onChange={(e)=>setsaCourse(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontStyle:'italic',fontWeight:'bold'}}>Year</Form.Label>
                                    <Form.Control type="text" onChange={(e)=>setsaPlatform(e.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label style={{fontStyle:'italic',fontWeight:'bold'}}>Co-Authors</Form.Label>
                                    <Form.Control type="text" onChange={(e)=>setsaUrl(e.target.value)}/>
                                </Form.Group>
                                <Row className='justify-content-end'>
                                    <Button variant="primary" type="reset" onClick={()=>addAccomplishments_articles('faculty')}>ADD</Button>
                                </Row>
                            </Form>
                        </div>
                        <center><h1>Articles</h1></center>
                            {profilearticles.map((index) => (
                                <Typography id="articleRow">
                                    <div id="articlerowclosebutton" className="justify-content-end">
                                        <Button variant="outline-danger" type="submit" onClick={()=>deletegsarticle(index.gsarticleid)}><AiFillCloseSquare size='1.5em'/> Remove</Button>
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
            <Modal show={popupmsg} onHide={handleclosepopupmsg} animation={true}>
                <div className="d-flex justify-content-center">
                    
                        <Modal.Title><FcInfo size='5vh'/></Modal.Title>
                </div>
                <div className="d-flex justify-content-center">
                    <Modal.Body> <center><span style={{fontSize:'3vh'}}>{textpopupmsg}</span></center></Modal.Body>
                </div>
            </Modal>
            <Modal show={notificationShow} onHide={handleClosernotification}  animation={true} centered>
                <Modal.Header closeButton>
                <Modal.Title><IoMdNotifications size='5vh'/> NOTIFICATION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {localStorage.getItem('notificationProfile').map((index)=>( */}
                    <div>
                        <p style={{fontSize:'3vh',fontDecoration:'underline'}}>Following Faculties Have Some Article updates</p>
                        <li style={{fontSize:'3vh'}}> {localStorage.getItem('notificationProfile')}</li>
                    </div>
                    {/* ))} */}
                </Modal.Body>
                <Modal.Footer>
                    
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
                                    <Button variant="outline-dark" onClick={()=>connectwith(index.gs_id)} id="popup" style={{marginRight:'10px'}}><ImConnection/> {connection_status}</Button>
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
                                            <a id="ListOfFacultiesParaLink" style={{cursor:'pointer'}}><AiOutlineMail size="1.5em" color="blue"/>  <span>{index.email}</span></a>
                                        </Row>
                                        <Row>
                                            <a id="ListOfFacultiesParaLink" style={{cursor:'pointer'}}><AiOutlinePhone size="1.5em" color="blue"/>  <span>{index.phonenumber}</span></a>
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
                <div id="articles_buttons">
                    <Row>
                        <Col md={7}>
                            <p style={{color:'whitesmoke',fontSize:'2.75vh'}}>CLICK ME TO CHECKOUT ARTICLES AND JOURNALS <span style={{color:'yellow'}}><AiOutlineArrowRight size='1.5em'/></span></p>
                        </Col>
                        <Col md={5}>
                            <Button variant="success" onClick={()=>showarticles_jounalinIndFacprofile('articles')} style={{marginRight:'20px',marginLeft:'20px'}}>Articles</Button>
                            <Button variant="success" onClick={()=>showarticles_jounalinIndFacprofile('journal')}>Journals</Button> 
                        </Col>
                    </Row>
                    
                </div>
                <div className="articles">
                    <div>
                        <center><p style={{color:'whitesmoke',fontSize:'7vh',fontStyle:'italic',textDecoration:'underline'}}>ARTICLES</p></center>
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
                <div className="journal">
                    <div>
                    <center><p style={{color:'whitesmoke',fontSize:'7vh',fontStyle:'italic',textDecoration:'underline'}}>PUBLICATIONS</p></center>
                        {profilePublication.length?
                            
                            // <div id="articleRow">
                            //     <p id="ListOfFacultiesPara">Title: <span>{index.title}</span></p>
                            //     <p id="ListOfFacultiesPara">Year: <span>{index.year}</span></p>
                            // </div>
                            <table className="table table-light table-striped table-bordered-dark">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Year</th>
                                        <th scope="col">Title</th>
                                    </tr>
                                </thead> 
                                <tbody>
                                    {profilePublication.map((index) => (
                                        <tr>
                                            <td>{index.year}</td>
                                            <td>{index.title}</td>
                                        </tr>
                                    ))}   
                                </tbody>
                            </table>  
                        
                        :
                        <div>
                            <center><p style={{marginTop:'20px',fontSize:'x-large',fontWeight:'bolder',color:'#e3a026'}}><FaExclamation size="1em" id="errorDivIcon"/> NO PUBLICATIONS FROM FACULTY WEBSITE</p></center>
                        </div>}
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
                        {FavoriteFacultyProfile.length?FavoriteFacultyProfile.map((index) => (
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
                                        <p id="ListOfFacultiesPara">Articles: <span><a onClick={()=>ViewCompleteArticle(index.gs_id,'displayFavorites')} style={{cursor:'pointer'}}>View Articles</a></span></p>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            
                        )):
                        <div>
                            <center><p><GiThink size='20vh' color='white' style={{padinng:'10px',borderRadius:'10px'}}/></p></center>
                            <center><p style={{marginTop:'20px',fontSize:'8vh',fontWeight:'bolder',color:'whitesmoke'}}><FaExclamation size="1em" id="errorDivIcon"/> You have <span style={{color:'#e3a026'}}>NO FAVORITES</span></p></center>
                        </div>
                        }
                        
                    </div>
                </div>

            </div>

            <div className="displayHistory">
                <div>
                    <Navbar sticky="top" bg='dark' expand='lg' variant='dark' >
                        <Navbar.Brand><ImProfile size='2em' /> Profile_Builder</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav.Link id="HomeLink" onClick={() => goBack("displayHistory")}><IoReturnUpBackSharp size="1.5em" />  GO BACK</Nav.Link>
                            <Nav.Link onClick={() => GotoHome("displayHistory")} id="HomeLink"><FaHome size="1.5em" />  HOME</Nav.Link>
                            <NavDropdown title={<Navbar.Text>Signed in as: {username}</Navbar.Text>} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => profile("displayHistory")}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={GotoLogin}>Sign Out</NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className='FacultyDetails'>
                    <center><h2>ALL PROFILES YOU'VE SEARCHED</h2></center>
                    <br></br>
                    <div className="ListOfFaculties">
                        {facultyHistory.map((index) => (
                            <div>
                                {index.slice(0).reverse().map((i) => {
                                    return (
                                        <div>
                                            <Row className="justify-content-end" id="IndividualFacultyProfileButton">
                                                <Button variant="outline-light" onClick={() => DeleteHistoryItem(i.gs_id)} ><AiFillDelete /> Delete</Button>
                                            </Row>
                                            <Row id="ListOfFacultiesRow">
                                                <Col md={4}>
                                                    <center> <img src={i.photo_url} width="128px" height="128px" id="ListOfFacultiesRowImg" /></center>
                                                    <br></br>
                                                </Col>
                                                <Col md={7}>
                                                    <Row>
                                                        <p id="ListOfFacultiesPara">Name: <span>{i.prf_name}</span></p>
                                                    </Row>
                                                    <Row>
                                                        <p id="ListOfFacultiesPara">Place of work: <span>{i.prf_des}</span></p>
                                                    </Row>
                                                    <Row>
                                                        <p id="ListOfFacultiesPara">GS ID: <span>{i.gs_id}</span></p>
                                                    </Row>
                                                    <Row>
                                                        <p id="ListOfFacultiesPara">Articles: <span><a onClick={() => ViewCompleteArticle(i.gs_id, 'displayHistory')} style={{cursor:'pointer'}}>View Articles</a></span></p>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
)}
export default Homepage;
