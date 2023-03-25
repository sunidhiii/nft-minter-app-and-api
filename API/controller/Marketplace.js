const constant = require('../Helper/constant');
const Web3 = require('web3');
const testnode = 'https://rpc-mumbai.maticvigil.com/'
const web3 = new Web3(new Web3.providers.HttpProvider(testnode));
const marketplaceContract = new web3.eth.Contract(constant.marketplaceAbi, constant.marketplaceContractAddress);
const nftContract = new web3.eth.Contract(constant.nftAbi, constant.nftContractAddress);
require('dotenv').config()

/**
 * Function Name : getMarketplaceOwner
 * Description   : returns the owner of the marketplace contract
 *
 * @return response
*/
const getMarketplaceOwner = async (req, res) => {
  try {
    var response = await marketplaceContract.methods.owner().call()
    console.log("ownerAddress ====>>>", response);
    return res.status(200).send({ 'ownerAddress': response, });

  } catch (error) { console.log("error in tokenAddress", error) }
}

/**
 * Function Name : mintNft
 * Description   : mints one nft on user addresses
 *
 * @return response
*/
const mintNft = async (req, res) => {
  // console.log(process.env) 
  try {
    const txObject = {
      to: constant.nftContractAddress,
      //gas: web3.utils.toHex('100000'),
      gasPrice: web3.utils.toHex('20000000000'),    // Always in Wei
      gasLimit: web3.utils.toHex('500000'),
      data: nftContract.methods.create(req.body.uri, req.body.name).encodeABI()
    };
    //console.log(txObject.data);
    const signPromise = await web3.eth.accounts.signTransaction(txObject, process.env.PRIVATE_KEY);
    web3.eth.sendSignedTransaction(signPromise.raw || signPromise.rawTransaction)
      .once('confirmation', (confirmationNumber, receipt) => {
        //console.log('receipt', receipt);
        return res.status(200).send({ 'result': receipt });
      })
  } catch (error) {
    return res.status(500).send({ 'error ======>': error });
  }
}

/**
 * Function Name : approveNft
 * Description   : approve the token Id for use on marketplace smart contract
 *
 * @return response
*/
const approveNft = async (req, res) => {
  // console.log(process.env) 
  try {
    const txObject = {
      to: constant.nftContractAddress,
      //gas: web3.utils.toHex('100000'),
      gasPrice: web3.utils.toHex('20000000000'),    // Always in Wei
      gasLimit: web3.utils.toHex('500000'),
      data: nftContract.methods.approve(constant.marketplaceContractAddress, req.body.tokenId).encodeABI()
    };
    //console.log(txObject.data);
    const signPromise = await web3.eth.accounts.signTransaction(txObject, process.env.PRIVATE_KEY);
    web3.eth.sendSignedTransaction(signPromise.raw || signPromise.rawTransaction)
      .once('confirmation', (confirmationNumber, receipt) => {
        //console.log('receipt', receipt);
        return res.status(200).send({ 'result': receipt });
      })
  } catch (error) {
    return res.status(500).send({ 'error ======>': error });
  }
}

/**
 * Function Name : createOrder
 * Description   : creates order using the token Id on the marketplace contract with provided details
 *
 * @return response
*/
const createOrder = async (req, res) => {
  try {
    const txObject = {
      to: constant.marketplaceContractAddress,
      //gas: web3.utils.toHex('100000'),
      gasPrice: web3.utils.toHex('20000000000'),    // Always in Wei
      gasLimit: web3.utils.toHex('500000'),
      data: marketplaceContract.methods.createOrder(constant.nftContractAddress, req.body.tokenId, req.body.price, req.body.expiry, req.body.currency, req.body.minBidAmount).encodeABI()
    };
    //console.log(txObject.data);
    const signPromise = await web3.eth.accounts.signTransaction(txObject, process.env.PRIVATE_KEY);
    web3.eth.sendSignedTransaction(signPromise.raw || signPromise.rawTransaction)
      .once('confirmation', (confirmationNumber, receipt) => {
        //console.log('receipt', receipt);
        return res.status(200).send({ 'result': receipt });
      })
  } catch (error) {
    return res.status(500).send({ 'error ======>': error });
  }
}

/**
 * Function Name : getOrderDetails
 * Description   : returns all the details of an order placed on marketplace
 *
 * @return response
*/
const getOrderDetails = async (req, res) => {
  try {
    var response = await marketplaceContract.methods.orderByAssetId(constant.nftContractAddress, req.query.tokenId).call()
    console.log("orderDetails ====>>>", response);
    return res.status(200).send({ 'orderDetails': response, });

  } catch (error) { console.log("error in orderDetails", error) }
}

/**
 * Function Name : cancelOrder
 * Description   : cancels an existing order from the marketplace contract
 *
 * @return response
*/
const cancelOrder = async (req, res) => {
  //console.log("Hello");
  try {
    const txObject = {
      to: constant.marketplaceContractAddress,
      //gas: web3.utils.toHex('100000'),
      gasPrice: web3.utils.toHex('20000000000'),    // Always in Wei
      gasLimit: web3.utils.toHex('500000'),
      data: marketplaceContract.methods.cancelOrder(constant.nftContractAddress, req.body.tokenId).encodeABI()
    };
    //console.log(txObject.data);
    const signPromise = await web3.eth.accounts.signTransaction(txObject, process.env.PRIVATE_KEY);
    web3.eth.sendSignedTransaction(signPromise.raw || signPromise.rawTransaction)
      .once('confirmation', (confirmationNumber, receipt) => {
        //console.log('receipt', receipt);
        return res.status(200).send({ 'result': receipt });
      })
  } catch (error) {
    return res.status(500).send({ 'error ======>': error });
  }
}

module.exports = {
  getMarketplaceOwner: getMarketplaceOwner,
  mintNft: mintNft,
  approveNft: approveNft,
  createOrder: createOrder,
  getOrderDetails: getOrderDetails,
  cancelOrder: cancelOrder
}
