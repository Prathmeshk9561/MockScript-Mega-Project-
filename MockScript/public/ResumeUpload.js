window.addEventListener("load",()=>{
    const input = document.getElementById("Upload");
    const filewrapper = document.getElementById("filewrapper");
    input.addEventListener("change",(e)=>{
        let filename = e.target.files[0].name;
        let filetype = e.target.value.split(".").pop();
        fileshow(filename,filetype);
        show_upload_btn();

    })
    const fileshow=(filename,filetype)=>{
        const showfileboxelem = document.createElement("div");
        showfileboxelem.classList.add("showfilebox");
        const leftelem = document.createElement("div");
        leftelem.classList.add("left");
        const filetypeElem = document.createElement("span");
        filetypeElem.classList.add("filetype");
        filetypeElem.innerHTML=filetype;
        leftelem.append(filetypeElem);
        // filetypeElem.append(leftelem);
        const filetitleElem = document.createElement("h3");
        filetitleElem.innerHTML=filename;
        leftelem.append(filetitleElem)
        showfileboxelem.append(leftelem);
        const rightElem =document.createElement("div");
        rightElem.classList.add("right");
        showfileboxelem.append(rightElem);
        const crossElem = document.createElement("span");
        crossElem.innerHTML="&#215;";
        rightElem.append(crossElem);
        filewrapper.append(showfileboxelem);

        crossElem.addEventListener("click",()=>{
            filewrapper.removeChild(showfileboxelem);
        })
    } 
})

//function for fetch api send pdf to server
async function send_file() {
    const file=document.getElementsByClassName("pdf")[0];
   document.getElementById("spinner").style.display="block"
document.getElementsByClassName("upload-inner-btn")[0].style.display="none";

    const formdata=new FormData();
    formdata.append("file",file.files[0],"user-resume.pdf");

    console.log(...formdata);
    
    let data=fetch('http://localhost:5000/resume-recognize',{
        method:"POST",
        body:formdata
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data.data)
        document.getElementById("spinner").style.display="none"
        show_skill_header()
        addskills(data.data);
    });

}

function show_upload_btn(){ 
    document.getElementById("filewrapper").style.display="block"
    document.getElementsByClassName("upload-inner-btn")[0].style.display="block";
} 

function addskills(data) {
    for(let i=0;i<data.length;i++) {
        var element = document.createElement("h3");
        element.appendChild(document.createTextNode(data[i].toUpperCase())); 
        element.classList.add("skill");
        document.getElementsByClassName('skill-box')[0].appendChild(element);
    }
    window.location.href="#jump-skill-box"
}

function logout_confirmation() {
    let response=confirm("Are you sure?");
    if(response) {
        window.location.href="http://localhost:5000/";
    }
}

function show_skill_header() {
    document.getElementsByClassName("footer-btn")[0].style.display="block"  
    document.getElementsByClassName("skill-header")[0].style.display="block"
}


function getquestions() {
let footer_btn=document.getElementsByClassName("continue-btn")[0].innerHTML="Please Wait..."

setTimeout(()=>{
    window.location.href="http://localhost:5000/interview";
},2000)
}