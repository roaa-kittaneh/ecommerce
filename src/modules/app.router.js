import connectDB from '../../DB/conniction.js';
import CategoriesRouter from '../modules/category/category.router.js'
import express  from "express";



const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.json({massage:"wellcom"});
    })
    app.use('/category',CategoriesRouter)

    app.use('*',(req,res)=>{
        return res.json({massage:'page not found'});
    })
};

export default initApp;
