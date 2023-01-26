import {useEffect, useState} from 'react'
import './App.css';
import Axios from 'axios'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function Loggedpage() {
  const [moviename,setMoviename]=useState("")
  const [rating,setRating] = useState("")
  const [booked,setBooked]= useState(false)
  const [rname,setRname]=useState("")
  const [booklist,setBooklist]= useState([])
  const [rides,setRides]=useState([])
  const [aprice,setAprice]=useState([])
  const [data,setData]=useState([])
  const [count,setCount]=useState([])
  const [funevents,setFunevents]=useState([])
  const [no,setNo]=useState("")
const {id}=useParams()
const navigate=useNavigate();

  useEffect(()=>{
    Axios.get("http://localhost:2000/rides")
    .then(res=>{
      setRides(res.data)
    })
    Axios.get("http://localhost:2000/funevents")
    .then(res=>{
      setFunevents(res.data)
    })
    Axios.post("http://localhost:2000/sum",{cid:id})
    .then(res=>{
       
      setAprice(res.data)
      
      
    })
  // Axios.get("http://localhost:2000/get")
  // .then(res=>{
   
  //   if(res.data.length>0)
  //   setBooked(true)
  //   else setBooked(false)
  // })

  },[])
  const submithandler = (e) =>{
    e.preventDefault()
Axios.post("http://localhost:2000",{
moviename: moviename,
rating:rating
}).then(()=>{
  alert("success")
})
  }
  const bookhandler =(item,ftype) =>{
   

alert("called")
Axios.post("http://localhost:2000/insert",{
  rname:item.Rname||item.Fname,
  eid:item.Eid,
  price:item.Price,
  cid:parseInt(id),
  count:item.count,
ftype:ftype,

}).then((res)=>{
  alert("success")
})
window.location.reload(true)
}
const check = async (item,e,ftype) =>{
    e.preventDefault()
    let number = await Axios.get(`http://localhost:2000/check/${parseInt(id)}/${item.Eid}`)
    .then(res=>{
        let number=res.data.length
        return number
    }
       )
       
       console.log(number)
       if(number < 1){
        bookhandler(item,ftype)
        
       }
       else alert("already booked")
    }
  const cancelhandler = (item) =>{
    window.alert(item.Eid)
  Axios.post(`http://localhost:2000/delete/${id}/${item.Eid}`)
  }
  const both = (item,e,ftype)=>{
    
   check(item,e,ftype)
    
  }
  const confirmb= () =>{
navigate(`/confirm/${id}`)
  }
  const increment = (item,e) =>{
    setRides(rides.map((ti)=>{
      if(ti.Eid===item.Eid){
        return {...ti,count:ti.count +1}
      }
      else {
        return ti
      }
    }))
    setFunevents(funevents.map((ti)=>{
      if(ti.Eid===item.Eid){
        return {...ti,count:ti.count +1}
      }
      else {
        return ti
      }
    }))
    e.preventDefault()
    

  }
  const decrement = (item,e) =>{
    setRides(rides.map((ti)=>{
      if(ti.Eid===item.Eid){
        return {...ti,count:ti.count -1}
      }
      else {
        return ti
      }
    }))
    setFunevents(funevents.map((ti)=>{
      if(ti.Eid===item.Eid){
        return {...ti,count:ti.count -1}
      }
      else {
        return ti
      }
    }))
    e.preventDefault()
    

  }
  return (
    <div className="App">
      <form className='form'>
        <div>Rides</div>
        {rides.map((item,key)=>(<div className='roller-coaster'>{item.Rname}
       
        <button className='rbutton' onClick={()=>cancelhandler(item)}>Cancel</button>
        <button className='rbutton'  onClick={(e)=>both(item,e,"Ride")} >Book</button>
        
        <div className='spi'>{item.available_seats} seats remaining</div>
        
        <button onClick={(e)=>increment(item,e)} className='increment'>Increment</button>
        <div className='value'>{item.count}</div>
        <button onClick={(e)=>decrement(item,e)} className='decrement'>Decrement</button>
        
        {/* {Axios.get("http://localhost:2000/filter",{
          Eid:item.Eid
        }
        ).then((res)=>res.data?(<button className='rbutton' onClick={cancelhandler}>Cancel</button>):(<button className='rbutton'  onClick={()=>both(item,key)} >Book</button>))} */}
        </div>))}
        <div>Fun events</div>
        {funevents.map((item,key)=>(<div className='roller-coaster'>{item.Fname}
        <button className='rbutton' onClick={()=>cancelhandler(item)}>Cancel</button>
        <button className='rbutton'  onClick={(e)=>both(item,e,"Funevents")} >Book</button>
        <div className='spi'>{item.available_seats} seats remaining</div>
        <button onClick={(e)=>increment(item,e)} className='increment'>Increment</button>
        <div className='value'>{item.count}</div>
        <button onClick={(e)=>decrement(item,e)} className='decrement'>Decrement</button>
        
        {/* {Axios.get("http://localhost:2000/filter",{
          Eid:item.Eid
        }
        ).then((res)=>res.data?(<button className='rbutton' onClick={cancelhandler}>Cancel</button>):(<button className='rbutton'  onClick={()=>both(item,key)} >Book</button>))} */}
        </div>))}
        <div>Total Price:{aprice.map((item)=>(<div>{item.sum}</div>))}</div>
     <button onClick={confirmb} style={{border:"none",width:"100px",height:"30px",background:"violet"}}>Confirm Booking</button>
      </form>
    </div>
  );
}

export default Loggedpage;
