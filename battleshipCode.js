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


//this function will change the border color of a box in the targeting area
//the mouse is hovering over the box
function hoverOverId(id){
    $("#"+id).css("border-color", "red");
    $("#"+id).css("border-style", "solid");
}

//this function changes the border color if the mouse moves outside of the box
function mouseOutOfBox(id){
    $("#"+id).css("border-color", "#ffffff00");
}

//if the mouse is clicked over a box in the targeting area, this function will take its id
//and see if it is a valid locaiton to target
function mouseClick(id){
    var posType = getSpace(id); //gets the space type, so empty or not valid
    $("#player1Fire").removeClass("btn-danger");
    $("#player2Fire").removeClass("btn-danger");
    if(posType == "empty_player1"){// if the selection is from the player 1 area
        console.log("previous target: "+ target);
        // $("#player1Fire").removeClass("btn-secondary");
        $("#player1Fire").addClass("btn-danger");
        //checks to see if it is the first click (undefined) to make sure it doesnt mess up the previous target id
        if(target != undefined){
            console.log("changing previous space");
            $("#"+target).css("background-color", "#ffffff00");
        }
        console.log("setting target block: "+ id);
        target = id;
        $("#"+id).css("background-color", "red");

    }
    //second except it is for player 2
    else if(posType == "empty_player2"){
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
    //if it is not empty for player1 or 2, then it will not allow for the space to be selected

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


//this is called to generate the player 1 targeting area, so it creates all the divs and boxes that can be interacted with when selecting your next target
function generatePlayer1Targeting(){
    player1TargetArray = new Array(xsize); //creates the new array so that it can be populated and interacted with
    for(var x =0; x<xsize;x++){
        //creates an html area for a row (0 through xsize)
        var html = `
        <div id='player1_row`+x+`' class='row' style='padding:px'>
        </div>`
        $("#player1TargetArray").append(html);
        for(var y =0; y<ysize; y++){
            //creates an array for each row within the main target array, 
            player1TargetArray[y] = new Array(ysize);
            var letter = (y+10).toString(36); //uses letter for secondary number (incase it reaches over 10 with y size)
            //creates a div for a singluar box, and there are y many boxes within a row            
            var innerHTML =`
            <div id='player1_`+x+letter+`' class='selectionBox' onmouseover="hoverOverId('player1_`+x+letter+`')" onmouseout="mouseOutOfBox('player1_`+x+letter+`')" onclick="mouseClick('player1_`+x+letter+`')">

            </div>
            `;
            $("#player1_row"+x).append(innerHTML);
        }
    }
    //populates the player 1 targeting array to interact with and call to to see what spaces are empty and which are not
    for(var x =0; x<xsize;x++){
        for(var y =0; y<ysize; y++){
            player1TargetArray[x][y] = "empty_player1";
        }
    }
}

//this function is a copy of the funciton above and generates targeting for player 2
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

//this funciton will create the display for player 1 to see where thier ships are and where thier opponent has fired and hit/missed
function generatePlayer1Display(){
    // for(var x =1; x<xsize*ysize;x++){
    //     var innerHTML =`
    //         <div ">

    //         </div>
    //         `;
    //         $("#player1Display").append(innerHTML);
    // }
    //creates an array
    player1DisplayArray = new Array(xsize);
    for(var x =0; x<xsize;x++){
        //specifies a row for 
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

function generatePlayer2Display(){

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




//will pass an id string, only returns 1 number
function getXCoordinate(id){
    var underscore = id.indexOf("_") +1;
    var x = id.substring(underscore,underscore+1);
    console.log("X: " + x);
    return x;
}
//will take in an id and return the y coordinate based on where the _ is placed
//will return a number
function getYCoordinate(id){
    var underscore = id.indexOf("_") + 2;
    var y = (id.charCodeAt(underscore)-97);
    console.log("Y: " + y);
    return y;

}

//this returns what type of space is at the specified id
//takes in an id, will return the type of space it is (hit, miss, empty)
// from the players target array
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

//this allows to know what type of ship is being grabbed and dragged so that we can process 
//if the ship is out of bounds or if it has valid placement
battleshipsArray.forEach(battleships => battleships.addEventListener('mousedown', (e) => {
  //tells us what ship the player is clicking and what tile of the ship
  //ex: if the player is clicking the first tile of the fiveXoneShip it would return fiveXone-0
  currentShipName = e.target.id
  console.log(currentShipName);
}))

//when the ship is starting to drag, the ship passes the event to this function and it will send an ID as data transfer when it is dropped
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

//this function will take in an event and an id
//it will process where the ship is at and if it is a valid place to drop the ship.
function dragDrop(ev, id) {
    ev.preventDefault();
    console.log(id);
    var typeOfShip = ev.dataTransfer.getData("id"); //gets type of ship to pass to valid placement function to check and see if it is a valid placement
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
