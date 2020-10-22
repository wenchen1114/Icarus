let text = document.getElementById("doc").innerHTML;
let words = text.split(" ");
//console.log(words);

let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");

let progress = document.getElementById("progress");
let progressVal = progress.value;

button1.addEventListener("click", function (e) {
  let randomNum = Math.floor(Math.random() * words.length + 1);
  addNo(randomNum);
  e.preventDefault();
  let data={
    newText: text,
    val: progressVal
  }
  socket.emit('button click', data);
});

button2.addEventListener("click", function(){
  deleteVal(0.5);
  let data = {
    alertText: 'Your post goes against our community guidelines. “Our system flagged your post because it contains suspicious information that may cause the risk of negatively affecting other users. On continuing the action, your account may be deleted and in the worst-case filed with a lawsuit”',
    val: progressVal
  }
  socket.emit('alert click', data);
})

button3.addEventListener("click", function () {
  deleteWord();
  let data={
    newText: text,
    val: progressVal
  }
  socket.emit('delete click', data);
});

button4.addEventListener("click", function () {
  changeWord();
  let data={
    newText: text,
    val: progressVal
  }
  socket.emit('change click', data);
});

function addNo(x) {
  words = text.split(" ");
  if (words[x] == "is" || words[x] == "particularly") {
    words.splice(x+1, 0, "not");
    let newWords = words.join(" ");
    deleteVal(2);
    text = newWords;
    document.getElementById("doc").innerHTML = newWords;
  } else {
    x = Math.floor(Math.random() * words.length + 1);
    addNo(x);
  }
}

function deleteWord() {
  words = text.split(" ");
  let censorWords = [];
  for(let i = 0; i< words.length; i++){
    if(words[i] == "Area" || words[i] == "51," || words[i] == "Alien" || words[i] == "In" || words[i] == "1985"){
      censorWords.push(i);
    }
  };
  console.log(censorWords);
  let randomNum;
  if(censorWords.length !== 0){
  randomNum = Math.floor(Math.random() * censorWords.length);
  words.splice(censorWords[randomNum], 1);
  deleteVal(3);
  }
  censorWords = [];
  let newWords = words.join(" ");
  text = newWords;
  document.getElementById("doc").innerHTML = newWords;
  // if (words[x] == "Area") {
  //   words.splice(x, 1);
  //   let newWords = words.join(" ");
  //   text = newWords;
  //   document.getElementById("doc").innerHTML = newWords;
  // } else {
  //   x = Math.floor(Math.random() * words.length + 1);
  //   return deleteWord(x);
  // }
}

function changeWord(x) {
  let censorWords = [];
  for(let i = 0; i< words.length; i++){
    if(words[i] == "insist" || words[i] == "hid" || words[i] == "fact" || words[i] == "truth" || words[i] == "while" || words[i] == "true" || words[i] == "convince"){
      censorWords.push(i);
      console.log(censorWords);
    }
  };

  let randomNum = Math.floor(Math.random() * censorWords.length);
  if(censorWords.length !== 0){
    if(words[censorWords[randomNum]] == "insist"){
      words[censorWords[randomNum]] = "proved";
      censorWords = [];
      let newWords = words.join(" ");
      text = newWords;
      document.getElementById("doc").innerHTML = newWords;
    }else if(words[censorWords[randomNum]] == "hid"){
      words[censorWords[randomNum]] = "proved";
      censorWords = [];
      let newWords = words.join(" ");
      text = newWords;
      document.getElementById("doc").innerHTML = newWords;
    }else if(words[censorWords[randomNum]] == "fact"){
      words[censorWords[randomNum]] = "rumor";
      censorWords = [];
      let newWords = words.join(" ");
      text = newWords;
      document.getElementById("doc").innerHTML = newWords;
    }else if(words[censorWords[randomNum]] == "truth"){
      words[censorWords[randomNum]] = "lie";
      censorWords = [];
      let newWords = words.join(" ");
      text = newWords;
      document.getElementById("doc").innerHTML = newWords;
    }else if(words[censorWords[randomNum]] == "while"){
      words[censorWords[randomNum]] = "nor did";
      censorWords = [];
      let newWords = words.join(" ");
      text = newWords;
      document.getElementById("doc").innerHTML = newWords;
    }else if(words[censorWords[randomNum]] == "true"){
      words[censorWords[randomNum]] = "faked";
      censorWords = [];
      let newWords = words.join(" ");
      text = newWords;
      document.getElementById("doc").innerHTML = newWords;
    }else if(words[censorWords[randomNum]] == "convince"){
      words[censorWords[randomNum]] = "deceive";
      censorWords = [];
      let newWords = words.join(" ");
      text = newWords;
      document.getElementById("doc").innerHTML = newWords;
    }
    deleteVal(3);
  }
  // if (words[x] !== "" && words[x] !== "No") {
  //   words[x] = words[x].strike();
  //   let newWords = words.join(" "); 
  //   text = newWords;
  //   document.getElementById("doc").innerHTML = newWords;
  // } else {
  //   x = Math.floor(Math.random() * words.length + 1);
  //   changeWord(x);
  // }
}

function deleteVal(x) {
  progressVal -= x;
  progress.value = progressVal;
}

var socket = io();

// button1.addEventListener("click", function (e) {
//   e.preventDefault();
//   socket.emit('button click', text);
// });

socket.on('button click', (txt) =>{
  console.log(txt);
  document.getElementById("doc").innerHTML = txt;
})

socket.on('Icarus add texts', (data) =>{
  console.log('got point');
  progress.value = data.val;
  progressVal = data.val;
  document.getElementById("doc").innerHTML = data.newText;
  text = data.newText;
  words = text.split(" ");
})

socket.on('close', (data)=>{
  alert(data.text);
})
