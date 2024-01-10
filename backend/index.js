import express from "express";
import mongoose from "mongoose";
import {PORT,MONGODBURL} from "./config.js";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();

app.use(express.json());

//handle cors
app.use(cors());
app.get('/',(request, response)=>{
    console.log(response);
    return response.status(234).send("Hello Robin");
});

app.use('/books',booksRoute);
mongoose.connect(MONGODBURL)
        .then(()=>{
            console.log("Connected to DB");
            app.listen(PORT,()=>{
                console.log("App running Robin in "+PORT);
            });
        })
        .catch((error)=>{
            console.log(error);
        });


