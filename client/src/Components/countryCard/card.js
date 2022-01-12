import React from "react";
import { Link } from "react-router-dom";
import './card.css'

export default function CountryCard({continent, name, flagImg, id}){
    return (
        <div className="card">
            <Link to = {'/home/'+id}>
            <h1>{name}</h1>
            <img className="flag" src={flagImg} ></img>
            <h4>{continent}</h4>
            </Link>
        </div>
    )
} 