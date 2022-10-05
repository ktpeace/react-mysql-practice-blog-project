import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        Made with ❤️ and <strong>React.js</strong>.
      </span>
    </footer>
  );
};

export default Footer;
