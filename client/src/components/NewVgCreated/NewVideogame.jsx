import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getVideogames, getPlatforms, createVideogame } from '../../actions/index.js';
import { validation } from '../validation';
import './newVideogame.css';
import { Link } from 'react-router-dom';

export default function NewVideogame() {

    const dispatch = useDispatch();
    const platforms= useSelector((state)=>state.platforms);
    const genres = useSelector((state)=>state.genres);
    let [button, setButton] = useState({});
    const [error, setError] = useState({});

    const [input, setInput] = useState({
        name: '',
        description: '',
        dateOfRelease: '',
        platforms: [],
        image: '',
        genres: [],
    });

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch])


    useEffect(() => {
        input.name && input.description && input.dateOfRelease && input.platforms.length && input.genres.length ? 
        setButton(false) :
        setButton(true)
    },[input]);

    console.log(button);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setError(validation({
            ...input,
            [e.target.name] : e.target.value,
        }))
        console.log(input);
    }

    function handleGenres(e) {

        let selection = e.target.name;
        let allSelections = [...input[selection]];
        if(allSelections.includes(e.target.value)){
            alert('That videogame Genre has already been selected')
        }
        setInput({
            ...input,
            genres: [...new Set([...input.genres, e.target.value])],
        });
        
        setError(validation({
            ...input,
            genres : [...input.genres, e.target.value] 
        }))
    };

    function handlePlatforms(e) {

        let selection = e.target.name;
        let allSelections = [...input[selection]];
        if(allSelections.includes(e.target.value)){
            alert('That Platform has already been selected')
        }

        setInput({
            ...input,
            platforms: [...new Set([...input.platforms, e.target.value])],
        });
        
        setError(validation({
            ...input,
            platforms : [...input.platforms, e.target.value] 
        }))
    };

    function handleSubmit(e) {
        e.preventDefault();
        setError(validation(input));
        if (Object.keys(error).length && input.name){
            return alert('Please complete required inputs to continue');
        } else {           
            dispatch (createVideogame(input));
            alert ('Game successfully created');
            setInput ({
                name: '',
                dateOfRelease: '',
                image: '',
                genres: [],
                platforms: [],
                description: '',
            });
            dispatch(getVideogames())
        };
    };

    return (
		<div className='background-form'>
            <br />
            <h1 className='create-title'> Create Your Own Videogame</h1>
            <Link to= '/home'>
                <button className="back-button">🡄 GO BACK</button>
            </Link>
            <br/>
           <form className='form-container' onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className='label'>Name </label> <br/>
                    <input type='text' placeholder='Enter Videogame Name' name='name' value={input.name} onChange={handleChange}></input> 
                    {error.name && (<p className='error'><small>{error.name}</small></p>)}
                    <br/><br/>

                    <label className='label'>Date Of Release </label><br/>
                    <input name='dateOfRelease' value={input.dateOfRelease} type='date' onChange={handleChange}></input>
                    {error.dateOfRelease && (<p className='error'><small>{error.dateOfRelease}</small></p>)}
                    <br/><br/>

                    <label className='label'>Image </label><br/>
                    <input name='image' placeholder='Insert the Image URL of your Videogame' value={input.image} onChange={handleChange}></input>
                    {error.image && (<p className='error'><small>{error.image}</small></p>)}
                    <br/><br/>

                    <label className='label'>Platforms </label><br/>
                    <select className='filters-form' name='platforms' defaultValue='Choose 1 at least' onChange={handlePlatforms}>
                        <option disabled value='Choose 1 at least'>Choose at least one Platform</option>
                        {
                        platforms.map((p) => (
                            <option key= {p.id} value={p.name} >{p.name}</option>
                            ))
                        }  
                    </select>
                    <select className='filters-form' name='platforms' defaultValue='Choose 1 at least' onChange={handlePlatforms}>
                        <option disabled value='Choose 1 at least'>Choose at least one Platform</option>
                        {
                        platforms.map((p) => (
                            <option key= {p.id} value={p.name} >{p.name}</option>
                            ))
                        }   
                    </select>
                    <select className='filters-form' name='platforms' defaultValue='Choose 1 at least' onChange={handlePlatforms}>
                        <option disabled value='Choose 1 at least'>Choose at least one Platform</option>
                        {
                        platforms.map((p) => (
                            <option key= {p.id} value={p.name} >{p.name}</option>
                            ))
                        }  
                    </select>
                    {error.platforms && (<p className='error'><small>{error.platforms}</small></p>)}
                    <br/><br/>

                    <label className='label'>Genres </label><br/>
                    <select className='filters-form' name='genres' defaultValue='Choose 1 at least' id='0' onChange={handleGenres}>
                        <option disabled value='At least one'>Choose at least one Genre</option>
                        {
                        genres.map((g) => (
                            <option key= {g.id} value={g.name} >{g.name}</option>
                            ))
                        }  
                    </select>
                    <select className='filters-form' name='genres' defaultValue='Choose 1 at least' id='0' onChange={handleGenres}>
                        <option disabled value='At least one'>Choose at least one Genre</option>
                        {
                        genres.map((g) => (
                            <option key= {g.id} value={g.name} >{g.name}</option>
                            ))
                        }
                    </select>
                    <select className='filters-form' name='genres' defaultValue='Choose 1 at least' id='0' onChange={handleGenres}>
                        <option disabled value='At least one'>Choose at least one Genre</option>
                        {
                        genres.map((g) => (
                            <option key= {g.id} value={g.name} >{g.name}</option>
                            ))
                        }
                    </select>
                    {error.genres && (<p className='error'><small>{error.genres}</small></p>)}
                    <br/><br/>

                    <label className='label'>Description</label> <br/>
                    <textarea name='description' placeholder='Write your Videogame description...' value={input.description} type='text' rows='6' cols='59' onChange={handleChange}></textarea>
                    {error.description && (<p className='error'><small>{error.description}</small></p>)}
                    <br/><br/>
                    <button className='create-button' disabled={button} onClick={(e) => handleSubmit(e)} type='submit'> CREATE VIDEOGAME</button>
                    <br/><br/>
                </div>
            </form>
        </div>
        
    );


}