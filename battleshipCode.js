var turn=0;
var target;
var player1TargetArray;
var player2TargetArray;
var xsize = 9;
var ysize = 10;
const battleshipsArray = document.querySelectorAll('.battleships')
const oneXoneShip = document.querySelector('.oneXoneShip')
const twoXoneShip = document.querySelector('.twoXoneShip')
const threeXoneShip = document.querySelector('.threeXoneShip')
const fourXoneShip = document.querySelector('.fourXoneShip')
const fiveXoneShip = document.querySelector('.fiveXoneShip')
const sixXoneShip = document.querySelector('.sixXoneShip')

function hoverOverId(id){
    $("#"+id).css("border-color", "red");
    $("#"+id).css("border-style", "solid");
}

function mouseOutOfBox(id){
    $("#"+id).css("border-color", "#ffffff00");
}

function mouseClick(id){
    var posType = getSpace(id);
    $("#player1Fire").removeClass("btn-danger");
    $("#player2Fire").removeClass("btn-danger");
    if(posType == "empty_player1"){
        console.log("previous target: "+ target);
        // $("#player1Fire").removeClass("btn-secondary");
        $("#player1Fire").addClass("btn-danger");
        if(target != undefined){
            console.log("changing previous space");
            $("#"+target).css("background-color", "#ffffff00");
        }
        console.log("setting target block: "+ id);
        target = id;
        $("#"+id).css("background-color", "red");

    }
    else{
        console.log("previous target: "+ target);
        // $("#player2Fire").removeClass("btn-secondary");
        $("#player2Fire").addClass("btn-danger");
        if(target != undefined){
            console.log("changing previous space");
            $("#"+target).css("background-color", "#ffffff00");
        }
        console.log("setting target block: "+ id);
        target = id;
        $("#"+id).css("background-color", "red");
    }

}

function fireRound(){

}

$(document).ready(function(){

    generatePlayer1Targeting();
    generatePlayer2Targeting();
    generatePlayer1Display();
    //need to fill in the array with a bucnh of "empty" slots so the targeting knows, specifications: hit = red, miss = gray, empty = blue
    // hit is a specified to show that when fired, there was an enemy ship that was hit, miss is just a fire with a miss.
    console.log("ready")
});

function generatePlayer1Targeting(){
    player1TargetArray = new Array(xsize);
    for(var x =0; x<xsize;x++){
        var html = `
        <div id='player1_row`+x+`' class='row' style='padding:px'>
        </div>`
        $("#player1TargetArray").append(html);
        for(var y =0; y<ysize; y++){
            player1TargetArray[y] = new Array(ysize);
            var letter = (y+10).toString(36);
            var innerHTML =`
            <div id='player1_`+x+letter+`' class='selectionBox' onmouseover="hoverOverId('player1_`+x+letter+`')" onmouseout="mouseOutOfBox('player1_`+x+letter+`')" onclick="mouseClick('player1_`+x+letter+`')">

            </div>
            `;
            $("#player1_row"+x).append(innerHTML);
        }
    }
    for(var x =0; x<xsize;x++){
        for(var y =0; y<ysize; y++){
            player1TargetArray[x][y] = "empty_player1";
        }
    }
}
function generatePlayer2Targeting(){
    player2TargetArray = new Array(xsize);
    for(var x =0; x<xsize;x++){
        var html = `
        <div id='player2_row`+x+`' class='row' style='padding:px'>
        </div>`
        $("#player2TargetArray").append(html);
        for(var y =0; y<ysize; y++){
            player2TargetArray[y] = new Array(ysize);
            var letter = (y+10).toString(36);
            var innerHTML =`
            <div id='player2_`+x+letter+`' class='selectionBox' onmouseover="hoverOverId('player2_`+x+letter+`')" onmouseout="mouseOutOfBox('player2_`+x+letter+`')" onclick="mouseClick('player2_`+x+letter+`')">

            </div>
            `;
            $("#player2_row"+x).append(innerHTML);
        }
    }
    for(var x =0; x<xsize;x++){
        for(var y =0; y<ysize; y++){
            player2TargetArray[x][y] = "empty_player2";
        }
    }
}

function generatePlayer1Display(){

}

function generatePlayer2Display(){

}

function getXCoordinate(){

}
function getYCoordinate(){

}
function getSpace(id){
    var player = id.substring(6,7);
    var x = id.substring(8,9);
    var y = id.charCodeAt(9)-97;
    if(player == 1){
        return (player1TargetArray[x][y]);
    }
    else{
        return (player2TargetArray[x][y]);
    }
}

  battleshipsArray.forEach(battleships => battleships.addEventListener('dragstart', dragStart))
  // player1TargetArray.forEach(/**target object**/ => /**target object**/.addEventListener('dragstart', dragStart))
  // player1TargetArray.forEach(/**target object**/ => /**target object**/.addEventListener('dragover', dragOver))
  // player1TargetArray.forEach(/**target object**/ => /**target object**/.addEventListener('dragenter', dragEnter))
  // player1TargetArray.forEach(/**target object**/ => /**target object**/.addEventListener('dragleave', dragLeave))
  // player1TargetArray.forEach(/**target object**/ => /**target object**/.addEventListener('drop', dragDrop))
  // player1TargetArray.forEach(/**target object**/ => /**target object**/.addEventListener('dragend', dragEnd))


let currentShipName
let currentShip

battleshipsArray.forEach(battleships => battleships.addEventListener('mousedown', (e) => {
  //tells us what ship the player is clicking and what tile of the ship
  //ex: if the player is clicking the first tile of the fiveXoneShip it would return fiveXone-0
  currentShipName = e.target.id
}))

function dragStart() {
  currentShip = this
}

function dragOver() {
  console.log('dragOver')
}

function dragEnter() {
  console.log('dragEnter')
}

function dragLeave() {
  console.log('dragLeave')
}

function dragDrop() {
  console.log('dragDrop')
}

function dragEnd() {
  console.log('dragEnd')
}

//needed funcitons->
/*
fire function: takes in and updates array for whatever the target was for the player
there needs to be a placement function for stuff, probably a modal to select settins and such at begining of the game
function to check target array for specific player

images needed->
waves
target
all 6 ships
battleship logo
gray square for miss

*/
