import React from "react";
import Image from '../assets/kp.jpg'
export default function Header() {
            // display flex column
    return <header className="header">
        <img src= {Image} alt="KP" className="my-img" width="100px" />
        
    </header>

}