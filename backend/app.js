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
import "./modle/Index.module.js";
import dotenv from 'dotenv';

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// import { body, validationResult } from 'express-validator';


const app = express();

var corOption = {
    origin:process.env.CORS_OPRETION_ORIGIN
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
const port = process.env.PORT_NUMBER
app.listen(port, () => {
    console.log("server start...");
});