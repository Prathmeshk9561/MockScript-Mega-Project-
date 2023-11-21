let email= document.getElementsByClassName("email")[0];
let pass=document.getElementsByClassName("pass")[0];

function login() {
let spinner=document.getElementById("spinner");
spinner.hidden=false;
  console.log("viraj")
    let email= document.getElementsByClassName("email")[0].value;
    let pass=document.getElementsByClassName("pass")[0].value;
    let data={
       email: email,
       pass:pass
    }
    let p=fetch("http://localhost:5000/login",{
       method:"post", 
       body: JSON.stringify(data),
       headers: {'Content-type':'application/json; charset=UTF-8'}
       
    })
    p.then((value1)=>{
      return value1.json();
    }).then((value2)=>{  
     console.log(value2.result)
     if(value2.result==true) {
      setTimeout(() => {
        console.log(value2.result)
        document.getElementsByClassName("link")[0].innerHTML="Login Succesfully";
       // window.open("http://localhost:5000/dashboard?email="+email+"&pass="+pass);
 window.location.href="http://localhost:5000/dashboard?email="+email;
     spinner.hidden=true;
      }, 3000);
      
    }else{
      spinner.hidden=true;
       console.log(value2.result)
       document.getElementsByClassName("link")[0].innerHTML="Invalid details";
     }
    })
   }

  async function signup(){
    let spinner=document.getElementById("spinner");
spinner.hidden=false;
    let email=document.getElementsByClassName("sign-email")[0].value;
    let name=document.getElementsByClassName("sign-name")[0].value;
    let pass=document.getElementsByClassName("sign-pass")[0].value;
    let data={
      email: email,
      pass:pass,
      name:name
   }
   let p=fetch("http://localhost:5000/sign-up",{
    method:"post", 
    body: JSON.stringify(data),
    headers: {'Content-type':'application/json; charset=UTF-8'}
 })
 p.then((value1)=>{
   return value1.json();
 }).then((value2)=>{
  console.log(value2.result)
  if(value2.result==true) {
    spinner.hidden=true;
    console.log(value2.result)
   document.getElementsByClassName("sign-link")[0].innerHTML="Account created Succesfully";
   // window.open("http://localhost:5000/login")
    window.location.href("http://localhost:5000/login")
    
  }else{
    spinner.hidden=true;
    console.log(value2.result)
    document.getElementsByClassName("sign-link")[0].innerHTML="Account already exist !!!";
  }
    console.log(email+" "+name+" "+pass)
})
}  


function removeline() {
document.getElementsByClassName('sign-link')[0].innerHTML='';
document.getElementsByClassName('link')[0].innerHTML='';
}
