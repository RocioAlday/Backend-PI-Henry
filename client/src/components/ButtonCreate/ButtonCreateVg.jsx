import React from "react";
import { Link } from "react-router-dom";
import './buttonCreate.css';

function ButtonCreateVg() {

	return (
		<div>
			<Link to='/videogames/createvideogame'>    
				<button className="createbutton">CREATE YOUR VIDEOGAME</button>
			</Link>                
		</div>
	);
}

export default ButtonCreateVg;
