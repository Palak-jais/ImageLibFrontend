import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import{MdVisibility} from 'react-icons/md';
import{AiOutlineHeart} from 'react-icons/ai';
export default function ImageView(){
    const {id} = useParams();
    console.log(id);
    const[title,setTitle]=useState('');
    const[desc,setdesc]=useState('');
    const[url,setUrl]=useState('');
    const[likes,setLikes]=useState(0);
    const[viewed,setViewed]=useState(0);

    const getdata=async()=>{
        try{
            const response=await axios.post('http://localhost:5000/getImage',{id});
            setTitle(response.data.data.title);
            setdesc(response.data.data.desc);
            setUrl(response.data.data.url);
            setLikes(response.data.data.likes);
            setViewed(response.data.data.viewed);
        }catch(err){
            console.log(err);
        }   
    }
    useEffect(()=>{
        getdata();
    },[]);

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
    return <>
        <div className="viewParent">
            <img src={url} className="viewImg"/>
            <h1 className="viewtitle">Title:<span className="title">{title}</span></h1>
            <h2 className="viewdesc">Description:<span className="desc">{desc}</span></h2>
            <h2 className="icon"><MdVisibility onClick={()=>getview(id,viewed)}/><span className="num">{viewed}</span></h2>
            <h2 className="icon"><AiOutlineHeart onClick={()=>getlike(id,likes)}/><span className="num">{likes}</span></h2>
        </div>
    </>
    

}