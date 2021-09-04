import React from 'react';
import AddMeme from '../Gallery/AddMeme.js/AddMeme';
import ShowMeme from '../Gallery/ShowMeme/ShowMeme';
import './Home.css'
const Home = () => {
    return (
        <div>
            <h1 className="header ">Meme Gallery</h1>
            <AddMeme></AddMeme>
            <ShowMeme></ShowMeme>
            
        </div>
    );
};

export default Home;