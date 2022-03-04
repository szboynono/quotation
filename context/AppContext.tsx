import React, { useEffect, useState } from "react";
import { ethers } from "ethers";


export const AppContext = React.createContext({
  currentAccount: "",
  metaMaskInstalled: false,
  connectToMetaMask: () => {},
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    setMetaMaskInstalled(typeof (window as any).ethereum !== "undefined");
  }, []);

  useEffect(() => {
    if (!metaMaskInstalled) return;
    setProvider(new ethers.providers.Web3Provider(
      (window as any).ethereum
    ));
  }, [metaMaskInstalled]);

  useEffect(() => {
    if (!!provider) {
      checkIsConnected();
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        setCurrentAccount(accounts[0]);
      })
    }
  }, [provider]);

  

  const checkIsConnected = async () => {
    try {
      const addresses = await provider.send("eth_accounts", []);
      if (!!addresses[0]) {
        setCurrentAccount(addresses[0]);
      }
    } catch (error) {
      console.error("request rejected");
    }
  }

  const connectToMetaMask = async () => {
    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      setCurrentAccount(await signer.getAddress());
    } catch (error) {
      console.error("request rejected");
    }
  };

  return (
    <AppContext.Provider
      value={{ currentAccount, metaMaskInstalled, connectToMetaMask }}
    >
      {children}
    </AppContext.Provider>
  );
};
