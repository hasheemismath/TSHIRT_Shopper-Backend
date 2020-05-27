const express = require("express");
const router = express.Router();
const {isSignIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const {getUserbyId,pushOrderInPurchaseList} = require('../controllers/user');
const {updateStock} = require("../controllers/product");

const {getOrderById,createOrder,getAllOrders,getOrderStatus,updateStatus} = require("../controllers/order");

//param
router.param("userId",getUserbyId);
router.param("orderId",getOrderById);

//actual Route
router.post("/order/create/:userId/",isSignIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);
//read

router.get("/order/all/:userId",isSignIn,isAuthenticated,isAdmin,getAllOrders)

//status of order

router.get("/order/status/:userId",isSignIn,isAuthenticated,isAdmin,getOrderStatus)

router.put("/order/:orderId/status/:userId",isSignIn,isAuthenticated,isAdmin,updateStatus)

module.exports =router ;
