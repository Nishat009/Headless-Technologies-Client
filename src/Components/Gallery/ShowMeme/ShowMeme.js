import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./ShowMeme.css";
import { Grid } from "@material-ui/core";


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
    <Grid container cols={3}>
      {gallery.map((item) => (
        <Grid item md={4} sm={6} xs={12} key={item.img} cols={item.cols || 1}>
          <img
            className="show p-1 m-auto "
            style={{ height: "260px", width: "100%" }}
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
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowMeme;
