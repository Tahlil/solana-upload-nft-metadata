# Upload NFT Metadata to decentralized IPFS storage
- Add the images for the collection and nft images
- Add the name of the NFT and symbol of NFT
- Run `app.ts` to upload the images to IPFS and get the json file created for collection and NFTs.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [TypeScript](https://www.typescriptlang.org/) (install globally using `npm install -g typescript ts-node`)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Tahlil/solana-upload-nft-metadata.git
   ```

2. Change to the project directory:

   ```bash
   cd solana-upload-nft-metadata.
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add any necessary environment variables. You can use the provided `.env.example` file as a template.

## Build

Compile TypeScript to JavaScript using the following command:

```bash
tsc
```

This will generate the compiled JavaScript files in the `dist` directory.

## Run

Start the application using the following command:

```bash
npm start
```

This will run the `app.js` file using Node.js.

Feel free to adjust the scripts and configuration files according to your project structure and requirements.
