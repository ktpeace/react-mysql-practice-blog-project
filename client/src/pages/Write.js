import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
axios.defaults.withCredentials = true;

const Write = () => {
  const { state } = useLocation();
  const [value, setValue] = useState(state?.descr || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.category || "");
  const [hasRequired, setHasRequired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setValue(state?.descr || "");
    setTitle(state?.title || "");
    setCat(state?.category || "");
  }, [state]);

  useEffect(() => {
    if (title === "" || cat === "" || value === "") {
      setHasRequired(false);
      console.log(false);
    } else {
      setHasRequired(true);
      console.log(true);
    }
  }, [title, value, cat, file]);

  const upload = async (e) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8800/api/upload/",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!hasRequired) {
      console.error("Required fields missing.");
    } else {
      try {
        let imgUrl = "";
        if (file) imgUrl = await upload();
        state
          ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
              withCredentials: true,
              title,
              descr: value,
              cat,
              img: imgUrl,
            })
          : await axios.post(`http://localhost:8800/api/posts/`, {
              withCredentials: true,
              title,
              descr: value,
              cat,
              img: imgUrl,
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
        ></input>
        <div className="editorContainer">
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="editor"
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <strong>Status: </strong> Draft
          </span>
          <span>
            <strong>Visibility: </strong> Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            name=""
            id="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
          ></input>
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handlePublish}>Publish</button>
          </div>
          {!hasRequired && (
            <div style={{ color: "red" }}>
              Title, body, & category are required.
            </div>
          )}
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "art"}
              name="cat"
              value="art"
              id="art"
              onChange={(event) => setCat(event.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "science"}
              name="cat"
              value="science"
              id="science"
              onChange={(event) => setCat(event.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "tech"}
              name="cat"
              value="tech"
              id="tech"
              onChange={(event) => setCat(event.target.value)}
            />
            <label htmlFor="tech">Tech</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "cinema"}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(event) => setCat(event.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "design"}
              name="cat"
              value="design"
              id="design"
              onChange={(event) => setCat(event.target.value)}
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === "food"}
              name="cat"
              value="food"
              id="food"
              onChange={(event) => setCat(event.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
