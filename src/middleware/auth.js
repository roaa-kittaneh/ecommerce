import jwt from 'jsonwebtoken';
import userModel from '../../DB/model/user.model.js';

export const auth=()=>{
   return  async(req,res,next)=>{
        const {authorization}=req.headers;
        if(!authorization.startsWith(process.env.BEARERTOKEN)){
            return res.json({ message: "Invalid token1" });
        }
       const token=authorization.split(process.env.BEARERTOKEN)[1];
       
        const decoded = await jwt.verify(token, process.env.LOGINSIG);
        const authUser=await userModel.findById(decoded.id).select('username');
        req.user=authUser;
          next();
          
}
}
