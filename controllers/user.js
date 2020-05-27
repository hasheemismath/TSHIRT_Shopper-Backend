const User = require('../models/user');
const Order = require('../models/order');

exports.getUserbyId = (req,res,next,id)=>{
  User.findById(id).exec((err,user)=>{
      if(err || !user){
          return res.status(400).json({
                err: "No user was found"
          })
      }

      req.profile = user;
      next();
    })
};


exports.getUser = (req,res)=>{

    //hide all the unncessary dertails that you dont want show to user
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
  return res.json(req.profile)
};

exports.alluser = (req,res)=>{
    User.find().exec((err,user)=>{
        if(err || !user){
            res.status(400).json({
                err : "Users not found"
            })
        }
        res.status(200).json({
            user : user
        })
    })
};

exports.updateUser = (req,res)=>{
     User.findByIdAndUpdate(
         { _id : req.profile._id},
         {$set : req.body },
         {new : true , userFindAndModify : false},
         (err,user)=>{
             if(err ){
                 return res.status(400).json({
                     err : "you are not authorized to update this user"
                 })
             }
             //hide all the unncessary details that you dont want show to user
             res.json(user);
         }
     )
 };

exports.userPurchaseList = (req,res)=>{
    Order.find({_id: req.profile._id})
        .populate("user" , "_id name email")
        .exec((err,order)=>{
            if(err){
                res.status(400).json({
                    err: "No order in this account"
                })
            }
            res.json(order)
        })
};

exports.pushOrderInPurchaseList = (req, res, next) => {
    let purchases = [];
    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        });
    });

    //store thi in DB
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $push: { purchases: purchases } },
        { new: true },
        (err, purchases) => {
            if (err) {
                return res.status(400).json({
                    error: "Unable to save purchase list"
                });
            }
            next();
        }
    );
};
