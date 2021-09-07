import axios from "axios";
import React, { useState } from "react";
import "./AddMeme.css";
const AddMeme = () => {
  const [meme, setMeme] = useState({});
  const [imageURL, setImageURL] = useState(null);
  const [imageURLStatus, setImageURLStatus] = useState();
  const [dbStatus, setDbStatus] = useState(false);
  const [dbStat, setDbStat] = useState(false);
  const handleBlur = (e) => {
    const newInfo = { ...meme };
    newInfo[e.target.name] = e.target.value;
    setMeme(newInfo);
  };

  const handleImageUpload = (me) => {
    console.log(me.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "347a42bcbffdfffd0275efa46b051dbe");
    imageData.append("image", me.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
        setImageURLStatus(true);
        if (response) {
          alert("Image Uploaded Successfully");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const memesData = {
      imageURL: imageURL,
      cols: e.target.cols.value,
     time: new Date()
    };

    try {
      const res = await axios.post("https://tranquil-forest-75801.herokuapp.com/addMeme", memesData);
      if (res) {
        setDbStatus(res);
        e.target.reset();
        alert("Image added successfully");
      }
    } catch (error) {
      console.error(error);
      console.log(memesData);
    }
  };
  const handle = async (e) => {
    e.preventDefault();
    const memeData = {
      link: e.target.link.value,
      cols: e.target.cols.value,
    };

    try {
      const res = await axios.post("https://tranquil-forest-75801.herokuapp.com/addMeme", memeData);
      if (res) {
        setDbStat(res);
        e.target.reset();
        alert("Image  successfully");
      }
    } catch (error) {
      console.error(error);
      console.log(memeData);
    }
  };

  return (
    <div className="container mt-4">
      <div className=" row">
        <form class="  col-md-6 d-flex mb-2 " onSubmit={handle}>
          <div style={{width:"75px"}}>
            <input
              required
              type="number"
              name="cols"
              min={1}
              max={2}
              onBlur={handleBlur}
              class="form-control"
              placeholder="cols"
            />
          </div>
           <div className=" w-50 ">
            <input
              required
              type="text"
              name="link"
              onBlur={handleBlur}
              class="form-control"
              placeholder="Link....."
            />
          </div>
         
          <div>
            <button type="submit" class="btn btn-secondary">
              Add Meme
            </button>
          </div>
        </form>

        <form className="col-md-6 d-flex" onSubmit={handleSubmit}>
        <div style={{width:"75px"}}>
            <input
              required
              type="number"
              name="cols"
              min={1}
              max={2}
              onBlur={handleBlur}
              class="form-control"
              placeholder="cols"
            />
          </div>
          <div className=" w-50 ">
            <input
              required
              class="form-control "
              onChange={handleImageUpload}
              type="file"
              name="imageURL"
            />
            <br />
            {
              <p style={{ color: "red" }}>
                {" "}
                {imageURLStatus
                  ? "Image uploaded successfully, Click Submit to send your data to Database."
                  : "After choosing a file, Wait until image get uploaded."}
              </p>
            }
          </div>
          {/* <button type="submit" class="btn btn-secondary mt-4">Upload Meme</button> */}
          <div>
            <button type="submit" class="btn btn-secondary">
              Upload Meme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeme;
