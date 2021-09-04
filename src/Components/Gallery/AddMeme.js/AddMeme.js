import { Link } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import './AddMeme.css'
const AddMeme = () => {
    // const [meme, setMeme] = useState({});
    const [imageURL, setImageURL] = useState(null);
    const [imageURLStatus, setImageURLStatus] = useState();
    const [dbStatus, setDbStatus] = useState(false);
    // const handleBlur = (e) => {
    //     const newInfo = { ...meme };
    //     newInfo[e.target.name] = e.target.value;
    //     setMeme(newInfo);
    //   };

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
        const memeData = {
          imageURL: imageURL,
         
        };
    
        try {
          const res = await axios.post(
            "http://localhost:5000/addMeme",
            memeData
          );
          if (res) {
            setDbStatus(res);
            e.target.reset();
            alert("Image added successfully");
          }
        } catch (error) {
          console.error(error);
          console.log(memeData);
        }
      };
    
    return (
        <div className=" container ">
            
            <form
          class="row   product-two mx-auto text-center rounded container"
          onSubmit={handleSubmit}
        >
         
          
         
          <div className="col-md-8">
            <label class="form-label fw-bolder text-white">Image</label>
            <input
              class="form-control"
              onChange={handleImageUpload}
              type="file"
            />
            {
              <p style={{ color: "red" }}>
                {" "}
                {imageURLStatus
                  ? "Image uploaded successfully, Click Submit to send your data to Database."
                  : "After choosing a file, Wait until image get uploaded."}
              </p>
            }
          </div>

          <div className="col-md-4 ">
          <button type="submit" class="btn btn-secondary mt-4">Upload Meme</button>
          <a href="/deleteMeme" type="submit" class="btn btn-secondary mt-4">Delete Meme</a>
          </div>
        </form>
        </div>
    );
};

export default AddMeme;