import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    getCountries, 
    OrderAlpha, 
    getCountryByContinent,
    OrderPopulation,
    searchByAct
    } from '../../Actions';
import getAct from '../../Actions';
import Paginado from '../Paginado/index.js';
import CountryCard from '../countryCard/card';
import SearchInput from '../SearchBar/index';
import './home.css'


export default function Home(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries())
        dispatch(getAct())
        console.log('llegue al dispatch')
    }, []);

    
    const countries = useSelector(state => state?.countries);
    const activities = useSelector(state => state?.activities);
    const[orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries?.slice(indexOfFirstCountry, indexOfLastCountry);
    
    // Order activities functions
    function handleSearchActivities(e){
        e.preventDefault();
        dispatch(searchByAct(e.target.value));
    }

    
    //Reset button
    function handleReset(e){
        e.preventDefault();
        dispatch(getCountries());
    }


    //pagination 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
}

    //Order by population function
    function handlePopulation(e){
        e.preventDefault();
        dispatch(OrderPopulation(e.target.value));
        setOrden(e.target.value);
    }

    //Order alphabethical functions
    function handleAlpha(e){
        e.preventDefault();
        setOrden(e.target.value);
        setCurrentPage(1);
        dispatch(OrderAlpha(e.target.value));
    }
    // Search by continents functions
    function handleGetContinent(e){
        e.preventDefault();
        setCurrentPage(1);
        setOrden(e.target.value);
        dispatch(getCountryByContinent(e.target.value))
    }


    return (
        <div id='entire'>
            

            <h1><label for='checkNav' id='Check'>☰</label></h1>
            <input type='checkbox' id='checkNav'/>
            <h1 id='titulo'>Countries</h1>
            <Link to='/add'>
                <button class="btn btn-outline-info"id='add-route'>Add</button>
            </Link>

            <SearchInput id = 'search'/>

            <div className='inputDiv'> 
            {/* Search Input */}

            {/* Search by continent */}

            <select class="form-select" aria-label="Default select example" className='orders' onChange={e => handleGetContinent(e)}>                
                <option value=''>Continent</option>
				<option value='North America'>North America</option>
                <option value='South America'>South America</option>    
				<option value='Antarctica'>Antarctica</option>
				<option value='Asia'>Asia</option>
				<option value='Africa'>Africa</option>
				<option value='Oceania'>Oceania</option>
            </select>

            {/* Order alphabetic */}

            <select className='orders' onChange={e => handleAlpha(e)}>
                <option selected>Order</option>
                <option value = 'A-Z'>A-Z</option>
                <option value = 'Z-A'>Z-A</option>
            </select>

            {/* Order per Population */}

                <select className='orders' onChange={e => handlePopulation(e)}>
                    <option selected>Population</option>
                    <option value = 'HtoL'>Higher to Lower</option>
                    <option value = 'LtoH'>Lower to Higher</option>
                </select>
            {/* Filter activities */}
            <select className='orders' onChange={e => handleSearchActivities(e)}>
                <option selected value = 'all'>Activities</option>
            {
                activities?.map(act => {
                    return (
                        <option value={act.name}>{act.name}</option>
                        )
                    })
                }
            </select>
            {/* Boton reset */}

            <button className='orders' id='reset-btn' class="btn btn-danger" onClick={e => handleReset(e)}>Reset filters</button>
                
            <h1><label for='checkNav' id='close-btn'>⏎</label></h1>

                </div>




                <div className='countries'>

            {/* mapeo de los paises */}
            { 
                currentCountries?.map(country => {
                    return(
                        <fragment>
                            <CountryCard
                            name = {country.name}
                            flagImg = {country.flagImg}
                            continent = {country.continent}
                            id = {country.id}
                            />
                        </fragment>
                    )
                })
            }
            </div>
            {
            <div id='pagination'>
                <Paginado
                countriesPerPage={countriesPerPage}
                countries={countries?.length}
                paginado={paginado}
                />
            </div>

            }
            
        </div>
    )
}