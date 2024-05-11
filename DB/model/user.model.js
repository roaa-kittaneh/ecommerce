import mongoose, { Schema, model } from "mongoose";

const userSchema= new Schema({
    username:{
        required:true,
        type:String,
        
    },
    email:{
        type:String,
        unique:true,

    },
    password:{
        type:String,
        required:true,

    },
    image:{
        type: Object,

    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    confirmemail:{
        type:Boolean,
        default:false,
    },
    gender:{
        type:String,
        enum:['male','famle'],
    },
    status:{
        type:String,
        default:'active',
        enum:['active','notactive'],
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin'],
    },
    sendCode:{
        type:String,
        default:null,
    }

},{
    timestamps:true,
});

const userModel=model('user',userSchema);
export default userModel;