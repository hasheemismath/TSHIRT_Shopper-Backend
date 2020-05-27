const express = require("express");
const router = express.Router();

const {isSignIn,isAdmin,isAuthenticated} = require('../controllers/auth');
const {getUserbyId} = require('../controllers/user');
const {getCategoryById,
    createCategory,
    getCategory,
    getAllCategory,
    updareCategory,
    removeCategory} = require('../controllers/category');

//param
router.param("userId",getUserbyId);
router.param("categoryId",getCategoryById);

//actual route
router.post("/category/create/:userId",isSignIn,isAuthenticated,isAdmin,createCategory);

router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);
router.put("/category/:categoryId/:userId",isSignIn,isAuthenticated,isAdmin,updareCategory);
router.delete("/category/:categoryId/:userId",isSignIn,isAuthenticated,isAdmin,removeCategory);



module.exports = router;

