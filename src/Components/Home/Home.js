import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import AddMeme from "../Gallery/AddMeme.js/AddMeme";
import ShowMeme from "../Gallery/ShowMeme/ShowMeme";
import "./Home.css";
const Home = () => {
  return (
    <div className= "container">
      <h1 className="header mx-auto mt-1 text-center">Meme Gallery</h1>
      <Link to="/seeStat">See Stat</Link>
      <AddMeme></AddMeme>
      <ShowMeme></ShowMeme>
      <Footer></Footer>
    </div>
  );
};

export default Home;
