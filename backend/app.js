import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import UserRoute from './routers/UserRout.js';
import CategoryRoute from "./routers/CategoryRout.js";
import ArticleRoute from "./routers/ArticleRout.js";
import CommentsRout from "./routers/CommentRout.js";
import SearchRout from "./routers/SerarchRout.js";
import path from 'path';
import { fileURLToPath } from 'url';

import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// import { body, validationResult } from 'express-validator';
import "./modle/Index.module.js";

const app = express();

var corOption = {
    origin: 'http://localhost:3000'
}

app.use(cors(corOption));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/user", UserRoute);
app.use("/category", CategoryRoute);
app.use("/article", ArticleRoute);
app.use("/comments", CommentsRout);
app.use("/search",SearchRout);



app.get('/', (req, res) => {
    res.send("heloo world......!");
});
const port = 8080;
app.listen(port, () => {
    console.log("server start...");
});