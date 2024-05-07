import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import userModel from '../../../DB/model/user.model.js';

export const signup= async(req,res)=>{
const {username,email,password}=req.body;
const user=await userModel.findOne({email});
if(user){
    return res.json({massage:"email already exsit"});
}
const hashedpassword=bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
const createUser=await userModel.create({username,email,password:hashedpassword});
return res.json({massage:"success",user:createUser});

}

export const login=async(req,res)=>{
const {email,password}=req.body;
const user=await userModel.findOne({email});
if(!user){
    return res.json({massage:"invalid data"});
}
const match= await bcrypt.compare(password,user.password);
if(!match){
    return res.json({massage:"invalid data"});
}
const token=jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG);
return res.json({massage:"success",token});
}