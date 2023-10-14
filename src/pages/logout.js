import React,{useEffect} from 'react';
import './ui.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Logout(){
    const navigate=useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem("user")){
        Swal.fire({
            icon: 'info',
            title: 'Alert!',
            text: 'You already Logged Out!',
            confirmButtonColor:'#000000',
            "allowOutsideClick":false
          });
          navigate('/login');
          return;
      }
    },[])
    const handleClick=()=>{
        localStorage.clear();
        Swal.fire({
            icon: 'success',
            text:'Logged out sucessfully',
            confirmButtonColor:'#000000',
            "allowOutsideClick":false
          })
        navigate('/login');
    }
  return <>
    <button className='btnLogout' onClick={()=>handleClick()}>Logout</button>
  </>
}