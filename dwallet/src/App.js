import "./App.css";
import { useState } from 'react'
import { Select } from 'antd'
import logo from "./moralisLogo.svg"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import RecoverAccount from "./components/RecoverAccount"
import CreateAccount from "./components/CreateAccount";
import WalletView from "./components/WalletView"
function App() {

  const [selectedChain, setselectedChain] = useState("0x1")
  const [wallet, setwallet] = useState(null)
  const [seedPhrase, setSeedPhrase] = useState(null)

  return (
    <div className="App">
      <header>
        <img src={logo} />
        <Select value={selectedChain}
          onChange={(e) => setselectedChain(e)}
          options={[
            {
              label: "Ethereum",
              value: "0x1"
            },
            {
              label: "Binance",
              value: "0x38"
            },
            {
              label: "Polygon",
              value: "0x89"
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881"
            },
            {
              label: "Avalanche",
              value: "0xa86a"
            },
            {
              label: "Smart Chain Testnet",
              value: "0x61"
            },

          ]}
          className="dropdown"
        >

        </Select>
      </header>
      {wallet && seedPhrase ?
        <Routes>
          <Route path="/yourwallet" element={<WalletView wallet={wallet} seedPhrase={seedPhrase} setWallet={setwallet} setSeedPhrase={setSeedPhrase} selectedChain={selectedChain} />}></Route>
        </Routes>
        : <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/yourwallet" element={<CreateAccount setSeedPhrase={setSeedPhrase} setWallet={setwallet} />}></Route>
          <Route path="/recover" element={<RecoverAccount setSeed={setSeedPhrase} setWallet={setwallet} />}></Route>
        </Routes>
      }

    </div>
  );
}

export default App;
