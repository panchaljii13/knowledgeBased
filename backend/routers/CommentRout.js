import express from "express";
import { AddFeedback,UpdateFeedback,DeleteFeedback,viewallFeedback } from "../controlers/CommentControler.js";

const router = express.Router();

router.post('/add',AddFeedback);
router.put('/update',UpdateFeedback);
router.delete("/delete",DeleteFeedback);
router.post("/view",viewallFeedback);

export default router;