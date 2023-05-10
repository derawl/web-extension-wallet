import React, { useState } from "react";
import { Button, Card } from "antd"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"

function CreateAccount({ setSeedPhrase, setWallet }) {

  const [seedPhrase, setSeedWPhrase] = useState(null)

  const navigate = useNavigate()
  const generateWallet = () => {
    const seed = ethers.Wallet.createRandom()
    setSeedWPhrase(seed.mnemonic.phrase)
  }
  const setWalletAndMnemonic = () => {
    setSeedPhrase(seedPhrase)
    setWallet(ethers.Wallet.fromPhrase(seedPhrase).address)
    console.log(ethers.Wallet.fromPhrase(seedPhrase).address)
  }


  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <ExclamationCircleOutlined />
          <div>
            Once you generate your seed phrase, copy it
            and save it securely to access your wallet in future
          </div>
        </div>


        <Button className="frontPageButton"
          type="primary"
          onClick={() => generateWallet()}
        >
          Generate Seed Phrase
        </Button>
        <Card className="seedPhraseContainer">
          {seedPhrase && <pre style={{ whiteSpace: "pre-wrap" }}>{seedPhrase}</pre>}
        </Card>
        <Button className="frontPageButton"
          type="default"
          onClick={() => setWalletAndMnemonic()}
        >
          Open Your Wallet
        </Button>
        <p className="frontPageButton" onClick={() => navigate("/")}>Back Home</p>



      </div>
    </>
  );
}

export default CreateAccount;
