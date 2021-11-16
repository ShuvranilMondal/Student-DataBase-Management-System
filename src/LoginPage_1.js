import React, { useState , useEffect } from "react";
import './style/file.css'

function LoginPage(Props) {
    let [loginvisual, setViaual] = useState(true)
    let [UserProData , setProData] = useState([])
    // let [logResult , setLogResult] = useState(false)
    let file = false

    useEffect(()=>{
        fetch('http://localhost:3000/comments').then((ree)=>{
            ree.json().then((respo)=>{
                setProData(respo)
            })
        })
    },[])

    let ParentUserID, ParentCreatPass, ParentConfirmPass


    //Login page sate
    let signLogID, signPass


    function signINuserData() {
        for(let i = 0 ; i < UserProData.length ; i++){
            // console.log(UserProData[i].ParentUserID , UserProData[i].ParentCreatPass)
            if(UserProData[i].ParentUserID=== signLogID && UserProData[i].ParentCreatPass=== signPass){
                file = true
                console.log(file)
                console.log(signLogID,signPass)
                Props.item(file)
                return
            }
        }
        return alert('Invalid Password')
        
    }




    function CreatePageSubmit() {
        // c.preventDefault()
        // console.log(ParentUserID)
        // console.log(ParentConfirmPass)
        // console.log(ParentCreatPass)
        let item = { ParentUserID, ParentCreatPass }
        if (ParentCreatPass === ParentConfirmPass) {
    
            fetch('http://localhost:3000/comments', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item)
            }).then((re) => {
                re.json().then((req) => {
                    console.log(req)
                    alert('Creact Account')
                })
            })
        }else{
            alert('Please Enter Same Password')
        }

    }
    function SigninPage() {
        let [loginID, setLogID] = useState('')
        let [logPass, setLogPass] = useState('')
        signLogID = loginID
        signPass = logPass
        return (
            <div className='signIn'>
                <i className="fas fa-sign-in-alt"></i>
                <input type='text' id='UserName' placeholder='UserID' value={loginID} onChange={(e) => setLogID(e.target.value)} />
                <input type='password' id='Password' placeholder='Password' value={logPass} onChange={(e) => setLogPass(e.target.value)} />
                <button id='logInBTN' onClick={signINuserData}>Log in</button>
                <button id='SignUPBTN' onClick={() => setViaual(false)}>Sign up</button>
            </div>
        )
    }
    function CreactPage() {
        let [createPassword, setCreatePassword] = useState('')
        let [confirmPassword, setConfirmPassword] = useState('')
        let [createID, setCreateid] = useState('')
        ParentUserID = createID
        ParentCreatPass = createPassword
        ParentConfirmPass = confirmPassword
        function clearData(k){
            k.preventDefault()
            CreatePageSubmit()
            setCreateid('')
            setCreatePassword('')
            setConfirmPassword('')
        }
        return (
            <div className='signIn'>
                <form onSubmit={clearData}>
                    <i className="fas fa-user-plus"></i>
                    <input type='text' placeholder='UserID' required value={createID} onChange={(e) => setCreateid(e.target.value)} />
                    <input type='password' placeholder='Creat Password' required value={createPassword} onChange={(k) => setCreatePassword(k.target.value)} />
                    <input type='password' placeholder='Confirm Password' required value={confirmPassword} onChange={(i) => setConfirmPassword(i.target.value)} />
                    <button type='submit' id='logInBTN'>Creat</button>
                    <button id='SignUPBTN' onClick={() => setViaual(true)}>Log in</button>
                </form>
            </div>
        )
    }
    return (
        <div className='mainBox'>
            {
                loginvisual ? <SigninPage /> : <CreactPage />
            }
        </div>
    )
}


export default LoginPage