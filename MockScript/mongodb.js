const { name } = require('ejs');
const {MongoClient}=require('mongodb');
const url='mongodb://127.0.0.1:27017';
const client=new MongoClient(url);

async function connection(email,pass) {

    let result=await client.connect();
   var database= result.db('project');
    let coll=database.collection('user');
//    let fdata=await coll.find({Name:name,email:email});
//    let data=await fdata.toArray();
return coll;
}
module.exports=connection;

