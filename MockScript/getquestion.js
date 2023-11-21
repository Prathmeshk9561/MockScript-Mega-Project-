const {MongoClient, Int32}=require('mongodb');
const url='mongodb://127.0.0.1:27017';
const client=new MongoClient(url);


 async function get_que(skill_arr) {

//     let result=await client.connect();
//    var database= result.db('project');
//     let coll=database.collection('question_bank');
//     let per_skill;
//     (per_skill)=parseInt((4/skill_arr.length), 4);
    
// // console.log(await coll.find({}).toArray());
//     let que_fre=[];
//     for(let i=0;i<skill_arr.length;i++) {
//         que_fre[i]=per_skill;
//     }
//     for(let i=0;i<4-per_skill*skill_arr.length;i++) {
//           que_fre[i]++;
//     }

//     let temp_list=[];
//     let final_list=[];
//     for(let i=0;i<skill_arr.length;i++) {

//       let skill_name=skill_arr[i];
//       let questions=[];
//       questions=await coll.find({skill:skill_name}).toArray();
//     if(questions.length==0) {
//       continue;
//     }
//       for(let j=0;j<que_fre[i];j++) {
//         while(true){
//         let n=Math.floor(Math.random() * (questions[0].questions.length-0)) +0;
//         if(!temp_list.includes(questions[0].questions[n])) {
//           if(!questions[0].questions[n].includes("?")) {
//             questions[0].questions[n]=questions[0].questions[n]+" ?";
//           }
       
// temp_list.push(questions[0].questions[n]);
// break;
//         }}
//       }
//       // final_list.push();
//       console.log(temp_list)
//     }

    let temp=['What are the type of Constructor ?','Tell me types of inheritance in java.','What is firewall in Computer Network ?','What is EC2 service in AWS ?'];


    return temp;



















    // console.log(que_fre);

//     let s='java'
//   let fdata=await coll.find({skill:s});
//   let data=await fdata.toArray();
//   console.log(data[0].questions);
}


module.exports=get_que;