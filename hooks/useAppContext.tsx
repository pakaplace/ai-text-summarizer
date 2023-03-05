import { createContext, useContext, useState } from "react";
import { Wallet } from "@ethersproject/wallet";
import { Context, Client, ContextParams } from "@aragon/sdk-client";

// Set up your IPFS API key. You can get one either by running a local node or by using a service like Infura or Alechmy.
// Make sure to always keep these private in a file that is not committed to your public repository.
export const IPFS_API_KEY: string = "dc3bde533f1eacfffb6cbd5850d286ae";

export const contextParams: ContextParams = {
  // Choose the network you want to use. You can use "goerli" or "mumbai" for testing, "mainnet" for Ethereum.
  network: "goerli",
  // Depending on how you're configuring your wallet, you may want to pass in a `signer` object here.
  signer: new Wallet(process.env.CONFIG_PK || ""),
  // Optional on "rinkeby", "arbitrum-rinkeby" or "mumbai"
  // Pass the address of the  `DaoFactory` contract you want to use. You can find it here based on your chain of choice: https://github.com/aragon/core/blob/develop/active_contracts.
  // daoFactoryAddress: "0xA03C2182af8eC460D498108C92E8638a580b94d4", // "0x16B6c6674fEf5d29C9a49EA68A19944f5a8471D3", //https://github.com/aragon/osx/blob/develop/active_contracts.json
  daoFactoryAddress: "0x16B6c6674fEf5d29C9a49EA68A19944f5a8471D3", // Goerli, //https://github.com/aragon/osx/blob/develop/active_contracts.json
  // Choose your Web3 provider: Cloudfare, Infura, Alchemy, etc.
  web3Providers: ["https://rpc.ankr.com/eth_goerli"],
  ipfsNodes: [
    {
      url: "https://ipfs.infura.io:5001/api/v0", //https://testing-ipfs-0.aragon.network/api/v0",
      headers: { "X-API-KEY": IPFS_API_KEY || "" },
    },
  ],
  // Don't change this line. This is how we connect your app to the Aragon subgraph.
  graphqlNodes: [
    {
      // url: "https://subgraph.satsuma-prod.com/qHR2wGfc5RLi6/aragon/osx-goerli/version/v1.0.0/api",
      url: "https://api.thegraph.com/subgraphs/name/aragon/aragon-zaragoza-goerli",
      // url: "https://api.thegraph.com/subgraphs/name/aragon/aragon-mainnet",
    },
  ],
};

// Instantiate the Aragon SDK context
const context: Context = new Context(contextParams);
// const client: Client = new Client(context);

export type AppContextType = {
  state: string;
  context: Context;
  // client: Client;
  setState: (c: string) => void;
};

const AppContext = createContext<AppContextType>({
  state: "Hello World", // set a default value
  // // client: client,
  context: context,
  setState: () => {},
});
export const useAppContext = () => useContext(AppContext);

interface PropsWithChildren {
  children?: React.ReactNode;
}

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<string>("");
  return (
    <AppContext.Provider value={{ state, setState, context }}>
      {children}
    </AppContext.Provider>
  );
};
