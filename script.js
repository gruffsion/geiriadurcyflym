let dictionary = [];
let simpleDictionary = [];
let wordList = document.getElementById("wordlist");
let result = document.getElementById("result");
let resultsArray = [];


function updateListSelection(liID) {
  var list = document.getElementById("wordlist"),
      targetLi = document.getElementById(liID); // id tag of the <li> element
  list.scrollTop = (
    targetLi.offsetTop - 167);
};


function getTextInput() { 
  let string = document.getElementById("search").value;
  let resultString = '';
  if (string.length <=1){
    document.getElementById("result").innerHTML = ""
  }
  for (let i = 0; i < string.length; i++) {
    if (string[i] === string[i].toUpperCase()) {
      resultString += string[i].toLowerCase();
    } else {
      resultString += string[i];
    }
    search(resultString);
  }
}


function search(input){
  let result = document.getElementById("result");
    for (i=0; i<simpleDictionary.length; i++){ 
        if(simpleDictionary[i].surface === input) {
          
        result.innerHTML = simpleDictionary[i].enlemma;
        x = simpleDictionary[i].id;
        updateListSelection(x)
        result.hasWelshResult = true;
        }
        else {
          if (simpleDictionary[i].enlemma === input){
            simpleDictionary[i].enlemma = simpleDictionary[i].enlemma.replace(/_/g, ' ');
          result.innerHTML = simpleDictionary[i].surface;
          //x = simpleDictionary[i].id;
          //result.hasEnglishResult = true;
          }
          
        }
    }
}


function addEventListenerToUL(){
    var ul = document.getElementById('ul');  // The user list element
ul.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI'){
    for (i=0; i<simpleDictionary.length; i++){
    if (e.target.innerText == simpleDictionary[i].surface){
        result.innerHTML = simpleDictionary[i].enlemma;
    }
    }
    }
    
});
}

function alphabeticalOrder(objArray){
//place words in alphabetical order
    objArray.sort(function(a, b){
      if(a.surface < b.surface) { return -1; }
      if(a.surface > b.surface) { return 1; }
      return 0;
    });
    for (i=0;i < dictionary.length; i++){
      j = i-1; //remove duplicate words
      if (j > 0){
      if (dictionary[i].surface == dictionary[j].surface){
      }
      else { //create dictionary with no duplicates or alt versions of words
        //check if surface = lemma, or if word is plural and starts with different character          
        if (dictionary[i].surface == dictionary[i].lemma || dictionary[i].surface[0] !== dictionary[i].lemma[0] && dictionary[i].number == 'pl')
        {   
          
          //remove uppercase
            dictionary[i].surface = dictionary[i].surface.toLowerCase();
       
            dictionary[i].surface = dictionary[i].surface.replace(/_/g, ' ');
            //dictionary[i].enlemma = dictionary[i].enlemma.replace(/_/g, ' ');
         
            simpleDictionary.push(dictionary[i]);    
            let li = document.createElement("li");
            li.appendChild(document.createTextNode(dictionary[i].surface))
            li.id = dictionary[i].id;
            wordList.appendChild(li);  
       
           }}
      }
      
      
    }
    updateListSelection(207147); //set first word to abacws
  }


function callBack(json){
    let data = json.words;
    for (i=0; i<data.length; i++){
        dictionary.push(data[i]);
    }
    alphabeticalOrder(dictionary);
  }; 


  //calls the data from json file
  function getData(cb){
    fetch("geiriadur.json")
      .then(response => response.json())
      .then(json => cb(json[0]))
    }


    window.onload = getData(callBack);
    addEventListenerToUL();
