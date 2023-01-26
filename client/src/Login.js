import React,{useState} from 'react'
import './App.css'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function Login() {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [form,setForm]=useState({
        username:"",
        password:""
    })
    const navigate=useNavigate()
    console.log(username)
    const loghandler = () =>{
        setForm({username:username,password:password})
console.log(form)
        Axios.post("http://localhost:2000/api/login",{
        username:username,
        password:password
          }).then((res=>{
            if(res.data){
                alert("success")
                const id=res.data.id
navigate(`/logged/${id}`)
            }
            
            
            
          }))
          .catch(err=>alert("invalid "))
    }
  return (
    <div className='login'>
        <label htmlFor='linput' name="username" >Username</label>
        <input type="text" className='linput'onChange={(e)=>setUsername(e.target.value)}/>
        <label htmlFor='lpassword'>Password</label>
        <input type="text" className='lpassword' onChange={(e)=>setPassword(e.target.value)}/>
        <button className='lbutton' onClick={loghandler}>Login</button>
    </div>
    
  )
}
