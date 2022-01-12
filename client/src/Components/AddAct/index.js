import React, { useEffect, useState }from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from "../../Actions";
import { addAct } from "../../Actions";



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
        if(input.name && input.name.length <= 15 && input.duration && input.duration.length <= 20 && input.season && input.countries){
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
        <>
        <form onSubmit={e => handleSumbit(e)}>
            <div>
                <span>Name</span>
                <input type= 'text'
                value = {input.name}
                name = 'name'
                onChange={e => handleInputChange(e)}
                />
                {
                    errors.name &&(
                        <p>{errors.name}</p>
                    )
                }
            </div>

            <div>

                <span>Diffulty</span>
                <input type= 'number' max='5' min='1'
                value = {input.difficulty}
                name = 'difficulty'
                onChange={e => handleInputChange(e)}
                />
            </div>

            <div>
                <span>Duration</span>
                <input type= 'text'
                value = {input.duration}
                name = 'duration'
                onChange={e => handleInputChange(e)}
                />
                {
                    errors.duration &&(
                        <p>{errors.duration}</p>
                    )
                }
            </div>
            <select 
           value={input.season} name='season' onChange={e => handleInputChange(e)}>
                <option selected>Season</option>
                <option value = 'Verano'>Verano</option>
                <option value = 'Otoño'>Otoño</option>
                <option value = 'Invierno'>Invierno</option>
                <option value='Primavera'>Primavera</option>
            </select>

            <select onChange={e => handleCountryChange(e)}>
                <option selected>Select your countries</option>
                {
                    orderCountries?.map(country=> {
                        return(
                            <option value = {country.name}>{country.name}</option>
                        )
                    })
                }
            </select>
            {
                input.countries?.map(country => {
                    return <div>
                        <h3>{country}</h3>
                        <button onClick={() => handleDelete(country)}>x</button>
                    </div>
                })
            }

            <button type="sumbit">ADD</button>
            
        </form>
        </>
    )
}