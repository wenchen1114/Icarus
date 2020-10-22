let doc = document.getElementById("doc");
let text = document.getElementById("doc").value;
let submit = document.getElementById("submit");
let words = text.split(" ");
//console.log(words);

let progress = document.getElementById("progress");
let progressVal = progress.value;

doc.addEventListener('input', function(e){
  console.log("changed");
  progressVal += 0.5;
  progress.value = progressVal;
  let data = {
    val: progressVal,
    newText: document.getElementById("doc").value
  }
  e.preventDefault();
  socket.emit('Icarus add texts', data);
})

setInterval(readytoSubmit, 1000);

function readytoSubmit(){
  if(progress.value > 95){
    document.getElementById("submit").style.visibility = "visible";
  }
}

submit.addEventListener("click", function(){
  let data ={
    text: 'Access denied!!!'
  }
  socket.emit('close', data);
  for(let i =0; i<5; i++){
  alert('Your computer is BLOCKED. The computer detected actions you took which have a potential threat to society.');
  }
  document.getElementById("doc").value = "";
})




var socket = io();

socket.on('button click', (data) =>{
  document.getElementById("doc").value = data.newText;
  document.getElementById("progress").value = data.val;
  progressVal = data.val;
})

socket.on('alert click', (data) =>{
  console.log("received");
  alert(data.alertText);
  document.getElementById("progress").value = data.val;
  progressVal = data.val;
})

socket.on('delete click', (data) =>{
  document.getElementById("doc").value = data.newText;
  document.getElementById("progress").value = data.val;
  progressVal = data.val;
})

socket.on('change click', (data) =>{
  document.getElementById("doc").value = data.newText;
  document.getElementById("progress").value = data.val;
  progressVal = data.val;
})