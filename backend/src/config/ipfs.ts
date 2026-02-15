import axios from "axios";

const uploadToIPFS = async (metadata: any ) => {
    const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
            headers:{
                pinata_api_key: process.env.PINATA_APIKEY,
                pinata_secret_api_key: process.env.PINATA_APISECRET
            }
        }
    );
    return `ipfs://${response.data.IpfsHash}`;
};

export default uploadToIPFS;