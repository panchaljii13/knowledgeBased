import express from "express";
import { UserSignUp,UserLogin,UpdateUser,UserDelete,GetUserByid } from "../controlers/UserControler.js";

const router = express.Router();

router.post('/signup',UserSignUp);
router.post("/login",UserLogin);
router.put("/update",UpdateUser);
router.delete("/delete",UserDelete);
router.post("/getuserbyid",GetUserByid);

export default router;