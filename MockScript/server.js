const express=require('express');
const app=express();
const fs=require('fs');
const multer=require('multer');
const body_parser=require('body-parser');
const connect = require('./mongodb');
const get_que = require('./getquestion');
const pdftotext=require('./resumeparser');
const cors=require('cors');
const chatgpt=require('./chatgpt');
const compare=require('./compare-api');
const retrieve = require('./retrieve_data');

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:true}));
app.use('/static',express.static(__dirname+'/public'));
app.set('view engine','ejs');
app.use(cors());

app.get('/login',(req,res)=>{
   res.render('login')
})

app.get('',(req,res)=>{
    res.render('home');
})

//login post req
app.post('/login',async (req,res)=>{
    console.log(req.body)
   // console.log(req.body);
  let coll=await connect();
  let fdata=await coll.find({email:req.body.email,pass:req.body.pass});
     let data=await fdata.toArray();
     let check_res=await login_check(req.body);
     if(check_res==true) {
        res.send({result:true});
     }else{
        res.send({result:false});
     }
})

async function  login_check(body) {
    let coll=await connect();
    let fdata=await coll.find({email:body.email,pass:body.pass});
   
     let data=await fdata.toArray();
    
     if(data.length>0) {
        
            return true;
        
        
     }else{
        return false;
     }
  
}

async function  signup_check(body) {
    let coll=await connect();
    let fdata=await coll.find({email:body.email});
     let data=await fdata.toArray();
     if(data.length>0) {
        return false;
     }else{
        return true;
     }
}


//sign up post req
app.post('/sign-up',async (req,res)=>{
    
    let check_res=await signup_check(req.body);
    console.log(check_res)
    if(check_res) {
        let coll=await connect();
    coll.insertOne({email:req.body.email,Name:req.body.name,pass:req.body.pass});
        res.send({result:true})
        console.log(req.body);
    }
    else{
        res.send({result:false})
    }
})


app.get('/dashboard',async (req,res)=>{

    console.log(req.query.email)
   //  console.log(req.query.pass)
     let coll=await connect();
     let fdata=await coll.find({email:req.query.email});
      let data=await fdata.toArray();
      let profile=data[0].Name;
      console.log(profile)
    //  let pdfdata= await pdftotext();

   res.render('dashboard',{profile})
})


//method for resume-parsing

const storage=multer.diskStorage({
    destination: function(req,res,callback){
        callback(null,__dirname+"/upload");

    },
    filename: function(req,file,callback){
        callback(null,file.originalname);
    }
})
const uploads=multer({storage:storage});

app.post('/resume-recognize',uploads.array("file"),async (req,res)=>{
 console.log(req.body);
console.log(req.files);
let file_data=(await pdftotext(__dirname+"/upload/user-resume.pdf"));
console.log(file_data);
let arr=[];
 arr= retrieve(file_data);
let final=await get_que(arr);
console.log(final)
q_list=final;
res.send({data:arr});
})
app.get('/interview',(req,res)=>{
    res.render('interview');
});

//send questions 
var q_list=[];
app.get('/get-questions',(req,res)=>{

    res.send({data:q_list});
})

//send feedback
var user_ans=[];
app.post('/feedback',async (req,res)=>{
    console.log(req.body.ans_arr);
   user_ans=req.body.ans_arr;
    res.send({response:"Successful"});
})
app.get('/result',async (req,res)=>{
    res.render('result');
})

app.get('/performance-analysis',async (req,res)=>{

let ans=await chatgpt(q_list);
let comparison=await compare(ans,user_ans);
    res.send({data:comparison,q_list:q_list});
})


app.listen(5000,()=>{
    console.log("Server Started...");
}) 