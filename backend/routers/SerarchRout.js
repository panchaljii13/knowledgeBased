import express from "express";
import { SearchAll } from "../controlers/SearchControler.js";

const router = express.Router();

router.get('/searchall',SearchAll);

export default router;