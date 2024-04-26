import mongoose from "mongoose";
 const connectDB=async()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("connected DB")
    }).catch((err)=>{
        console.log(`error connection DB ${err}`);
    })
 }
 export default connectDB;