import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";


export default function mint(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const rpcUrl = "rinkeby";

  // setup a wallet using private key for the SDK.
  // the wallet must have MINTER role to mint the NFT.
  // you can assign MINTER role to the wallet through the NFT collection dashboard.
  const privateKey = process.env.PRIVATE_KEY;
  const wallet = new ethers.Wallet(
    privateKey || '',
    ethers.getDefaultProvider(rpcUrl)
  );

  // initialize the SDK and get the NFT Collection module
  // get the contract address (0x...) from your dashboard!
  const nft = new ThirdwebSDK(wallet).getNFTModule(
    "0x9279797067C263770cc871a476035f5e484E418B"
  );

  // returning the HTTP response. This depends on the HTTP server framework.
  return new Promise<void>((resolve) => {
    // get the wallet address that's sent in from the request body.
    const { currentAccount, fileUrl } = req.body;

    // mint "My Sword" NFT to the wallet address that was requested.
    // note: async / await works too.
    nft
      .mintTo(currentAccount, {
        name: "Quotation",
        description: "Test description",
        image: fileUrl,
      })
      .then((metadata) => {
        // Returning the NFT metadata to the client requested.
        // This depends on the HTTP server framework
        res.status(200).json(metadata);
        resolve();
      });
  });
}
