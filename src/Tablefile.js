import {Table} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './style/file.css'
function TableData(Props){
    let [useridno ,setidno] = useState('') 
    let [popfill , setpopfill] = useState(false)
    let [Ename , setEname] = useState('')
    let [Eemail , setEemail] = useState('')
    let [Ephone , setEphone] = useState('')
    let [Eadd , setEadd] = useState('')
    let popmsg = true
    function popsent(idNo){
        Props.popData(popmsg)
        Props.apiID(idNo)
    }
    function upDataUser(ide){
        setpopfill(true)
        setidno(ide)
        setEname(Props.apifile[ide-1].uName)
        setEemail(Props.apifile[ide-1].uEmail)
        setEphone(Props.apifile[ide-1].uPhone)
        setEadd(Props.apifile[ide-1].uAdd)
        

    }
    function EditData(vv){
        vv.preventDefault()
        let uName = Ename
        let uEmail = Eemail
        let uPhone = Ephone
        let uAdd = Eadd
        let item = {uName , uEmail , uPhone , uAdd}
        
        fetch(`http://localhost:3000/posts/${useridno}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(item)
        }).then((v)=>{
            v.json().then((l)=>{
                Props.apiFunction()
                setpopfill(false)
                
            })
        })
    }
    return(
        <>
            {
                popfill?<div className='Black'>
                            <div className='fillpop'>
                                <div className='fillwindow'>
                                    <form onSubmit={EditData}>
                                        <input type='text' placeholder='Enter Full Name' required value={Ename} onChange={(e)=>setEname(e.target.value)}/>
                                        <input type='text' placeholder='Enter Email' required value={Eemail} onChange={(e)=>setEemail(e.target.value)}/>
                                        <input type='text' placeholder='Enter Phone No' required value={Ephone} onChange={(e)=>setEphone(e.target.value)}/>
                                        <textarea  placeholder='Enter Address' value={Eadd} onChange={(e)=>setEadd(e.target.value)}/>
                                        <button id='dataSub' type='submit' style={{marginRight:'1rem'}}>Edit</button>
                                        <button id='dataSub'  onClick={()=>setpopfill(false)}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>:null
            }
            <Table variant='dark' striped>
                <tbody>
                    <tr>
                        <td>S.No</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>PHONE NO</td>
                        <td>ADDRESS</td>
                        <td>DELETE</td>
                        <td>EDIT</td>
                    </tr>

                    {
                        Props.apifile.map((g,i)=>{
                        return <>
                            <tr key={i}>
                                <td className='nil3'>{i+1}</td>
                                <td className='nil3'>{g.uName}</td>
                                <td className='nil3'>{g.uEmail}</td>
                                <td className='nil3'>{g.uPhone}</td>
                                <td className='nil3'>{g.uAdd}</td>
                                <td className='nil3'><button className='tbtn' onClick={()=>popsent(g.id)}><i className="fas fa-trash-alt"></i></button></td>
                                <td className='nil3'><button className='tbtn' onClick={()=>upDataUser(g.id)}><i className="fas fa-edit"></i></button></td>
                            </tr>
                        </>
                    })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default TableData 