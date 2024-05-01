import { Router } from "express";
import * as controller from './category.controller.js'
import fileupload, { filetype } from "../../utilts/multer.js";
const router=Router();

router.post('/',fileupload(filetype.image).single('image'),controller.create);

export default router;