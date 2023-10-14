import React, { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import './ui.css';
import { useNavigate } from 'react-router-dom';
export default function UploadImage(){

    const navigate=useNavigate();
    const[image,setImage]=useState(null);
    const[url,setUrl]=useState('');
    const[title,setTitle]=useState('');
    const[desc,setDesc]=useState('');
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
    },[]);
    const saveImage=async(e)=>{
        setImage(e.target.files[0]);
        e.preventDefault();
        const data=new FormData();
        data.append('file',image);
        data.append('upload_preset',"myCloud");
        data.append('cloud_name','dxkfceneu');
        try{
            if(image===null){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please Choose a Image!',
                    confirmButtonColor:'#000000',
                    "confirmButtonText":"Try Again",
                    "allowOutsideClick":false
                  })
                return;
            }
            const res=await fetch(`https://api.cloudinary.com/v1_1/dxkfceneu/image/upload`,{
                method:'POST',
                body:data
            })
            const cloudData=await res.json();
            console.log(cloudData.url);
            setUrl(cloudData.url);

        }catch(err){
            console.log(err);
        }
    }
    const uploadImage=async(e)=>{
        e.preventDefault();
        if(title==''||desc==''||image==''){
            Swal.fire({
                icon: 'info',
                title: 'Alert!',
                text: 'All fields are required!',
                confirmButtonColor:'#000000',
                "allowOutsideClick":false
              })
              setImage(null);
              setTitle('');
              setDesc('');
              return;
        }
        try{
            console.log(title,url,desc);
            const response= await axios.post('http://localhost:5000/uploadData',{url,title,desc});
            console.log(title,url,desc);
            console.log(response);
            if(response.data.status==200){
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulations🎉',
                    text: response.data.message,
                    confirmButtonColor:'#000000',
                    "allowOutsideClick":false
                  })
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
            setDesc('');
            setTitle('');
            setImage(null);
            navigate('/hub');
        }catch(err){
           console.log(err);
            return;
        }  
    }

    return(
        <>
        <div className='upload'>
        <div className='fields'>
            <input type='text' name='title' value={title} 
            className='field'
            placeholder='provide title of your image'
            onChange={(e)=>setTitle(e.target.value)}
            />
            <textarea  rows={3} cols={4} type='file' name='desc' value={desc}
             onChange={(e)=>setDesc(e.target.value)}
             className='field'
              placeholder='Provide brief description of your image.'
            />
            <input type='file' name='image'
            className='field'
             onChange={saveImage} accept='image/*'/>
                      
            {
                image
                ?<img 
                className='image'
                src={image?URL.createObjectURL(image):""}
                />
                :<img
                  className='image'
                    src='https://cdn1.iconfinder.com/data/icons/unicons-line-vol-4/24/image-upload-1024.png'
                />
            }
            <button className='btn' onClick={uploadImage}>Upload Image</button>
            </div>
        </div>
        </>
    )
}