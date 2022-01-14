import React from "react";
import { Link } from "react-router-dom";
import './card.css'

export default function CountryCard({continent, name, flagImg, id}){
    return (
            <Link to = {'/home/'+id}>
        <div className="card">
            <h3 className='titlulos-Country'>{name}</h3>
            <img className="flag" src={flagImg} ></img>
            <h4 className='titlulos-Country'>{continent}</h4>
        </div>
            </Link>
    )
} 