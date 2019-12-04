//declare  variables
let openedCards = [];
let moves =0;
let ratingStars=$('i');
let clickes=0;
let time=0;
let clockId;
let finalClock;
let shuffleOne;
CardsList = CardsInitialize();
let alertScreen    = document.querySelector('.bgscreen');
let stars =0;
let score =3;
//-------------------------------------


shuffleOne = shuffle(CardsList);
DisplayCards();
let click=0;
startGame();
function startGame(){
  $(".card").on('click', function(){
    click++;
    if(click ==1){ startTimer();}
    fireMatcher(this);
  });
}

document.querySelector('.restart').addEventListener('click', restart);
function restart(){
  stopClock();
  shuffleOne = shuffle(CardsList);
  DisplayCards();
  click=0;
  moves = 0;
  const RestartTime = document.querySelector('.timer');
  RestartTime.innerHTML='0:00';
  let RestartMoves= document.querySelector('.moves');
  RestartMoves.innerHTML= moves;
    ratingStars.eq(3).addClass('fa-star').removeClass('fa-star-o');
    ratingStars.eq(2).addClass('fa-star').removeClass('fa-star-o');
    ratingStars.eq(1).addClass('fa-star').removeClass('fa-star-o');
    openedCards = [];
  startGame();
}




function CardsInitialize(){
  let domCards=[];
  domCards= document.getElementsByClassName("card");
  return transformer(domCards);
}
// this function for transformation cards
function transformer(obj){
  let maped=[];
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      maped.push(obj[key].innerHTML);
    }
  }
  return maped;
}

function DisplayCards(){
  let list= cardsFactory();
  replacer(list);
}

function replacer(list){
   document.getElementsByClassName("deck")[0].innerHTML=list.innerHTML;
}

function cardsFactory(){
  let list= document.createElement("ul");
  for(let i = 0; i< shuffleOne.length ; i++){
    let li= document.createElement("li");
    li.innerHTML =shuffleOne[i];
    li.classList.add("card");
    list.appendChild(li);
  }
  return list;
}
// this function to  make a card show or open if the card is clicked
function isClicked(card){
  if($(card).hasClass("show") || $(card).hasClass("open")){
    return true;
  }
  return false;
}

function fireMatcher(card){
  if(isClicked(card)){
    return;
  }
  displaySymbol(card);
  markedOpened(card);
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//view the symbol when the user clicked on cards
function displaySymbol(card){
  $(card).addClass("show open");
}

incrementMoves= (card)=>{
  if($(card).hasClass("match") || $(card).is($(openedCards[0]))){
    return false
  }else{
    moves++;
    Rating(moves);
    $('.moves').text(moves);
  }

};

// this function will check if two cards are equal
isMatch = (openedCards)=>{

  let con1 = openedCards[0].innerHTML != openedCards[1].innerHTML;
  let con2 = $(openedCards[0]).is($(openedCards[1]));
  if(con1 || con2){
    return false;
  }
  return true;
};

handleMatchCase = (openedCards)=>{
  MarkAsMatched(openedCards);
};

MarkAsMatched = (openedCards)=>{
  for(let i= openedCards.length -1; i>=0;i--){
    $(openedCards[i]).addClass("match");
  }
};

handleNoMatchCase = (openedCards)=>{

  let currentCards= openedCards;
  setTimeout(function(){
    hideSymbols(currentCards);
  }, 980);

};
// rating method
function Rating(moves){
  // let score =3;
  if(moves<=15){
    ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
    score =3;
  }else if (moves>15 && moves<=22) {
    ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
    score =2;
  }else {
    ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
    score =1;
  }
  return score;
}

hideSymbols = (openedCards)=>{
  for(let i= openedCards.length -1; i >= 0;i--){
    $(openedCards[i]).removeClass("open show");
  }
};

function markedOpened(card){

  if(openedCards.length>0){
    incrementMoves(card);
    //view symbol
    openedCards.push(card);
    //is a card matched?
    if(isMatch(openedCards)){
      handleMatchCase(openedCards);
      openedCards=[];
    } else{
      handleNoMatchCase(openedCards);
      openedCards=[];
    }
  } else{
    openedCards.push(card);
    incrementMoves(card);
  }
  checkMatchedAll();
}



//from http://github.com
function startTimer() {
  time = 0;
  clockId = setInterval(() => {
    time++;
    displayTime();
  }, 1000);
}

function displayTime() {
  const clock = document.querySelector('.timer');
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  clock.innerHTML = time;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  }
  else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
finalClock = clock.innerHTML;
}

function stopClock() {
  clearInterval(clockId);
}

checkMatchedAll =()=>{
  let all = true;
  $('.card').each(function(){
    return all=$(this).hasClass("match");
  });

  if(all){
    stopClock();
    showStatistics();
    finalResult();

  }
};

function showStatistics(){
  //alertScreen.classList.toggle('hide');
  $('#exampleModalCenter').modal('show');
}

function finalStar(){

     if (score == 1) {
      stars = 1;
    }
  else if (score === 2){
    stars = 2;}
    else if (score === 3){
      stars = 3;}
      return stars;
}


function finalResult() {
  let showTime = document.querySelector('.time');
  let showStars = document.querySelector('.starsShow');
  let showMoves = document.querySelector('.movesShow');
  numStar = finalStar();
  showTime.innerHTML = "Time = " + finalClock;
  showStars.innerHTML = "Stars = " + numStar;
  showMoves.innerHTML = "Moves = " + moves;
}

$(".again").on('click', function(){
  restart();

  alertScreen.classList.toggle('hide');
});

$(".cancelGame").on('click', function(){
  alertScreen.classList.toggle('hide');
});
