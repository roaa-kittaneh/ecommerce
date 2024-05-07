import connectDB from '../../DB/conniction.js';
import CategoriesRouter from '../modules/category/category.router.js'
import authRouter from '../modules/auth/auth.router.js'

import  cors from 'cors';


const initApp=(app,express)=>{
    connectDB();
    var whitelist = ['http://example1.com', 'http://example2.com']
    var corsOptions = {
        origin: true
      };
    app.use(cors(corsOptions))
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.json({massage:"wellcom"});
    })
    app.use('/category',CategoriesRouter);
    app.use('/auth', authRouter);

    app.use('*',(req,res)=>{
        return res.json({massage:'page not found'});
    })
};

export default initApp;
