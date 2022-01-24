import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../Actions";
import './index.css'

export default function SearchInput(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');


    // search functions
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSumbit(e){
        e.preventDefault()
        dispatch(getCountriesByName(name))
    }

    return (
        <span id="searchbar">
            {/* Search */}

            <input class="input-group-text" type = 'text'
            placeholder="Search country..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button id='search-btn' class="btn btn-outline-light"type = 'submit'
            onClick = {e => handleSumbit(e)}
            >
            Find
            </button>

        </span>
    )
}