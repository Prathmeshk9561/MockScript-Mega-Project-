

// for progress bar

get_data();
//get data
async function get_data(){
    let performace_data=await fetch("http://localhost:5000/performance-analysis",{})
    .then(res=>res.json())
    .then(data=>{
    //   qlist=data.data;
   
        return data;
    }); 
    add_data(performace_data);


}
  
async function add_data(data){
    
   document.getElementsByClassName("wrapper1")[0].style.display="none";
  document.getElementsByClassName("main2")[0].style.display="block"
  document.getElementsByClassName("main3")[0].style.display="block"
document.getElementsByClassName("space")[0].style.display="block"

 
//   let accurancy=0,length,c=0;;
// for(let i=0;i<data.data.length;i++) {
//     if(data.data[i].stext!=""){
//         accurancy=accurancy+data.data[i].percentage;
//     length=length+data.data[i].stext.length;
//     c++;
//     }
// }

// accurancy=accurancy/c;
// length=length/c;
// console.log(accurancy  +" \n" +length+" "+c)

// let qbar=document.getElementsByClassName("bar")[0];
// qbar.setAttribute("data-value",accurancy)
// qbar.setAttribute("data-text",accurancy)


// let lbar=document.getElementsByClassName("bar")[1];
// qbar.setAttribute("data-value",length)
// qbar.setAttribute("data-text",length)


// let abar=document.getElementsByClassName("bar")[2];
// qbar.setAttribute("data-value",c)
// qbar.setAttribute("data-text",c)

async function set_pb_value(){
    let bar = document.querySelectorAll('.bar');
    let arr=[accurancy,(length*100)/500,attempt];
    let i=0;
    bar.forEach((progress) => {
         let value = arr[i];
         i++;
        progress.style.width = `${value}%`;
        let count = 0;
        let progressAnimation = setInterval(() => {
            count++;
            progress.setAttribute('data-text', `${count}%`);
            if (count >= value) {
                clearInterval(progressAnimation);
            }
        }, 15);
    });


}
   
    // document.getElementsByClassName("bar")[0]

// console.log(data.data)
// console.log(data.data[0].ftext);
// console.log(data.data[1].ftext);
// console.log(data.data[2].ftext);

var main_box,length=0,attempt=0,accurancy=0;
for(let i=0;i<data.data.length;i++) {
console.log(data.data[i].percentage);
     main_box=document.createElement("div");
    main_box.className="data";
    let qhead=document.createElement("h3");
    let qtext=document.createElement("p");


    
    
        if(data.data[i].stext!='') {
            attempt++;
            length=length+data.data[i].stext.length;
            accurancy=accurancy+Number (data.data[i].percentage);
        }
        if((i+1)==data.data.length) {
            length=length/attempt;
            accurancy=accurancy/attempt;
            length=parseInt(length);
            accurancy=parseInt(accurancy);
            attempt=attempt*10;
            console.log("Att:"+attempt+"\nlength:"+length+"\naccur:"+accurancy);
            set_pb_value();
        }

    
    let question_box=document.createElement("div");
    question_box.className="data_item";
    qhead.innerText="Question "+(i+1);
    qtext.innerText= data.q_list[i];
    question_box.appendChild(qhead);
    question_box.appendChild(qtext);
    main_box.appendChild(question_box);
    
    
    let ans1_box=document.createElement("div");
    let yhead=document.createElement("h3");
    let ytext=document.createElement("p");
    ans1_box.className="data_item";
    yhead.innerText="Your Answer";
    ytext.innerText=data.data[i].stext;
    
    ans1_box.appendChild(yhead);
    ans1_box.appendChild(ytext);
    main_box.appendChild(ans1_box);
    
    let ans2_box=document.createElement("div");
    let ohead=document.createElement("h3");
    let otext=document.createElement("p");
    ans2_box.className="data_item";
    ohead.innerText=" Answer we got";
    otext.innerText=data.data[i].ftext;
    ans2_box.appendChild(ohead);
    ans2_box.appendChild(otext);
    main_box.appendChild(ans2_box);
    
    document.getElementsByClassName("main3")[0].appendChild(main_box);
}


}

