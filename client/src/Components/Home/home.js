import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCountries } from '../../Actions'

import CountryCard from '../countryCard/card';



export default function Home(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries())
        console.log('llegue al dispatch')
    }, []);


    const countries = useSelector(state => state?.countries)
    return (
        <div>
            holaaaaa
            {
                countries?.map(country => {
                    return(
                        <fragment>
                            <CountryCard
                            id = {country.id}
                            name = {country.name}
                            flagImg = {country.flagImg}
                            />
                        </fragment>
                    )
                })
            }
        </div>
    )
}