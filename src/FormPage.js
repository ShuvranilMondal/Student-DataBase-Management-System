import React, { useState ,useEffect} from 'react'
import './style/file.css'
import img1 from './img/unnamed.png'
import {Link , Route , Routes} from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
import TableData from './Tablefile'

function FormPage(){
    return(
        <>
            <Routes>
                <Route path='/' element={<InputPage/>} ></Route>
                <Route path='/uData' element={<DataPage/>}></Route>
            </Routes>
        </>
    )
}
function InputPage(){
    let [uName , setuName] = useState('')
    let [uEmail , setuEmail] = useState('')
    let [uPhone , setuPhone] = useState('')
    let [uAdd , setuAdd] = useState('')
    let [popMsg , setpop] = useState(false)
    function UploadUdata(){
        let item = {uName , uEmail , uPhone , uAdd}
        fetch('http://localhost:3000/posts',{
            method:'POST',
            headers :{
                'Accept':'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(item)
        }).then((re)=>{
            re.json().then((req)=>{
                console.log(req)
            })
        })
    }
    function GetUdata(q){
        q.preventDefault()
        console.log(uName,uEmail,uAdd)
        UploadUdata()
        setuName('')
        setuEmail('')
        setuPhone('')
        setuAdd('')
        setpop(true)
    }
    return(
        <div className='inputBG'>
            {
                popMsg?
                <div className='Black'>
                    <div className='popup'>
                        <i className="far fa-check-circle"></i>
                        <h1 className='pophed'>Upload data successfully!</h1>
                        <button onClick={()=>setpop(false)}>OK</button>
                    </div>
                </div>:null
            }
            
            <div className='container'>
                <div className='navbar'>
                <i className="fas fa-database"></i>
                <div className='nav-con'>
                    {/* <Link className='homeBtn' to='/'>HOME</Link> */}
                    <Link className='homeBtn' to='/uData'>DATA</Link>
                </div>
                </div>
            </div>
            <div className='showCase'>
                <div className='title'>
                    <h1 className={'nil'}>Student DataBase Management System</h1>
                    <div className='imgFile'>
                        <img src={img1} alt=""/>
                    </div>
                </div>
                <div className='formWindow'>
                    <h1 className={'nil2'}>Submit Your Information</h1>
                    <form onSubmit={GetUdata}>
                        <input type='text' value={uName} onChange={(e)=>setuName(e.target.value)} placeholder='Enter Full Name' required/>
                        <input type='text' value={uEmail} onChange={(e)=>setuEmail(e.target.value)} placeholder='Enter Email' required/>
                        <input type='text' value={uPhone} onChange={(e)=>setuPhone(e.target.value)} placeholder='Enter Phone No' required/>
                        <textarea value={uAdd} onChange={(e)=>setuAdd(e.target.value)} placeholder='Enter Address'/>
                        <button id='dataSub' type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
function DataPage(){
    let [uapi , setapi] = useState([])
    let [Popdis , setpopdis] = useState(false)
    let [apino , setapino] = useState('')
    useEffect(()=>{
        GetapiData()
    },[])
    function GetapiData(){
        fetch('http://localhost:3000/posts').then((rt)=>{
            rt.json().then((rtq)=>{
                setapi(rtq)
            })
        })
    }
    function getpopdata(d){
        setpopdis(d)
    }
    function getApidata(k){
        setapino(k)
    }
    function deleteData(){
        fetch(`http://localhost:3000/posts/${apino}`,{
            method:'DELETE'
        }).then((b)=>{
            b.json().then((z)=>{
                GetapiData()
                setpopdis(false)
            })
        })
    }
    return(
        <div className='inputBG'>
            {
                Popdis?
                <div className='Black'>
                    <div className='popup'>
                        <i className="fas fa-exclamation-triangle" style={{color:'red'}}></i>
                        <h1 className='pophed'>Do you want to delete?</h1>
                        <div>
                            <button style={{marginRight:'1rem'}} onClick={deleteData}>YES</button>
                            <button onClick={()=>setpopdis(false)}>NO</button>
                        </div>
                    </div>
                </div>:null
            }
            <div className='container'>
                <div className='navbar'>
                <i className="fas fa-database"></i>
                <div className='nav-con'>
                    <div className='SeBar'><input type='text' placeholder='Search Here...'/><i className="fas fa-search"></i></div>
                    <Link className='homeBtn' to='/'>HOME</Link>
                </div>
                </div>
            </div>
            <TableData apifile={uapi} popData={getpopdata} apiID={getApidata} apiFunction={GetapiData}/>
        </div>
    )
}

export default FormPage