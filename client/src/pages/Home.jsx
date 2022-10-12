import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts${category}`
        );
        setPosts(res.data);
      } catch (err) {
        setError(err.response.data);
      }
    };
    fetchData();
  }, [category]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {error && <p>{error}</p>}
        {posts.map((post) => {
          return (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`./uploads/${post.img}`} alt="" />
              </div>
              <div className="content">
                <Link className="link" to={`/posts/${post.id}`}>
                  <h1>{post.title}</h1>
                </Link>
                <p>{getText(post.descr)}</p>
                <Link className="link" to={`/posts/${post.id}`}>
                  <button>Read more...</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
