import React from "react";
import { Link } from "react-router-dom";
import './index.css'


export default function Landing(){
    return(
        <div className="all-land">
            <Link to='/home'>
                <button id='home-btn-land'><h1 id='text-land'>Let's start</h1></button>
            </Link>
            <h1 id='presen-land'>Find, explore and create.</h1>
        </div>
    )
}