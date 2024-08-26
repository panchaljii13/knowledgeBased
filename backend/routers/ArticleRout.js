import express from "express";
import { AddArticle,UpdateArticle,DeleteArticle,viewallArticle } from "../controlers/ArticleControler.js";
import upload from "../Multer/Config.multer.js";

const router = express.Router();

router.post('/add', upload.array('AddImages', 5), AddArticle); // 'AddImages' is the field name, and 5 is the maximum number of files
// router.post('/add',AddArticle);
router.put('/update',UpdateArticle);
router.delete("/delete",DeleteArticle);
router.get("/view",viewallArticle);


export default router;