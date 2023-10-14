import React,{useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './ui.css';
import { useNavigate } from "react-router-dom";

export default function LoginUser(){
    const navigate=useNavigate();
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    useEffect(()=>{
        if(localStorage.getItem("user")){
            Swal.fire({
                icon: 'info',
                title: 'Alert!',
                text: 'You Already Logged In!',
                confirmButtonColor:'#000000',
                "allowOutsideClick":false
              })
            navigate('/hub');
            return;
         }
    },[]);
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(email==''||password==''){
            Swal.fire({
                icon: 'info',
                title: 'Alert!',
                text: 'provide all fields!',
                confirmButtonColor:'#000000',
                "allowOutsideClick":false
              })
              setPassword('');
              setEmail('');
              return;
        }
        try{
            const response=await axios.post('http://localhost:5000/login',{email:email,password:password});
            console.log(response);
            if(response.data.status==200){
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations🎉',
                    text: response.data.message,
                    confirmButtonColor:'#000000',
                    "allowOutsideClick":false
                  })
                localStorage.setItem("user",response.data.user);
                navigate('/hub');

            }
            else{
                Swal.fire({
                    icon: 'info',
                    title: 'Alert!',
                    text: response.data.message,
                    confirmButtonColor:'#000000',
                    "allowOutsideClick":false
                  })
            }

        }catch(err){
            console.log(err);
        }
        setPassword('');
        setEmail('');
    }

    return(
        <>
        <div className='upload'>
        <div className='regfields'>
            <input type='email' name='email' value={email} 
            className='field'
            placeholder='Enter your email'
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input type='text' name='password' value={password} 
            className='field'
            placeholder='Enter your password'
            onChange={(e)=>setPassword(e.target.value)}
            />       
            <button className='btn' onClick={handleSubmit}>Login</button>
            </div>
        </div>
        </>
    )
    
}