import React from "react";
import { Link } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://snappygoat.com/b/e5f59367dd04ccbe5839f25857bf0f0f4f2b1c3d"
          alt=""
        />
        <div className="user">
          <img
            src="https://snappygoat.com/b/e5f59367dd04ccbe5839f25857bf0f0f4f2b1c3d"
            alt=""
          />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum</h1>
        <p className="post-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mattis
          mauris ac eros mattis scelerisque. Curabitur sit amet dui aliquet,
          ornare risus a, malesuada massa. Aliquam non sapien in libero aliquam
          ullamcorper rutrum at arcu. Suspendisse ut nisl semper, aliquet diam
          vel, sagittis ipsum. Donec elementum ante euismod nisi efficitur
          gravida. Phasellus tristique odio nibh, vitae iaculis dolor volutpat
          at. Integer tristique, arcu nec ullamcorper scelerisque, nibh justo
          ultricies tortor, quis mollis sapien purus a ipsum. Fusce convallis
          aliquam maximus. Aenean vitae tristique ligula, quis consequat orci.
          <br />
          <br />
          Proin aliquet erat libero, a varius odio ultricies id. Class aptent
          taciti sociosqu ad litora torquent per conubia nostra, per inceptos
          himenaeos. Aliquam justo nulla, efficitur vel dui accumsan, rutrum
          porta nisl. In sagittis auctor ipsum. Sed sed scelerisque diam.
          Suspendisse interdum commodo nulla id tempor. Nunc dictum metus id
          bibendum blandit. Nunc hendrerit ante a ornare feugiat. Maecenas
          dignissim venenatis ex et semper.
        </p>
      </div>
      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;
