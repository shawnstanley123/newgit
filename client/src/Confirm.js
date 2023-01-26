import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './App.css'
export default function Confirm() {
    const [list,setList]=useState([])
    const [aprice,setAprice]=useState([])
    const {id}=useParams()
    const navigate= useNavigate()
    useEffect(()=>{
Axios.get(`http://localhost:2000/cn/${id}`)
.then(res=>setList(res.data))

Axios.post("http://localhost:2000/sum",{cid:id})
.then(res=>{
   
  setAprice(res.data)
  
  
})
    },[])

const redirect = () =>{
    Axios.post(`http://localhost:2000/del`,{
id:id,

    })
    alert("booked successfully")
    navigate("/login")
}
  return (
    <div>
        <table border="1" className='table'>
            <thead >
              
                <th>Ftype</th>
                <th>Price</th>
                <th>Rname</th>
            </thead>
            <tbody>
               {list.map((item)=>(<tr>
                   
                    <td>{item.Ftype}</td>
                    <td>{item.Price}</td>
                    <td>{item.Rname}</td>
                </tr>))
                }
            </tbody>
        </table>
        <div>Total Price:{aprice.map((item)=>(<div>{item.sum}</div>))}</div>
        <button style={{border:"none",width:"100px",height:"20px",background:"violet",justifyContent:"center"}} onClick={redirect}>Checkout</button>
    </div>
  )
}
