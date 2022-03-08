import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { checkIfQuoteExists } from "../firebase";


export const AppContext = React.createContext({
  currentAccount: "",
  metaMaskInstalled: false,
  currentNetwork: '',
  isChainSupported: true,
  id: '',
  setId: (id: string) => {},
  connectToMetaMask: () => {},
});

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
  const [provider, setProvider] = useState<any>();
  const [currentNetwork, setCurrentNetwork] = useState<string>('');
  const [isChainSupported, setIsChainSupported] = useState(true);
  const [id, setId] = useState('');

  useEffect(() => {
    if (!currentNetwork) return;
    setIsChainSupported(['0x4', '0x1'].includes(currentNetwork));
  }, [currentNetwork])

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
    (async () => {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setCurrentNetwork(chainId);
    })()
    window.ethereum.on('chainChanged', (chainId: string) => {
      setCurrentNetwork(chainId);
    });
  }, []);

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
      value={{ currentAccount, metaMaskInstalled, connectToMetaMask, currentNetwork, isChainSupported, id, setId }}
    >
      {children}
    </AppContext.Provider>
  );
};
