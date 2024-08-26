import express from "express";
import { AddCategory,UpdateCategory,DeleteCategory,viewallCategory } from "../controlers/CategoryControler.js";

const router = express.Router();

router.post('/add',AddCategory);
router.put('/update',UpdateCategory);
router.delete("/delete",DeleteCategory);
router.get("/view",viewallCategory);

export default router;