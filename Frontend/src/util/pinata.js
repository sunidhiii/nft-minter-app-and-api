require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                "pinata_api_key": "a4b284f662d144908f60",
                "pinata_secret_api_key": "1a64988da62c80732713a1c73bee7245a695f39a172879954da611419b76c284",
            }
        })
        .then(function (response) {
           console.log("Result => ", response.data);
           console.log("PinataURL => ", "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash);
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
           
        });

    // console.log("key", key, secret)

        // try {
        //     const result = await axios({
        //       method: "POST",
        //       url: `https://api.pinata.cloud/pinning/pinJSONToIPFS`,
        //       data: JSONBody,
        //       headers: {
        //         pinata_api_key: key,
        //         pinata_secret_api_key: secret,
        //       }
        //     });
        //     console.log("TxHash => ", result.data);
        //     return {
        //         success: true,
        //         pinataUrl: "https://gateway.pinata.cloud/ipfs/" + result.data.IpfsHash
        //     };
        //   } catch(error) {
        //     console.log(error)
        //     return {
        //         success: false,
        //         message: error.message,
        //     }
        // }
        
};