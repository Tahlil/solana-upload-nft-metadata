require("dotenv").config();
const { NFTStorage, File, Blob } = require("nft.storage");
const { filesFromPath } = require("files-from-path");

//requiring path and fs modules
const path = require("path");
const fs = require("fs");

function getFilesGenerator(directory) {
  return filesFromPath(directory, {
    pathPrefix: path.resolve(directory), // see the note about pathPrefix below
    // hidden: true, // use the default of false if you want to ignore files that start with '.'
  });
}

const nftStorageToken = process.env.NFT_STORAGE_TOKEN;
const client = new NFTStorage({ token: nftStorageToken });

const imageDirectoryPath = path.join(__dirname, "images");
const nameDirectoryPath = path.join(__dirname, "nftdata.json");



function getCIDLink(cid) {
  return "https://" + cid + ".ipfs.nftstorage.link";
}

async function storeFilesInNFTStorage(files) {
  const cid = await client.storeDirectory(files);
  const status = await client.status(cid);
  console.log(status);
  return cid;
}

const nftNames = [];

let namesAndDescriptionsValid = validFileStructure();
let baseIpfsLink = "image",files;

async function main() {
  const files = getFilesGenerator(imageDirectoryPath);
  let cid = await storeFilesInNFTStorage(files);
  baseIpfsLink = getCIDLink(cid);
  const imageFiles = getFilesGenerator(imageDirectoryPath);

  let index = 0;
  for await (const f of imageFiles) {
    const imageLink = baseIpfsLink + f["name"];
    console.log("Image link: " + imageLink);
    const metaDataObj = {
      name: nftNames[index],
      symbol: "",
      image: imageLink,
    };
    const json = JSON.stringify(metaDataObj);
    const jsonFilePath = path.join(__dirname, "jsons", index + ".json");

    fs.writeFileSync(jsonFilePath, json, "utf8");
    index++;
  }
  const jsonDirectoryPath = path.join(__dirname, "jsons");
  const jsonFiles = getFilesGenerator(jsonDirectoryPath);
  cid = await storeFilesInNFTStorage(jsonFiles);
  console.log("Metadata holding folder base CID:\n" + getCIDLink(cid));
}

if (namesAndDescriptionsValid) {
  main();
} else {
  console.log("Name and/or description and/or image lists are invalid.");
}
