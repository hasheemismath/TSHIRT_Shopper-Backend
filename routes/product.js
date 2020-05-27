const express = require("express");
const router = express.Router();

const {isSignIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const {getUserbyId} = require('../controllers/user');
const {getProductbyId,createProduct,getProduct,photo,
    deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories,getImage} = require('../controllers/product');

//param
router.param("userId",getUserbyId);
router.param("productId",getProductbyId);

//create route
router.post("/product/create/:userId",isSignIn,isAuthenticated,isAdmin,createProduct);

//read route
router.get("/product/:productId",getProduct);
router.get("/product/photo/:productId",photo);

//delete Route
router.delete("/product/:productId/:userId",isSignIn,isAuthenticated,isAdmin,deleteProduct);

//update route
router.put("/product/:productId/:userId",isSignIn,isAuthenticated,isAdmin,updateProduct);

//listing route
router.get("/products",getAllProducts);

router.get("/product/image/:productId",getImage)

router.get("/products/categories",getAllUniqueCategories)



module.exports = router;
