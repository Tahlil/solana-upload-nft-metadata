import { nftStorage } from '@metaplex-foundation/umi-uploader-nft-storage'
import dotenv from 'dotenv';
dotenv.config();

umi.use(nftStorageUploader({ token: process.env.NFT_STORAGE_TOKEN }))

import { createGenericFileFromBrowserFile } from '@metaplex-foundation/umi'

// Upload the asset.
const file = await createGenericFileFromBrowserFile(event.target.files[0])
const [fileUri] = await umi.uploader.upload([file])

// Upload the JSON metadata.
const uri = await umi.uploader.uploadJson({
  name: 'My NFT #1',
  description: 'My description',
  image: fileUri,
})