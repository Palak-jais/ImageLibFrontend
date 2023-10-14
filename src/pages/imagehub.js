import React, { useState,useEffect } from 'react';
import axios from 'axios';
import{MdVisibility} from 'react-icons/md';
import{AiOutlineHeart} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
export default function ImageHub(){
    const navigate=useNavigate();
    const[images,setImages]=useState([]);
    const getdata=async()=>{
        try{
            const data=await axios.get('http://localhost:5000/getdata');
            setImages(data.data.data);
            console.log(data);
        }catch(err){
            console.log(err);
        }   
    }
    const getlike=async(id,val)=>{
        try{
            const data=await axios.post('http://localhost:5000/updateLike',{id,val});
            console.log(data);
            getdata();
        }catch(err){
            console.log(err);
        }   
    }
    const getview=async(id,val)=>{
        try{
            const data=await axios.post('http://localhost:5000/updateView',{id,val});
            console.log(data);
             getdata();
        }catch(err){
            console.log(err);
        }   
    }
    useEffect(()=>{
        if(!localStorage.getItem("user")){
            Swal.fire({
                icon: 'info',
                title: 'Alert!',
                text: 'Please Login First',
                confirmButtonColor:'#000000',
                "allowOutsideClick":false
              })
            navigate('/login');
            return;
        }
        getdata();
    },[])
    return<>
  <h1 className='top'>Our Collections</h1>
  <div className='cards'>
    {
        images.map((image,index) =>{
            return<div className='card' key={index}>
           <img className='srcimg'src={image.url} />
           <p className='title'>{image.title}</p>
           
            <div className='icons'>      
            <span className='icon'><MdVisibility onClick={()=>getview(image._id,image.viewed)}/><span className='num'>{image.viewed}</span></span>
            <span className='icon'><AiOutlineHeart onClick={()=>getlike(image._id,image.likes)}/><span className='num'>{image.likes}</span></span>
            <span><Link to={'/image/'+image._id} className='icon-view'>View</Link></span>
            </div>
            </div>
            
        })
    }
  </div>
    </>
}