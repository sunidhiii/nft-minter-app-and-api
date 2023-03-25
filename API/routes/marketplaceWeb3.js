var express = require('express');
var router = express.Router();
var webApi = require('../controller/Marketplace');
/* GET home page. */
router.get('/getMarketplaceOwner', webApi.getMarketplaceOwner);
router.post('/mintNft', webApi.mintNft);
router.post('/approveNft', webApi.approveNft);
router.post('/createOrder', webApi.createOrder);
router.get('/getOrderDetails', webApi.getOrderDetails);
router.post('/cancelOrder', webApi.cancelOrder);

module.exports = router;

