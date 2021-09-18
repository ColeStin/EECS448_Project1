var turn=0;
var target;
var player1TargetArray;
var player2TargetArray;
var player1DisplayArray;
var player2DisplayArray;
var xsize = 9;
var ysize = 10;
const battleshipsArray = document.querySelectorAll('.battleships')
const oneXoneShip = document.querySelector('.oneXoneShip')
const twoXoneShip = document.querySelector('.twoXoneShip')
const threeXoneShip = document.querySelector('.threeXoneShip')
const fourXoneShip = document.querySelector('.fourXoneShip')
const fiveXoneShip = document.querySelector('.fiveXoneShip')
const sixXoneShip = document.querySelector('.sixXoneShip')
const shipNameArray = ["Patrol", "Assult Ship", "Submarine", "Destroyer", "Battleship", "Aircraft Carrier"];


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

function fireRound(player){
console.log("fired " + player);
$("#player1display_0a").css("background-color", "red")
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
    // for(var x =1; x<xsize*ysize;x++){
    //     var innerHTML =`
    //         <div ">

    //         </div>
    //         `;
    //         $("#player1Display").append(innerHTML);
    // }
    player1DisplayArray = new Array(xsize);
    for(var x =0; x<xsize;x++){
        var html = `
        <div id='player1display_row`+x+`' class='row' >
        </div>`
        $("#player1Display").append(html);
        for(var y =0; y<ysize; y++){
            player1DisplayArray[y] = new Array(ysize);
            var letter = (y+10).toString(36);
            var innerHTML =`
            <div id='player1display_`+x+letter+`' class='dropBoxShip' ondrop="dragDrop(event, 'player1display_`+x+letter+`')" ondragover="dragOver(event)">

            </div>
            `;
            $("#player1display_row"+x).append(innerHTML);
        }
    }
    console.log(player1DisplayArray);
}

//Passes ship type and placeSpace (where the user is attempting to place a ship)
//this function will return true or false as to see if the user can place a ship there
//it will depend on if a ship is already there, or if the ship goes out of bounds
function getValidPlacement(shipType, placeSpace){
    //checks array at location
    var x = getXCoordinate(placeSpace);
    var y = getYCoordinate(placeSpace);
    return true;
}

function generatePlayer2Display(){

}


//will pass an id string, only returns 1 number
function getXCoordinate(id){
    var underscore = id.indexOf("_") +1;
    var x = id.substring(underscore,underscore+1);
    console.log("X: " + x);
    return x;
}
function getYCoordinate(id){
    var underscore = id.indexOf("_") + 2;
    var y = (id.charCodeAt(underscore)-97);
    console.log("Y: " + y);
    return y;

}
function getSpace(id){
    var player = id.substring(6,7);
    var x = getXCoordinate(id);
    var y = getYCoordinate(id);
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
  console.log(currentShipName);
}))

function dragStart(ev) {
  currentShipID = ev.srcElement.id;
  ev.dataTransfer.setData("id", currentShipID);
}

function dragOver(ev) {
    ev.preventDefault();
  //console.log('dragOver')
}

function dragEnter() {
  console.log('dragEnter')
}

function dragLeave() {
  console.log('dragLeave')
}

function dragDrop(ev, id) {
    ev.preventDefault();
    console.log(id);
    var typeOfShip = ev.dataTransfer.getData("id");
    if(getValidPlacement(typeOfShip, id)){
        //make sure to update arrays based on how long length of ship is and such, can hard code or do dynamic if needed
        console.log(typeOfShip);
        ev.target.appendChild(document.getElementById(typeOfShip));
    }
    
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
