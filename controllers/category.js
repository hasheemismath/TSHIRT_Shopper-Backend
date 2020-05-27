const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id)=>{
  Category.findById(id).exec((err,cate)=>{
      if(err){
          return res.status(400).json({
              err : "Categoty not found in DB"
          })
      }
      req.category = cate ;
      next();
  })
};

exports.createCategory= (req,res)=>{
    const category = new Category(req.body);
    category.save((err,category)=>{
         if(err){
            return res.status(400).json({
                error: "Not able to save the category id DB"
            })
        }
        res.json({category});
    });
};

exports.getCategory = (req,res)=>{
    res.json(req.category);
};

exports.getAllCategory = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            res.status(400).json({
                error : "No category found"
            })
        }
        res.json(categories);
    })
};

exports.updareCategory = (req,res)=>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updateCategory)=>{
        if(err){
            return res.status(400).json({
                error : "Failed to update the category"
            })
        }
        res.json(updateCategory);
    })
};

exports.removeCategory = (req,res)=>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err) {
                return res.status(400).json({
                error : "Failed to delete the category"
             })
        }
        res.json({
            message : "Succefully deleted"
        })
    })

};
