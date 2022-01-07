import React from "react";


export default function CountryCard({continent, name, flagImg}){
    return (
        <div>
            <h1>{name}</h1>
            <img src={flagImg} ></img>
            <h4>{continent}</h4>
        </div>
    )
} 