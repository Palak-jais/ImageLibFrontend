import React,{useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './ui.css';
import {useNavigate} from 'react-router-dom';
export default function RegisterUser(){
    const navigate = useNavigate();
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    useEffect(()=>{
        if(localStorage.getItem("user")){
            Swal.fire({
                icon: 'info',
                title: 'Alert!',
                text: 'You Already Logged In',
                confirmButtonColor:'#000000',
                "allowOutsideClick":false
              })
            navigate('/hub');
            return;
         }

    },[])
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(email==''||password==''||username==''){
            Swal.fire({
                icon: 'info',
                title: 'Alert!',
                text: 'provide all fields!',
                confirmButtonColor:'#000000',
                "allowOutsideClick":false
              })
              setPassword('');
              setEmail('');
              setUsername('');
              return;
        }
        try{
            const response=await axios.post('http://localhost:5000/register',{username:username,email:email,password:password});
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
                  console.log(localStorage.getItem("user"));
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
        setUsername('');
    }

    return(
        <>
        <div className='upload'>
        <div className='regfields'>
            <input type='text' name='username' value={username} 
            className='field'
            placeholder='Enter your usernaame'
            onChange={(e)=>setUsername(e.target.value)}
            />
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
            <button className='btn' onClick={handleSubmit}>Register</button>
            </div>
        </div>
        </>
    )
    
}