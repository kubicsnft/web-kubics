import React, { useState, useEffect, useMemo } from "react";
import { ethers } from "ethers";

const ConnectContext = React.createContext();

export function MyProvider({ children }) {
  const [connected, setConnected] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
    async function initWeb3() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setListener(window.ethereum);
        // then add logic here
      } catch (error) {
        // handle error
      }
    }
    initWeb3();
    return () => removeListener(window.ethereum);
  
  }
    
  }, []);

  // this has to be set once globally. metamask suggests
  const setListener = (ethereum) => {
    ethereum.on("chainChanged", pageReload);
    ethereum.on("accountsChanged", pageReload);
  };
  const removeListener = (ethereum) => {
    ethereum.removeListener("chainChanged", pageReload);
    ethereum.removeListener("accountsChanged", pageReload);
  };

  function pageReload() {
    window.location.reload();
  }

  // Checks if wallet is connected
  async function checkIfWalletIsConnected() {
    if (typeof window.ethereum !== "undefined") {
      try {
        //console.log("Got the ethereum obejct: ", window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length !== 0) {
          //console.log("Found authorized Account: ", accounts[0]);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          setSigner(provider.getSigner());
          setAccount(accounts[0]);
          setConnected(true);
        } else {
          console.log("No authorized account found");
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("No Wallet found. Connect Wallet");
    }
  }

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        //Get account
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log(accounts[0]);
        setConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setSigner(provider.getSigner());
        // window.location.reload(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      setConnected(false);
    }
  }

  const is_Connected = () => {
    return connected;
  };
  const get_Signer = () => {
    return signer;
  };
  const get_Account = () => {
    return account;
  };

  /*   console.log("--------------------------");
  console.log(connected);
  console.log(signer);
  console.log(account);
  console.log("--------------------------"); */

  return (
    <ConnectContext.Provider
      value={{ is_Connected, get_Signer, get_Account, connect }}
    >
      {children}
    </ConnectContext.Provider>
  );
}
export { ConnectContext };
