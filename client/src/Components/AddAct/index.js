import React, { useEffect, useState }from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from "../../Actions";
import { addAct } from "../../Actions";
import { Link } from 'react-router-dom';
import './index.css'


function control(input){
    let errors = {};
    if(!input.name || input.name.length > 15){
        errors.name = 'Put a name of 15 or less letters'
    }
    else if(!input.duration || input.duration.length > 20){
        errors.duration = 'Put a duration less than 20 letters'
    }
    return errors;
}


export default function AddAct(){
    const dispatch = useDispatch();
    const countries = useSelector( state => state?.countries);
    const orderCountries = countries.sort(function(a, b){
        if(a.name > b.name){
            return 1;
        }
        if(a.name < b.name){
            return -1;
        }
        return 0;
    })
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        difficulty: 1,
        duration: '',
        season: '',
        countries: []
    })

    useEffect(() => {
        dispatch(getCountries())
    }, [])

    function handleDelete(el){
        setInput({
            ...input,
            countries: input.countries.filter(country => country !== el)
        })
    }

    function handleInputChange(e){
        console.log(input)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(control({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleCountryChange(e){
        console.log(input.countries)
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }


    function handleSumbit(e){
        e.preventDefault();
        console.log(input);
        if(input.name && input.name.length <= 15 && input.duration && input.duration.length <= 20 && input.season && input.countries && input.countries.length > 0){
            dispatch(addAct(input));
            alert('Activity created succesfully!')
            setInput({
                name: '',
                difficulty: 1,
                duration: '',
                season: '',
                countries: []
            })
        }
        else{
            alert('Please complete the data')
        }
    }

    return(
        <div className="entire-input">
        <form className='form-add' onSubmit={e => handleSumbit(e)}>
            <div className="div-input" >

            <h5>Name</h5>
                <input className="inputs-add"
                type= 'text'
                placeholder="Name..."
                value = {input.name}
                name = 'name'
                onChange={e => handleInputChange(e)}
                />
                {
                    errors.name &&(
                        <h6 className="errors">{errors.name}</h6>
                    )
                }
            </div>

            <div className="div-input">

                <h5>Diffulty</h5>
                <input className="inputs-add"
                type= 'number' max='5' min='1'
                value = {input.difficulty}
                name = 'difficulty'
                onChange={e => handleInputChange(e)}
                />
            </div>

            <div className="div-input">
                <h5>Duration</h5>
                <input className="inputs-add"
                type= 'text'
                placeholder="Duration..."
                value = {input.duration}
                name = 'duration'
                onChange={e => handleInputChange(e)}
                />
                {
                    errors.duration &&(
                        <h6 className="errors">{errors.duration}</h6>
                    )
                }
            </div>
            
            <select id='select-season'
            className="div-input"
           value={input.season} name='season' onChange={e => handleInputChange(e)}>
                <option selected>Season</option>
                <option value = 'Verano'>Verano</option>
                <option value = 'Otoño'>Otoño</option>
                <option value = 'Invierno'>Invierno</option>
                <option value='Primavera'>Primavera</option>
            </select>

            <select id='select-country'
            className="div-input" onChange={e => handleCountryChange(e)}>
                <option selected>Select your countries</option>
                {
                    orderCountries?.map(country=> {
                        return(
                            <option  value = {country.name}>{country.name}</option>
                        )
                    })
                }
            </select>
            <button class="btn btn-outline-success" id='add-btn'type="sumbit">Add activity</button>
            </form>
            <h2 id="your">Your Countries</h2>
            <div id="selected-countries">

            {
                input.countries?.map(country => {
                    return <div className="country-inp" >
                        <span>{country}</span>
                        <button id='boton-inp' onClick={() => handleDelete(country)}>x</button>
                    </div>
                })
            }
            </div>
            <Link to ='/home'>
                <button id='back-add'><h1>🔙</h1></button>
            </Link>
            
        </div>
    )
}