import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../utilts/cloudinary.js";

export const create= async (req,res)=>{
    //return res.json(req.user);
    const name=req.body.name.toLowerCase();
    if(await categoryModel.findOne({name})){
        return res.json({massage:"category already exsit"});

    }
    
     const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:'roaa/category'
     });
     req.body.image={secure_url,public_id};
     req.body.createdby=req.user._id;
     req.body.updatedby=req.user._id;


     const category=await categoryModel.create({name,slug:slugify(name),image:{secure_url,public_id}})
    return res.json({massage:category});

}

export const getALL= async(req,res)=>{
    const category=await categoryModel.find({});
    return res.json({massage:"success",category});
}

export const getactive= async(req,res)=>{
    const categories=await categoryModel.find({status:'active'}).select("name");
    return res.json({massage:"success",categories});
}

export const getDetails=async(req,res)=>{
const category=await categoryModel.findById(req.params.id);
return res.json({massage:"success",category});
};

export const Update= async(req,res)=>{

   

    const category=await categoryModel.findById(req.params.id);
    if(!category){
        return res.json({massage:"category not found"});

    }
    category.name=req.body.name.toLowerCase();
    if(await categoryModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.json({massage:"name already exsit"})
    }
    category.slug=slugify(req.body.name);
    if(req.file){
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
            folder:'roaa/category'
        });
        cloudinary.uploader.upload(category.image.public_id);
        category.image={secure_url,public_id};

    }
    category.status=req.body.status;
    await category.save();
    return res.json({massage:"success",category});
}

export const deletee=async(req,res)=>{
const category=await categoryModel.findByIdAndDelete(req.params.id);
if(!category){
    return res.json({massage:"category not found"});

}
await cloudinary.uploader.destroy(category.image.public_id);
return res.json({massage:"sucessflly",category});
}