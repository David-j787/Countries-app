import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/countries', {
            });
            return dispatch({
                type: 'GET_COUNTRIES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getCountriesByName(name){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/countries?name='+ name, {
            });
            return dispatch({
                type: 'GET_COUNTRIES_NAME',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function getCountryByContinent(payload){
    return {
        type: 'GET_BY_CONTINENT',
        payload
    }
}

export function OrderAlpha(payload){
    return {
        type: 'ORDER_ALPHA',
        payload
    }
}

export function OrderPopulation(payload){
    return {
        type: 'ORDER_POPULATION',
        payload
    }
}