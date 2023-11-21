
var elem = document.getElementById("main");
async function openFullscreen() {
if (elem.requestFullscreen) {
elem.requestFullscreen();
} else if (elem.webkitRequestFullscreen) { /* Safari */
elem.webkitRequestFullscreen();
} else if (elem.msRequestFullscreen) { /* IE11 */
elem.msRequestFullscreen();
}}


openFullscreen();
//video window capturing
var camera_stream = null;
var media_recorder = null;
var blobs_recorded = [];
async function start_webcam(){
let video = document.querySelector("#video");
video.muted=true;

    camera_stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
 video.srcObject = camera_stream;
 media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
 media_recorder.start(1000);
//  speechRecognition.start();
 media_recorder.addEventListener('dataavailable', function(e) {
  blobs_recorded.push(e.data);
  });
};


// video
var inter_video=document.getElementById('video');



//timer
function timer(){
let hour=0,minute=1;
let hourclass,minuteclass;

setInterval(()=>{
    if(hour<10) {
        document.getElementsByClassName("hour")[0].innerHTML="0"+hour; 
    }
    else{
        document.getElementsByClassName("hour")[0].innerHTML=hour;
    }
    if(minute<10) {
        document.getElementsByClassName("minute")[0].innerHTML="0"+minute;
    }else{
        document.getElementsByClassName("minute")[0].innerHTML=minute;
    } 
minute++;
if(minute==60) {
minute=0;
hour++;
}
},1000)
}

var question_data;
async function countdown(){
    getquestions();
    openFullscreen();
    let sec=5;
    let start_btn=  document.getElementsByClassName("start-btn")[0];
    start_btn.innerHTML="Please Wait..."
    let wrapper1=  document.getElementsByClassName("wrapper1")[0];
  await  start_webcam();
    let ti=setInterval(() => {
      start_btn.innerHTML=sec;
        console.log(sec)
        sec--;
        if(sec==-1) {
            clearInterval(ti);
start_btn.style.display="none"
wrapper1.style.display="block"
timer();
start_questions();
        }
     if(sec==3) {
        
     }
    }, 1000);

}

//function to start interview questions 
function start_questions(){
 // Start the Speech Recognition
 let l=getlen();
 setTimeout(function()
 { 
  speechRecognition.start(); 
}, (l/10)*1000);
//   clearTimeout(mytime); 
var text;
}

async function getquestions() {
    question_data=await fetch('http://localhost:5000/get-questions',{})
    .then(res=>res.json())
    .then(data=>{
      qlist=data.data;
        console.log(data.data);
    }); 
}

function askfor_download() {
  document.getElementsByClassName("download-video")[0].style.display="block";
}


 var video_local
function download() {
let download=document.getElementById("download-video");
download.href=video_local;
wait_btn();
  console.log("downloaded...")
}

function wait_btn() {
  document.getElementsByClassName("wait-btn")[0].style.display="block";
  
 send_ans_arr();
}
var user_ans=[];
function send_ans_arr(){
  setTimeout(async ()=>{
    let data={
     ans_arr:user_ans,
   }
    await fetch("http://localhost:5000/feedback",{
      method:"POST", 
      body: JSON.stringify(data),
      headers: {'Content-type':'application/json; charset=UTF-8'}
   }).then((value1)=>{
     return value1.json();
   }).then((value2)=>{
         console.log("done")
  })
  window.location.href="http://localhost:5000/result";

  },2000);
}

function Endinterview() {
  document.getElementsByClassName("wrapper1")[0].style.display="none";
   video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/mp4' }));
  media_recorder.stream.getTracks().map(function (val) {
    val.stop();
    });
    askfor_download();
  console.log(video_local);
}

if ("webkitSpeechRecognition" in window) {
   
   var qlist=[];
    // Initialize webkitSpeechRecognition
    var speechRecognition = new webkitSpeechRecognition();
  
    // String for the Final Transcript
    var final_transcript = "";
    var interim_transcript = "";
    var last_ans=""
    var l; var i=0;
    // Set the properties for the Speech Recognition object
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
  
    // Callback Function for the onStart Event 
     speechRecognition.onstart = () => {
      speechendcountdown()

      document.getElementsByClassName("circle1")[0].style.display="block"
      document.getElementsByClassName("circle2")[0].style.display="none"
    };
    speechRecognition.onerror = () => {
      // Hide the Status Element
      document.getElementsByClassName("circle1")[0].style.display="none"
      document.getElementsByClassName("circle2")[0].style.display="none"
    };
    
var t;
    function speechendcountdown() {
      t=setTimeout(()=>{
 
    speechRecognition.stop();
  
      },5000)
    }
     speechRecognition.onend = async () => {
   
        console.log("\nQ."+qlist[i]);
        // console.log("\nAns: "+final_transcript);
        user_ans.push(final_transcript);
        final_transcript="";
        interim_transcript="";
        

        i++;
        if(i==qlist.length) {   
            speechRecognition.stop();
            media_recorder.stop(); 
            Endinterview();
        }else{
 setTimeout(function()
        {
      l=  getlen();
      }, 3000);
      setTimeout(function()
      { 
       speechRecognition.start(); 
      }, 5000*2);
        }
        //code
        
       
      // Hide the Status Element
      document.getElementsByClassName("circle1")[0].style.display="none"
    };
  
    speechRecognition.onresult = (event) => {
      // Create the interim transcript string locally because we don't want it to persist like final transcript
      
  
      // Loop through the results from the speech recognition object.
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
          clearTimeout(t);
          console.log("+++++++")
          speechendcountdown()
          // console.log(final_transcript)
        } else {
          clearTimeout(t);
          interim_transcript += event.results[i][0].transcript;
          // console.log(interim_transcript)
        }
      }
  
      // Set the Final transcript and Interim transcript.
   
      console.log( final_transcript);
   
    };
  
    // Set the onClick property of the start button
  
    // Set the onClick property of the stop button
//     document.querySelector("#stop").onclick = () => {
//       // Stop the Speech Recognition
//       speechRecognition.stop();
//     };
//   } else {
//     console.log("Speech Recognition Not Available");
//   }

  function getVoices() {
  let voices = speechSynthesis.getVoices();
  return voices;
}



function speak(text, voice, rate, pitch, volume) {
  var myVideo = document.getElementById ("int_vid");
  myVideo.play()
  myVideo.muted=true;
    document.getElementsByClassName("question")[0].innerHTML="";
let i=0;

  // create a SpeechSynthesisUtterance to configure the how text to be spoken 
  let speakData = new SpeechSynthesisUtterance();
  speakData.volume = volume; // From 0 to 1
  speakData.rate = rate; // From 0.1 to 10
  speakData.pitch = pitch; // From 0 to 2
  speakData.text = text;
  speakData.lang = 'en';
  speakData.voice = voice;
  // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start 
   speechSynthesis.speak(speakData);
  document.getElementsByClassName("circle2")[0].style.display="block";
  document.getElementsByClassName("circle1")[0].style.display="none";
  if(speechSynthesis.speaking) {
    setInterval(()=>{
      document.getElementsByClassName("question")[0].innerHTML+=text.charAt(i)
   i++;
    },60)
  }
  // typerwrite question
  
}
function getlen(){
 
  
    let voices = getVoices();
    let rate = 1, pitch = 2, volume = 1;
    rate = 0.65; pitch = 50, volume = 1;
     text = qlist[i];
      speak(text, voices[1], rate, pitch, volume );
      
  
  return qlist[i].length;
}
}


/*   
1.c
2.c++
3.java
4.python
5.c#
6.javascript

7.sql/mysql
8.oop
9.computer network
10.operating system
11.nodejs 
12.django

12.mongodb
13.aws
14.cyber security
15.ai/ml
16.data science

17.springboot
18.angular
19.react
20.html
21.css  

22.dbms  
23.salesforce
24.data structure
25.android
*/







