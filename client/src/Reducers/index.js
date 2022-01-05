
const initialtate = {
    countries: [],
    allCountries: []
}



function rootReducer(state = initialtate, action){
    if(action.type === 'GET_COUNTRIES'){
        return {
            ...state,
            countries: action.payload,
            allCountries: action.payload
        }
    }
}

export default rootReducer;