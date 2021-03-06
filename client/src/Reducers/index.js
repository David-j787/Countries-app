
const initialtate = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: []
}



function rootReducer(state = initialtate, action){
    if(action.type === 'GET_COUNTRIES'){
        return {
            ...state,
            countries: action.payload,
            allCountries: action.payload
        }
    }
    else if(action.type === 'GET_COUNTRIES_NAME'){
        return {
            ...state,
            countries: action.payload
        }
    }
    else if(action.type === 'GET_BY_CONTINENT'){
        const allCountries = state.countries;

        const countryfiltered = action.payload === '' ? allCountries : allCountries.filter(el => el.continent.includes(action.payload));

        return {
            ...state,
            countries: countryfiltered
        }
    }
    else if(action.type === 'ORDER_ALPHA'){
        let arregloOrden = action.payload === 'A-Z' ?
        state.countries.sort(function(a, b){
            if(a.name > b.name){
                return 1;
            }
            if(a.name < b.name){
                return -1;
            }
            return 0;            
        }) :
        state.countries.sort(function(a, b){
            if(a.name > b.name){
                return -1;
            }
            if(a.name < b.name){
                return 1;
            }
                return 0;
        })
        return {
            ...state,
            countries: arregloOrden
        }
    }
    else if(action.type === 'ORDER_POPULATION'){
        let arregloOrden = action.payload === 'HtoL' ?
        state.countries.sort(function(a, b){
            if(a.population > b.population){
                return -1;
            }
            if(a.population < b.population){
                return 1;
            }
            return 0;            
        }) :
        state.countries.sort(function(a, b){
            if(a.population > b.population){
                return 1;
            }
            if(a.population < b.population){
                return -1;
            }
                return 0;
        })
        return {
            ...state,
            countries: arregloOrden
        }
    }
    else if(action.type === 'GET_ACTIVITIES'){
        return{
            ...state,
            activities: action.payload
        }
    }
    else if(action.type === 'ORDER_ACT'){
        let allCountries = state.allCountries;
        let orderAct = action.payload ==='all' ? 
        allCountries 
        :
        allCountries.filter(country => country.activities?.map(el => el.name).includes(action.payload))
        return{
            ...state,
            countries: orderAct
        }
    }  

    else if(action.type === 'ADD_ACT'){
        return{
            ...state
        }
    }
    else if(action.type === 'GET_DETAIL'){
        return{
            ...state,
            detail: action.payload
        }
    }
    return state;
}

export default rootReducer;