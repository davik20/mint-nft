import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import NFMintAbi from "../contracts/NFMint.json";
import config from "../config";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextUpdate = createContext();

function AppProvider({ children }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [web3, setWeb3] = useState(null);
  const [chainError, setChainError] = useState(false);
  const [loadingNFTs, setLoadingNFTs] = useState(false);
  const [account, setAccount] = useState("");
  const [NFMintContract, setNFMintContract] = useState(null);
  const [rand, setRand] = useState(0);

  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId) => {
        if (config.mode === "production") {
          if (chainId == 4) {
            setChainError(false);
          } else {
            setChainError(true);
          }
        }
      });
      window.ethereum.on("accountsChanged", (accounts) => {
        setAccount(accounts[0]);
      });
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (NFMintContract && account) {
      console.log(NFMintContract);
      setLoadingNFTs(true);

      NFMintContract.methods
        .getAllUserCollectibles(account)
        .call({ from: account })
        .then((result) => {
          const userNFTs = result.map((nft) => {
            const { name, description, imageUrl } = JSON.parse(nft.tokenURI);

            return {
              id: nft.tokenId,
              name,
              description,
              imageUrl,
            };
          });

          setNFTs(userNFTs);
          setLoadingNFTs(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingNFTs(false);
          toast("An error occurred");
        });
    }
  }, [NFMintContract, account]);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleShowCreateModal = () => {
    if (!account) {
      alert("You are not connected, please connect");
      return;
    }
    if (chainError) {
      alert("Please Select the rinkeby chain");
      return;
    }
    setShowCreateModal(true);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        setWeb3(web3);
        setAccount(accounts[0]);

        const id = await web3.eth.net.getId();

        if (config.mode === "development") {
          const id = await web3.eth.net.getId();

          const contract = new web3.eth.Contract(
            NFMintAbi.abi,
            "0xfc0918F42b7B6008A7Fb2dC7464bc6Ea6e871067"
          );

          setNFMintContract(contract);
        }

        if (config.mode === "production") {
          if (id != 4) {
            setChainError(true);
          } else {
            const id = await web3.eth.net.getId();

            const contract = new web3.eth.Contract(
              NFMintAbi.abi,
              "0x46c9f3C031b79D2a9f9Ab3e416Eb19A91dd00e6D"
            );

            setNFMintContract(contract);
            setChainError(false);
          }
        }
      }
      if (!window.ethereum) {
        const walletConnectProvider = await new WalletConnectProvider({
          infuraId: "3ee5b26be9d9451b96c018232c629555",
        });
        await walletConnectProvider.enable();
        const web3 = new Web3(walletConnectProvider);

        const accounts = await web3.eth.getAccounts();

        setWeb3(web3);
        setAccount(accounts[0]);
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
      setLoadingNFTs(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        NFTs: NFTs,
        showCreateModal,
        web3,
        chainError,
        account,
        NFMintContract,
        loadingNFTs,
      }}
    >
      <AppContextUpdate.Provider
        value={{
          handleCloseCreateModal,
          handleShowCreateModal,
          connectWallet,
          NFMintContract,
          setRand,
        }}
      >
        {children}
      </AppContextUpdate.Provider>
    </AppContext.Provider>
  );
}

export default AppProvider;
