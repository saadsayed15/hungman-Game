//letters
const letters ="abcdefghijklmnopqrstuvwxyz";
//get array from letters
let letterArray =Array.from(letters);
// console.log(letterArray);

//select letters container
let lettersContainer = document.querySelector(".letters");

//Generate letters
letterArray.forEach(letter=>{
    //create span 
    let span =document.createElement("span");
    //create letter text node
    let theletter = document.createTextNode(letter);
    //Append the letter to span
    span.appendChild(theletter);
    //add class to span
    span.className='letter-box';
    //append span to letters container
    lettersContainer.appendChild(span);
});
//object of words + categories
const words ={
    programming: ["php","javascript","go","scala","fortran","mysql","python"],
    movies: ["prestige","Inception","parasite","Intersellar","Wiplash","memento","coco","up"],
    people: ["Albert Einstein","Hitchcock","Alexander","Cleopatra","Mahatma Ghandi"],
    countries: ["syria","palestine","Yemen","Egypt","Qatar","Bahraine"]
}
// get random property
let allkeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allkeys.length);
let randompropname = allkeys[randomPropNumber];

let randompropvalue =words[randompropname];
let randomvaluenumber =Math.floor(Math.random() *randompropvalue.length);
let randomvaluevalue =randompropvalue[randomvaluenumber];
//set category info 
document.querySelector(".game-info .category span").innerHTML= randompropname;

//select letters guess element
let letterGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to array
let lettarsAndSpace=Array.from(randomvaluevalue);
//create spans depend on word
lettarsAndSpace.forEach(letter =>{
    //create emrty span
    let emptySpan = document.createElement("span");
    //if letter is space 
    if(letter ===' '){
        //add class to the span
        emptySpan.className='with-space';
    }
    letterGuessContainer.appendChild(emptySpan);
});
// select guess span
let guessSpans =document.querySelectorAll(".letters-guess span");
//set wrong attempts
let wrongAttempts=0;
//select the draw element
let theDraw= document.querySelector(".hangman-draw");




// handle clicking on letters
document.addEventListener("click",(e) =>{
    //set the chose status
    let theStatus =false;
    if(e.target.className ==='letter-box'){
        e.target.classList.add("clicked");

        //get clicked letter
        let theClickedLitter=e.target.innerHTML.toLowerCase();
        //the chosen word
        let chosenWord= Array.from(randomvaluevalue.toLowerCase());
        chosenWord.forEach((wordLetter,wordIndex) =>{
            //if the clicked letter equal to one of the chosen word letter

            if(theClickedLitter == wordLetter){
                //set status to correct
                theStatus=true;
                //loop on all guess spans 
                guessSpans.forEach((span,spanIndex) =>{
                    if(wordIndex=== spanIndex){
                        span.innerHTML= theClickedLitter;
                    }
                });
                
            }

        });
        //outside loop
        //if letter is wrong
        if(theStatus!==true){
            //increase wrong attempts
            wrongAttempts++;
            //add class wrong on the draw element
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            //play fail sound
            document.getElementById("fail").play();
            if(wrongAttempts===8){
                endGame();
                lettersContainer.classList.add("finished");
            }

        }
        else{
            // play success sound
            document.getElementById("success").play();
        }

    }
});
//end game function
function endGame(){
    //create popup div
    let div = document.createElement("div");
    let divtext =document.createTextNode(`Game Over, The word is ${randomvaluevalue} `);
    div.appendChild(divtext);
    div.className='popup';
    document.body.appendChild(div);
}