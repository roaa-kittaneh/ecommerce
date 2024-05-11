import { Router } from "express";
import * as controller from './auth.controller.js';
const router=Router();
router.post('/signup',controller.signup);
router.post('/login',controller.login);
router.patch('/sendcode',controller.sendcode);
router.patch('/forgetpassword',controller.forgetpassword);


export default router;