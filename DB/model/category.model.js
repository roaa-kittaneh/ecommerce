import mongoose, { Schema, Types, model } from "mongoose";

const categorySchema= new Schema({
    name:{
        type:String,
        required:true,
      
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
    createdby:{type:Types.ObjectId,ref:'user'},
    updatedby:{type:Types.ObjectId,ref:'user'},
    

},{
    timestamps:true,
});

const categoryModel=model('category',categorySchema);
export default categoryModel;