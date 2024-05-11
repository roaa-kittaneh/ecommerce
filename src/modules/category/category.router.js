import { Router } from "express";
import * as controller from './category.controller.js'
import fileupload, { filetype } from "../../utilts/multer.js";
import { auth } from "../../middleware/auth.js";
const router=Router();

router.post('/',auth(['admin']),fileupload(filetype.image).single('image'),controller.create);
router.get('/',controller.getALL);
router.get('/active',controller.getactive);
router.get('/:id', controller.getDetails);
router.patch('/:id',fileupload(filetype.image).single('image'),controller.Update);
router.delete('/:id',controller.deletee);

export default router;
