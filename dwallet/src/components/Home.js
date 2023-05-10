import React from "react";
import { Button } from "antd";
import mwallet from '../mwallet.png'
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate()

  return (
    <>
      <div className="content">
        <img src={mwallet} className="frontPageLogo" />
        <h2>Hey There</h2>
        <h4 className="h4">Welcome to the Lala Wallet</h4>
        <Button
          className="frontPageButton"
          type="primary"
          onClick={() => navigate("/yourwallet")}
        >
          Create A Wallet
        </Button>
        <Button
          className="frontPageButton"
          type="default"
          onClick={() => navigate("/recover")}
        >
          Sign In with Seed Phrase
        </Button>
        <p className="frontPageButton">
          Find Alt Coin Gems: {""}
          <a href="">moralismoney</a>
        </p>
      </div>
    </>
  );
}

export default Home;
