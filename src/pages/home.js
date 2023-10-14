import React from "react";
import './ui.css';
import Typewriter from 'typewriter-effect';
import { Link } from "react-router-dom";
export default function HomePage(){
    return<>
    <h1 className="typed">
    <Typewriter
     options={{
    strings: ['Hello 👋! Welcome to Image Hub. ','Create Account and explore varieties of images!', 'Upload,like and view images and many more!'],
    autoStart: true,
    loop: true,
  }}
/>
</h1>
<div className="homebtns">
<Link to='/hub' className="btnHome">Explore Collections</Link>
<Link to='/hub' className="btnHome">Upload Your Image</Link>
</div>

    </>
}