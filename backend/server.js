
import express from "express"
import cors from "cors"

// const dotenv=require('dotenv');
import { createRequire } from "module";
import {config} from "dotenv";
import OpenAI from 'openai';
import {createReadStream} from "fs"

const require = createRequire(import.meta.url);

const multer = require('multer')

config()
const model = "whisper-1"
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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',
});


// dotenv.config();
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())



const upload = multer({dest:'uploads/'});

// upload mp3 file
app.post('/upload',upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.send('Single file upload');  
})
app.listen(3000,()=>console.log('Server started at port:3000'));

// *********************************************************






audioFn();



// Whisper api
async function audioFn(){
    const transcription = await openai.audio.transcriptions.create({
    file : createReadStream("backend/audio.m4a"),
    model : model,
    language:"en",
    temperature:0.2
  })
 
  
  
  //askQuestion returns a promise
  let answer = askQuestion(transcription.text + "imagine yourself as the best medical scriber in the world.Now you should creat a medical report with the following Sections. Objectives,introduction,patient history,assessment of current diagnosis(if provided only),treatment methadology,prognosis,closing.The above sections should be an object with key as section and values as respective section values");
  //findAnswer take in a promise and resolve the promise
  findAnswer(answer);
  
  }

function askQuestion(question){
     // returns a promise
    let pr = openai.chat.completions.create({
        messages: [{ role: 'user', content: question }],
        model: 'gpt-4',
    })

    return pr 
  }

  function findAnswer(promise){
    
    promise.then((data)=>{
       
      let res =  data.choices[0].message.content;
      console.log(res);
      
          
      })
      .catch((err) =>{
        console.log("Oops Something went wrong");
        console.log(err);
      })
  }

 
