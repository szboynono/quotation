require("@nomiclabs/hardhat-waffle");
require('dotenv').config();


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const projectId = 'b1f84e98b86843bb9d52f65244dc622a';
const { PRIVATE_KEY } = process.env;
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [PRIVATE_KEY]
    },
  },
  solidity: "0.8.4",
};
