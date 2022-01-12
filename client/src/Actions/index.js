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
export default function getAct(){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/activity', {
            });
            return dispatch({
                type: 'GET_ACTIVITIES',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function searchByAct(payload){
    return {
        type: 'ORDER_ACT',
        payload
    }
}


export function addAct(payload){
    return async function(dispatch){
        let json = await axios.post('http://localhost:3001/activity', payload);
        return dispatch({
            type: 'ADD_ACT',
            payload: json.data
        })
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/countries/'+ id, {
            });
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}