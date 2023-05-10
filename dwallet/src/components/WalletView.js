import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Divider, Tooltip, List, Avatar, Spin, Tabs, Input, Button } from 'antd'
import { LogoutOutlined } from "@ant-design/icons";
import logo from "../noImg.png"
import axios from "axios"
import { CHAINS_CONFIG } from "../chains"
import { ethers } from "ethers";

function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain

}) {

  const [tokens, setTokens] = useState(null)
  const [nfts, setNfts] = useState(null)
  const [balance, setBalance] = useState(0)
  const [fetching, setFetching] = useState(false)
  const [to, seTto] = useState(null)
  const [amountToSend, setAmountToSend] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [txHash, setTxHash] = useState(null)

  const navigate = useNavigate()

  const sendTransaction = async () => {

    const transaction = {
      to: to,
      value: ethers.parseEther(amountToSend.toString())
    }
    const chain = CHAINS_CONFIG[selectedChain]

    const provider = new ethers.JsonRpcProvider(chain.rpcUrl)

    const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey
    console.log(privateKey)
    const walletSigner = new ethers.Wallet(privateKey, provider)
    setProcessing(true)
    try {
      const tx = await walletSigner.sendTransaction(transaction)

      setTxHash(tx.hash)
      const receipt = await tx.wait()
      setTxHash(null)
      setProcessing(false)
      setAmountToSend(null)
      seTto(null)
      if (receipt.status === 1) {
        getAccountTokens()
      } else {
        console.log("failed")
      }

    } catch (err) {
      setAmountToSend(null)
      seTto(null)
      setTxHash(null)
      setProcessing(false)
      console.log(err)
    }
  }
  const items = [
    {
      key: "3",
      label: "Tokens",
      children: (
        <>
          {tokens ? (
            <>
              <List
                bordered
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item, index) => (
                  <List.Item style={{ textAlign: "left" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.logo || logo} />}
                      title={item.symbol}
                      description={item.name}
                    />
                    <div>
                      {(
                        Number(item.balance) / 10 ** Number(item.decimals)
                      ).toFixed(2)}{" "}
                      Tokens
                    </div>
                  </List.Item>
                )}
              />
            </>) : (<><span>You don't seem to have any tokens yet</span></>)}
        </>
      )
    },
    {
      key: "2",
      label: "NFTS",
      children: (
        <>
          {nfts ? (<>
            {nfts.map((e, i) => {
              return (
                <>
                  {e && (
                    <img key={i} className="nftImage" alt="nft" src={e} />
                  )}
                </>
              )
            })}
          </>) : (<><span>No NFTS</span></>)}
        </>
      )
    },
    {
      key: "1",
      label: "Transfer",
      children: (
        <>
          <h3>Native</h3>
          <h1>
            {balance.toFixed(3)} {CHAINS_CONFIG[selectedChain].ticker}
          </h1>
          <div>
            <div className="sendRow">
              <p style={{ width: "90px", textAlign: "left" }}> To:</p>
              <Input value={to} onChange={(e) => seTto(e.target.value)} />
            </div>
            <div className="sendRow">
              <p style={{ width: "90px", textAlign: "left" }}> Amount:</p>
              <Input value={amountToSend} onChange={(e) => setAmountToSend(e.target.value)} />
            </div>
          </div>
          <Button onClick={sendTransaction} style={{ width: "100%" }} type="primary">
            Send Tokens

          </Button>
          {processing && (
            <>
              <Spin />
              {
                txHash && (
                  <Tooltip title={txHash}>
                    <p>Hover for Tx Hash</p>
                  </Tooltip>
                )
              }
            </>
          )}
        </>
      )
    }
  ]



  const getAccountTokens = async () => {
    setFetching(true)
    const response = await axios.get("http://localhost:3001/getTokens", {
      params: {
        userAddress: wallet,
        chain: selectedChain
      }
    })

    console.log(response)
    const data = response.data.jsonResponse

    if (data.tokens.length > 0) {

      setTokens(data.tokens)
    }
    if (data.nfts.length > 0) {
      setNfts(data.nfts)
    }

    setBalance(data.balance)
    setFetching(false)
  }

  const logout = () => {
    setSeedPhrase(null)
    setWallet(null)
    navigate("/")
  }

  useEffect(() => {
    if (!wallet && !selectedChain) return;
    setBalance(0)
    setTokens(null)
    setNfts(null)
    getAccountTokens()
  }, [, selectedChain])


  return (
    <>
      <div className="content">
        <div className="logoutButton" onClick={logout}>
          <LogoutOutlined />
        </div>
        <div className="walletName">Wallet</div>

        <div>
          {wallet.slice(0, 6)}....{wallet.slice(36)}
        </div>
        <div className="my-2">
          {balance.toFixed(3)}
        </div>
        <Tooltip />
        <Divider />
        {fetching ? (<div className="my-4 py-4"><Spin /></div>) : (<Tabs defaultActiveKey="1" items={items} className="walletView" />)}
      </div>
    </>
  );
}

export default WalletView;
