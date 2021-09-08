import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./ShowMeme.css";
import { GridListTile, Grid, GridList } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

const ShowMeme = (props) => {
  const [gallery, setGallery] = useState([]);
  const getGridListCols = () => {
    if (isWidthUp("lg", props.width)) {
      return 3;
    }

    if (isWidthUp("md", props.width)) {
      return 3;
    }

    return 1;
  };
  useEffect(() => {
    fetch(`https://tranquil-forest-75801.herokuapp.com/memes`)
      .then((res) => res.json())
      .then((data) => {
        setGallery(data);
      });
  }, []);

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
    <div className="">
      <GridList cols={getGridListCols()}>
        {gallery.map((item) => (
          <GridListTile item key={item.id} cols={item.cols}>
            <img
              className=" p-1 mx-auto "
              style={{ height: "300px" }}
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

export default withWidth()(ShowMeme);
