
import express from "express"
import cors from "cors"

// const dotenv=require('dotenv');
import { createRequire } from "module";
import {config} from "dotenv";
import OpenAI from 'openai';
import {createReadStream} from "fs"
app.use("/uploads", express.static("uploads"));


const require = createRequire(import.meta.url);
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

config()
const model = "whisper-1"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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',
});


// dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



// const upload = multer({dest:'uploads/'});

// upload mp3 file
app.post('/upload',(req,res)=>{
    console.log(req.body);
  upload(req,res,(err)=>{
    console.log(err)
  })
    res.send('Single file upload');  
    audioFn();
})
app.listen(8000,()=>console.log('Server started at port:8000'));

// *********************************************************


