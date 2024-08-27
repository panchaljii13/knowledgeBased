import express from "express";
import { UserSignUp,UserLogin,UpdateUser,UserDelete,GetArticleUserByid } from "../controlers/UserControler.js";

const router = express.Router();

router.post('/signup',UserSignUp);
router.post("/login",UserLogin);
router.put("/update",UpdateUser);
router.delete("/delete",UserDelete);
router.post("/getuserbyid",GetArticleUserByid);

export default router;