import React, { useState } from "react";
import { Button, Input } from "antd"
import { useNavigate } from "react-router-dom"
import { ethers } from "ethers"


function RecoverAccount({ setSeed, setWallet }) {
  const [typedSeed, settypedSeed] = useState("")
  const [nonValid, setNonValid] = useState(false)

  const navigate = useNavigate()

  const recoverWallet = () => {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed)
    } catch (err) {
      setNonValid(true)
      return;
    }
    setSeed(typedSeed);
    setWallet(recoveredWallet.address);
    navigate("/yourwallet")
    return;
  }

  return (
    <>
      <div className="content">


        <Input value={typedSeed} rows={4} placeholder="Type Your Seed Phrase" onChange={(val) => { settypedSeed(val.target.value); setNonValid(false); }} className="seedPhraseContainer">
          {/* {<pre style={{ whiteSpace: "pre-wrap" }}>}</pre>} */}
        </Input>
        <Button disabled={typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "} className="frontPageButton"
          type="default"
          onClick={() => recoverWallet()}
        >
          Open Your Wallet
        </Button>
        {nonValid && <p style={{ color: "red" }}> Invalid Seed Phrase</p>}
        <p className="frontPageButton" onClick={() => navigate("/")}>Back Home</p>



      </div>
    </>
  );
}

export default RecoverAccount;
