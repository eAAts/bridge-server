# Bridge Server

This script is used to bridge assets between the `Mantle` and `Polygon` networks. It listens for new transfer events on the `Mantle` network and then initiates a corresponding transfer on the `Polygon` network.

## Pre-requisites

- Node.js
- Yarn or npm
- Hardhat

## Setup

Clone the repository and navigate to the project directory and install the dependencies:

```bash
yarn install
```

or

```bash
npm install
```

Create a .env file in the root directory and add your private key and Infura key:

```
PRIVATE_KEY=your_private_key
INFURA_KEY=your_infura_key
```

## Running the Script

To start the bridge server, run the following command:

```bash
npx hardhat run scripts/bridge.js
```

The script will continuously listen for new transfer events on the `Mantle` network and initiate the corresponding transfers on the `Polygon` network.

## Conclusion

If you would like to contribute to the project, please fork the repository, make your changes, and then submit a pull request. We appreciate all contributions and feedback!
