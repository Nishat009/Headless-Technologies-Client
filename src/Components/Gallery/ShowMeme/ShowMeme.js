import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./ShowMeme.css";
import { GridListTile, Grid, GridList } from "@material-ui/core";


const ShowMeme = () => {
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    fetch(`https://tranquil-forest-75801.herokuapp.com/memes`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);
  // useEffect(() => {
  //   fetch("https://tranquil-forest-75801.herokuapp.com/memes")
  //     .then((res) => res.json())
  //     .then((data) => setGallery(data));
  // }, []);

  const handleDelete = (id) => {
    fetch(`https://tranquil-forest-75801.herokuapp.com/deleteMemes/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          deleteMemes();
          alert("Meme Deleted Successfully");
        }
      });
  };
  const deleteMemes = () => {
    fetch(`https://tranquil-forest-75801.herokuapp.com/memes`)
      .then((res) => res.json())
      .then((data) => setGallery(data));
  };

  return (
    // <GridList   cols={3} style={{ width: "100%", height: "100%" }} >
    //     {gallery.map((data) => (
    //       <GridListTile  key={data.id} cols={data.cols || 1}>
    //         <img md={4} sm={6} xs={12}  src={data.imageURL || data.link} alt={data.title} />
    //         <small>
    //         <FontAwesomeIcon
    //           onClick={() => handleDelete(data._id)}
    //           size="2x"
    //           className="delete-icon"
    //           icon={faTrash}
    //         />
    //       </small>
    //       </GridListTile>
    //     ))}
    //   </GridList>
<div>
<GridList   cols={3}>
      {gallery.map((item) => (
    
          
          <GridListTile item colsSm={12}  key={item.id} cols={item.cols || 1}>
            {/* <h1>Time:{new Date(item.time).toDateString()}</h1> */}
          <img
            className="show p-1 m-auto "
            style={{ height: "300px", width: "100%" }}
            src={item.imageURL || item.link}
            alt=""
          />
          <small>
            <FontAwesomeIcon
              onClick={() => handleDelete(item._id)}
              size="2x"
              className="delete-icon"
              icon={faTrash}
            />
          
          </small> 
        </GridListTile>
     
     
    
     
      ))}
    </GridList> 
    
</div>
  );
};

export default ShowMeme;
