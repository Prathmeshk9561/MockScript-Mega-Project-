 const fs=require('fs')
function retrieve(data) {

    data=data.toLowerCase();
    console.log(data);
    let arr=[' c ','c++','java','python','c#','javascript','sql','oop','Java','computer network','operating system','nodejs','django','mongodb','aws','cyber security','artificial intelligence','machine learning','data science','springboot','angular','react','html','css','dbms','salesforce','data structure','android'];
    let result=[];
   let j=0;
    for(let i=0;i<arr.length;i++){
   if(data.includes(arr[i])) {
   result[j]=arr[i].toString();
   j++;
   }
    }
    console.log(result)
    return result;
}
module.exports=retrieve;