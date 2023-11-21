const axios = require('axios');

async function get(t1,t2){
    const options = {
        method: 'GET',
        url: 'https://text-similarity-calculator.p.rapidapi.com/stringcalculator.php',
        params: {
          ftext: t1,
          stext: t2,
        },
        headers: {
          'X-RapidAPI-Key': '2b15604653mshc98ede3a0be7caap1e9dc3jsn2556e3351d2a',
          'X-RapidAPI-Host': 'text-similarity-calculator.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
         return response.data;
      } catch (error) {
          console.error(error);
      }
      
}

async function compare(gpt,user) {
    let result=[];
    for(let i=0;i<gpt.length;i++) {
result[i]=await get(gpt[i],user[i]);
console.log(result[i]);
    }
    return result;
}
module.exports=compare;