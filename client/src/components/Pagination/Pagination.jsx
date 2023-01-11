import React from "react";
import { useState } from "react";
import { VideogameCard } from "../Cards/VideogameCard";
import "./pagination.css"

export const renderVgPage = (videogame) => {

	return videogame.map((vg) => {
		return (
			<div key={vg.id} >
				<VideogameCard name={vg.name} image={vg.image} id= {vg.id} genres={vg.genres} rating= {vg.rating} />
			</div>
		);
	});

};

export default function Pagination({videogames}){
    const [currentPage, setCurrentPage] = useState(1);
    const [videogamesPerPage, setVideogamesPerPage]= useState(15);
    const indexOfLastVideogame= currentPage * videogamesPerPage;
    const indexOfFirstVideogame= indexOfLastVideogame - videogamesPerPage;
    const currentVideogames= videogames.slice(indexOfFirstVideogame, indexOfLastVideogame);    


const pages = [];
for (let i = 1; i <= Math.ceil(videogames.length / videogamesPerPage); i++) {
    pages.push(i);
};

const handleClick= (e)=> {
    setCurrentPage(Number(e.target.id));
}

return (
    <>
        <div className="card-render"> {renderVgPage(currentVideogames)}</div>
        <div className="container-buttons">
            <ul>
                {pages.map((number) => {
                    return (
                        <button
                            className="pagination-buttons"
                            key={number}
                            onClick={handleClick}
                            id={number}>
                            {number}
                        </button>
                    );
                })}
            </ul>
        </div>
    </>
)};