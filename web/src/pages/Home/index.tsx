import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";

import logo from "../../assets/logo.svg";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Recycollection" />
        </header>
        <main>
          <h1>Your marketplace of waste collection</h1>
          <p>We help people to find recycling collection centers efficiently</p>

          <Link to="/create-center">
            <span>
              <FiLogIn />
            </span>
            <strong>Create a collection center</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
