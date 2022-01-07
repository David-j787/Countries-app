import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../../Actions";



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
        <span>
            {/* Search */}

            <input type = 'text'
            placeholder="Search country..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button type = 'submit'
            onClick = {e => handleSumbit(e)}
            >
            Find
            </button>

        </span>
    )
}