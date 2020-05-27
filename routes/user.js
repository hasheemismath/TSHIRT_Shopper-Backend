const express = require("express");
const router = express.Router();

const {isSignIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const {getUserbyId,getUser,alluser,updateUser,userPurchaseList} = require('../controllers/user');

router.param("userID",getUserbyId);
router.get('/user/:userID',isSignIn,isAuthenticated, getUser);

router.get('/users/all',alluser);
router.put("/user/:userID",isSignIn,isAuthenticated,updateUser);

router.get("/orders/users/:userID",isSignIn,isAuthenticated,userPurchaseList);


module.exports = router;
