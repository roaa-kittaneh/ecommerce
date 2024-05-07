import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema= new Schema({
    name:{
        type:String,
        required:true,
       unique:true,
    },
    image:{
        type:Object,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:'active',
        enum:['active','notactive'],
    },
    createdby:{type:Types.ObjectId,ref:'User'},
    updatedby:{type:Types.ObjectId,ref:'User'},
    

},{
    timestamps:true,
});

const categoryModel=model('category',categorySchema);
export default categoryModel;