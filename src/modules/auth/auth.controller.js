import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid';
import { nanoid} from 'nanoid'
import userModel from '../../../DB/model/user.model.js';
import { sendemail } from '../../utilts/email.js';

export const signup= async(req,res)=>{
const {username,email,password}=req.body;
const user=await userModel.findOne({email});
if(user){
    return res.json({massage:"email already exsit"});
}
const hashedpassword=bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
const createUser=await userModel.create({username,email,password:hashedpassword});
await sendemail(email,`wellcom`, `<h2>hello ya ${username} </h2>`);
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


export const sendcode = async (req, res) => {
    const { email } = req.body;
    const code = customAlphabet('1234567890abcdef', 4)();
    const user = await userModel.findOneAndUpdate({ email }, { sendCode: code }, { new: true });
    if (!user) {
        return res.json({ message: "email not found" });
    }
    await sendemail(email, `Reset Password`, `<h2>The code is ${code}</h2>`);
    return res.json({ message: "success" });
};

export const forgetpassword=async(req,res)=>{
const {email,password,code}=req.body;
const user=await userModel.findOne({email});
if(!user){
    return res.json({massage:"email not found"});
}
if(user.sendCode!=code){
    return res.json({massage:"the code does not match"});
}
user.password=await bcrypt.hash(password,parseInt(process.env.SALTROUND));
user.sendCode=null;
await user.save();
return res.json({massage:"success"});
}