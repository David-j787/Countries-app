import React from "react";


export default function CountryCard({id, name, flagImg}){
    return (
        <div>
            <h1>{name}</h1>
            <img src={flagImg} alt='img'></img>
            <h4>{id}</h4>
        </div>
    )
} 