import React from "react";
import './index.css'


export default function Paginado({ countriesPerPage, countries, paginado }) {
    const pageNumbers = [];


    for (let i = 1; i <= Math.ceil(countries / countriesPerPage); i++) {
        pageNumbers.push(i)

    }


    return (
        <nav>
            <ul>
                {
                    pageNumbers?.map((number) => {
                        return <div className='numeritos'>
                            <button   id='boton' onClick={() => paginado(number)}>{number}</button>
                        </div>
                    })
                }
            </ul>
        </nav>
    )
}