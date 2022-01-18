import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetail } from './../../Actions/index';
import './index.css'




export default function Details(){

    const {id} = useParams();
    const dispatch = useDispatch();
    const country = useSelector(state => state.detail);


    useEffect(() => {
        dispatch(getDetail(id));
    }, []);



    return(
        <div className="all-detail">
        <div id='div-detail'>
            <h1 className="aling-detail">{country.name} ({country.id})</h1>
            <h3 className="aling-detail">{country.capital}</h3>
            <img id='flag-detail' src={country.flagImg}/>
            <h2 className="aling-detail">Placed in {country.subregion} {country.continent}</h2>
            <h2 className="aling-detail">With {country.area}km2</h2>
            <h2 className="aling-detail" >Wich poblation it's {country.population} people</h2>

        </div>
            {
                country.activities?.map(act => {
                    return(
                        <div className="div-activity">
                            <h3>{act.name}</h3>
                            <h4>Difficulty: {act.difficulty}</h4>
                            <h4>Season: {act.season}</h4>
                            <h4>Duration: {act.duration}</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}