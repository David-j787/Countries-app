import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from './../../Actions/index';





export default function Details(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const country = useSelector(state => state.detail);


    useEffect(() => {
        dispatch(getDetail(id));
    }, []);



    return(
        <>
        <div>
            <h1>{country.name} ({country.id})</h1>
            <h3>{country.capital}</h3>
            <img src={country.flagImg}/>
            <h2>Placed in {country.subregion} {country.continent}</h2>
            <h2>With {country.area}km2</h2>
            <h2>Wich poblation it's {country.population} people</h2>

            {
                country.activities?.map(act => {
                    return(
                        <div>
                            <h3>{act.name}</h3>
                            <h3>Difficulty: {act.difficulty}</h3>
                            <h3>Season: {act.season}</h3>
                            <h3>Duration: {act.duration}</h3>
                        </div>
                    )
                })
            }
        </div>
        </>
    )
}