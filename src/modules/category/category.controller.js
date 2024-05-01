import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utilts/cloudinary.js";
export const create= async (req,res)=>{
    const name=req.body.name.toLowerCase();
    if(await categoryModel.findOne({name})){
        return res.json({massage:"category already exsit"});

    }
    
     const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:'roaa/category'
     });
     const category=await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id}})
    return res.json({massage:category});
}