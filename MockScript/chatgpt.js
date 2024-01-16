//require('dotenv').config();
const {Configuration, OpenAIApi}=require('openai');
const configuration=new Configuration({
    apiKey: 'sk-RLp8nsBaQ4tlqYrzg3ZkrIT3BlbkFJ1bct5d482Blauttgw0M2G'
});
const openai=new OpenAIApi(configuration);

async function run(q) {
    const completion=await openai.createCompletion({
       model:"text-davinci-003",
       prompt:q,
       top_p: 1,
       frequency_penalty: 0,
       presence_penalty: 0,
       max_tokens: 1024,
       
        
    });
    console.log("ans:"+completion.data.choices[0].text);
    return completion.data.choices[0].text.trim();
    
}
//run('#include <iostream>int main(){  int a = 8, b = 10; a = a + b;  // a = 18 b = a - b;  // b = 8  a = a - b;  // a = 10  std::cout <"After swapping, a = " << x << " and b = " << b  return 0;})   tell me the errors of this code');


async function test(arr){
  let ans=[];
  //run("you change your answer please dont do that");
  for(let i=0;i<arr.length;i++) {
ans[i]= await run(arr[i]);
ans[i]=ans[i].replace(/\n/g, '');
ans[i]=await ans[i].trim();
}

// console.log(ans);
return ans;

}
// test();

module.exports=test;
//run("question: what is encapsulation?  answer should be collage student standard answer should be in 500 words")
