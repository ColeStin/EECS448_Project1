var turn=1;
var target;
var player1TargetArray;
var player2TargetArray;
var player1DisplayArray;
var player2DisplayArray;
var isPlacedArray;
var xsize = 9;
var ysize = 10;
var isRotated = false;
var numberOfShips;
const battleshipsArray = document.querySelectorAll('.battleships')
const oneXoneShip = document.querySelector('.oneXoneShip')
const twoXoneShip = document.querySelector('.twoXoneShip')
const threeXoneShip = document.querySelector('.threeXoneShip')
const fourXoneShip = document.querySelector('.fourXoneShip')
const fiveXoneShip = document.querySelector('.fiveXoneShip')
const sixXoneShip = document.querySelector('.sixXoneShip')
const shipNameArray = ["Patrol", "Assault", "Sub", "Destroy", "Battle", "Carrier"];
var player1ShipsMoved = [];
var player2ShipsMoved = [];
/**var shipsSunk = {
"Patrol": false,
"Assault": false,
"Sub": false,
"Destroy": false,
"Battle": false,
"Carrier": false}**/
var shipsSankArray;





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
    $("#player1Fire").prop('disabled', false);
    $("#player2Fire").prop('disabled', false);
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
        $("#"+id).css("background-color", "orange");

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
        $("#"+id).css("background-color", "orange");
    }
    //if it is not empty for player1 or 2, then it will not allow for the space to be selected

}

$("#numberOfShips").change(function(){
    numberOfShips = parseInt($('#numberOfShips option:selected').val());
    console.log("Number of Ships: "+ numberOfShips);
    for(i=0;i<6;i++)
    {
        if(i<numberOfShips){
            //make ship area visible
            $("#"+shipNameArray[i]+"Area1").removeClass("d-none");
            $("#"+shipNameArray[i]+"Area2").removeClass("d-none");
        }
        else{
            $("#"+shipNameArray[i]+"Area1").addClass("d-none");
            $("#"+shipNameArray[i]+"Area2").addClass("d-none");
        }
    }
    $("#startGame").removeClass("d-none");
});

function startGame(){
    $("#playArea").removeClass('d-none');
    $("#startingSection").addClass('d-none');
    $("#player1Area").removeClass('d-none');

}

function checkPlayer1Pieces(){
    if(player1ShipsMoved.length == (numberOfShips)){
        $("#player1FinishStart").prop("disabled", false);
    }
}

function checkPlayer2Pieces(){
    if(player2ShipsMoved.length == (numberOfShips)){
        $("#player2FinishStart").prop("disabled", false);
    }
}

function betweenTurns(){
    setTimeout(function(){
        $("#player1Area").addClass("d-none");
        $("#player2Area").addClass("d-none");
        $("#startNextTurn").removeClass('d-none');
    }, 2000)

}

function startNextTurn(){
    $("#startNextTurn").removeClass('d-none');
    if(turn%2 == 1){
        player1Turn();
    }
    else{
        player2Turn();
    }

}

function endPlayer1StartPhase(){
    $("#player1pieces").addClass('d-none');
    $("#player1FinishStart").addClass("d-none");
    $("#player1Finish").removeClass('d-none');
    $("#player1Area").addClass('d-none');
    $("#player2Area").removeClass('d-none');
}

function endPlayer2StartPhase(){
    $("#player2pieces").addClass('d-none');
    $("#player2FinishStart").addClass("d-none");
    $("#player2Finish").removeClass('d-none');
    betweenTurns();

}


function player1Turn(){
    //shows the player 1 board and resets values for disabled buttons and such
    $("#player1Finish").prop("disabled", true);
    $("#player2Area").addClass('d-none');
    $("#player1Area").removeClass('d-none');
    $("#player1Fire").prop("disabled", true);
    $("#player1Fire").removeClass("d-none");
    $("#player1TargetBox").removeClass("d-none");
    $("#player1Fire").prop("disabled", true);

}

function player2Turn(){
//shows player2 board and resets values for disabled buttons and such
    $("#player2Finish").prop("disabled", true);
    $("#player1Area").addClass('d-none');
    $("#player2Area").removeClass('d-none');
    $("#player2Fire").prop("disabled", true);
    $("#player2Fire").removeClass("d-none");
    $("#player2TargetBox").removeClass("d-none");
    $("#player2Fire").prop("disabled", true);
}


function fireRound(player){
    //disables both fire buttons so that the players cannot fire twice within a turn
    $("#player1Fire").prop('disabled', true);
    $("#player2Fire").prop('disabled', true);
    //ensures a player can't fire when it is not their turn
    if(player!=turn||target==undefined){
        return;
    }
    //Gives string for Display Array and coordinates
    let displayLocation;
    if(player == 1){
        displayLocation = target.substring(0,6) + "2display" + target.substring(7);
    }
    else if(player == 2){
        displayLocation = target.substring(0,6) + "1display" + target.substring(7);
    }
    //Adjusts display and target array depending on hit or not
    if(turn==1){
        if(player2DisplayArray[getXCoordinate(target)][getYCoordinate(target)]=="Empty"){
            $("#"+displayLocation).css("background-color", "grey")
            $("#"+target).css("background-color", "grey")
            player2DisplayArray[getXCoordinate(target)][getYCoordinate(target)] = "Miss"
            player1TargetArray[getXCoordinate(target)][getYCoordinate(target)] = "Miss"
        }
        else{
            $("#"+displayLocation).css("background-color", "red")
            $("#"+target).css("background-color", "red")
            player2DisplayArray[getXCoordinate(target)][getYCoordinate(target)] = "Hit"
            player1TargetArray[getXCoordinate(target)][getYCoordinate(target)] = "Hit"
        }
        target = undefined;
        $("#player1Finish").prop("disabled", false);
    }
    else{
        if(player1DisplayArray[getXCoordinate(target)][getYCoordinate(target)]=="Empty"){
            $("#"+displayLocation).css("background-color", "grey")
            $("#"+target).css("background-color", "grey")
            player1DisplayArray[getXCoordinate(target)][getYCoordinate(target)] = "Miss"
            player2TargetArray[getXCoordinate(target)][getYCoordinate(target)] = "Miss"
        }
        else{
            $("#"+displayLocation).css("background-color", "red")
            $("#"+target).css("background-color", "red")
            player1DisplayArray[getXCoordinate(target)][getYCoordinate(target)] = "Hit"
            player2TargetArray[getXCoordinate(target)][getYCoordinate(target)] = "Hit"
        }
        target = undefined;
        $("#player2Finish").prop("disabled", false);
    }
    if(checkWin(player)){
        //Handle win condition
        alert("PLAYER " + player + " WON!")
        console.log(player + " won");
    }
    checkShipSank()
    //Switches turns after a successful fire
    switch (turn) {
        case 1:
            turn = 2;
            break;
        case 2:
            turn = 1;
            break;
    }
    //need to make end turn enabled
    console.log("fired " + player);
}

function checkWin(player){
    let flag = true;
    if(player==1){
        for(let x = 0;x<xsize;x++){
            for(let y = 0;y<ysize;y++){
                if(!(player2DisplayArray[x][y]=="Hit"||player2DisplayArray[x][y]=="Miss"||player2DisplayArray[x][y]=="Empty")){
                    flag = false;
                }
            }
        }
    }
    else{
        for(let x = 0;x<xsize;x++){
            for(let y = 0;y<ysize;y++){
                if(!(player1DisplayArray[x][y]=="Hit"||player1DisplayArray[x][y]=="Miss"||player1DisplayArray[x][y]=="Empty")){
                    flag = false;
                }
            }
        }
    }
    return(flag);
}

$(document).ready(function(){

    generatePlayer1Targeting();
    generatePlayer2Targeting();
    generatePlayer1Display();
    generatePlayer2Display();
    $("#playArea").addClass("d-none");
    $("#startGame").addClass("d-none");
    $("#player1Area").addClass('d-none');
    $("#player2Area").addClass('d-none');
    $("#player1TargetBox").addClass("d-none");
    $("#player2TargetBox").addClass('d-none');
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
            player1TargetArray[x] = new Array(ysize);
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
            player2TargetArray[x] = new Array(ysize);
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
            player1DisplayArray[x] = new Array(ysize);
            var letter = (y+10).toString(36);
            var innerHTML =`
            <div id='player1display_`+x+letter+`' class='dropBoxShip' ondrop="dragDrop(event, 'player1display_`+x+letter+`')" ondragover="dragOver(event)">
            </div>
            `;
            $("#player1display_row"+x).append(innerHTML);
        }
    }
    for(var x =0; x<xsize;x++){
        for(var y =0; y<ysize; y++){
            player1DisplayArray[x][y] = "Empty";
        }
    }
    console.log(player1DisplayArray);
}

function generatePlayer2Display(){
    player2DisplayArray = new Array(xsize);
    for(var x =0; x<xsize;x++){
        //specifies a row for
        var html = `
        <div id='player2display_row`+x+`' class='row' >
        </div>`
        $("#player2Display").append(html);
        console.log("append row");
        for(var y =0; y<ysize; y++){
            player2DisplayArray[x] = new Array(ysize);
            var letter = (y+10).toString(36);
            var innerHTML =`
            <div id='player2display_`+x+letter+`' class='dropBoxShip' ondrop="dragDrop(event, 'player2display_`+x+letter+`')" ondragover="dragOver(event)">
            </div>
            `;
            $("#player2display_row"+x).append(innerHTML);
        }
    }
    for(var x =0; x<xsize;x++){
        for(var y =0; y<ysize; y++){
            player2DisplayArray[x][y] = "Empty";
        }
    }
    console.log(player2DisplayArray);

}

//Passes ship type and placeSpace (where the user is attempting to place a ship)
//this function will return true or false as to see if the user can place a ship there
//it will depend on if a ship is already there, or if the ship goes out of bounds
function getValidPlacement(shipType, placeSpace){
    //checks array at location
    console.log(shipType);
    var x = getXCoordinate(placeSpace);
    var y = getYCoordinate(placeSpace);
    console.log(shipType.substring(1));
    var shiplength;
    switch(shipType.substring(1)){
        case "Patrol":
            shiplength = 1;
            break;
        case "Assault":
            //need to check orentation, just swap x and y in that case
            shiplength = 2;
            break;
        case "Sub":
            shiplength = 3;
            break;
        case "Destroy":
            shiplength = 4;
            break;
        case "Battle":
            shiplength = 5;
            break;
        case "Carrier":
            shiplength = 6;
            break;
        default:
            shiplength = 0;
    }
    if(shiplength<=ysize-1){
        console.log('here')
        for(i = 0; i<= getShipLength(shipType.substring(1)); i++){
            console.log("loop");
            console.log("X: "+x)
            console.log("Y: "+y)
            if( shipType.substring(0,1) == 1){
                if(!isRotated){//get orintation and switch stuff
                    if(player1DisplayArray[x][y+i] != "Empty")
                     {
                         console.log("IS NOT EMPTY");
                         return false;
                     }
                }
                else{
                    console.log(typeof x+i)
                    if(player1DisplayArray[x+i][y] != "Empty")
                     {
                         return false;
                     }
                }
            }
            else{
                if(!isRotated){//get orintation and switch stuff
                    if(player2DisplayArray[x][y+i] != "Empty")
                     {
                         console.log("IS NOT EMPTY");
                         return false;
                     }
                }
                else{
                    if(player2DisplayArray[x+i][y] != "Empty")
                     {
                         return false;
                     }
                }
            }

        }
        return true;
    }
    else{
        return false;
    }

}




//will pass an id string, only returns 1 number
function getXCoordinate(id){
    var underscore = id.indexOf("_") +1;
    var x = id.substring(underscore,underscore+1);
    return parseInt(x);
}
//will take in an id and return the y coordinate based on where the _ is placed
//will return a number
function getYCoordinate(id){
    var underscore = id.indexOf("_") + 2;
    var y = (id.charCodeAt(underscore)-97);
    return parseInt(y);

}
//returns length of ship based on what the id is from the actual block of ship
function getShipLength(name){
    return shipNameArray.indexOf(name);
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

function player1ShipsAreaEmpty(){

}

function player1ShipsAreaEmpty(){

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
  for(i=0;i<12;i++){
    if(isPlacedDict[currentShipID] == 0){
      ev.dataTransfer.setData("id", currentShipID);
    }
  }
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

//assigns not placed value (0) for all spaces in isPlacedArray, placed value will be 1
//in this array each space corresponds to a different ship, starting with player 1 and increasing by size of ship
//ex: isPlacedArray[0] will be player 1 Patrol, isPlacedArray[11] will be player 2 Carrier
isPlacedDict = {
  "1Patrol": 0,
  "1Assault": 0,
  "1Sub": 0,
  "1Destroy": 0,
  "1Battle": 0,
  "1Carrier": 0,
  "2Patrol": 0,
  "2Assault": 0,
  "2Sub": 0,
  "2Destroy": 0,
  "2Battle": 0,
  "2Carrier": 0}
//this function will take in an event and an id
//it will process where the ship is at and if it is a valid place to drop the ship.
function dragDrop(ev, id) {
    ev.preventDefault();
    var typeOfShip = ev.dataTransfer.getData("id"); //gets type of ship to pass to valid placement function to check and see if it is a valid placement
    console.log("type of ship: "+ typeOfShip);
    if(getValidPlacement(typeOfShip, id)){
      if(typeOfShip == "1Patrol") {
        isPlacedDict["1Patrol"] = 1;
        $("#1Patrol").prop("draggable", false)
      }
      if(typeOfShip == "1Assault") {
        isPlacedDict["1Assault"] = 1;
        $("#1Assault").prop("draggable", false)
      }
      if(typeOfShip == "1Sub") {
        isPlacedDict["1Sub"] = 1;
        $("#1Sub").prop("draggable", false)
      }
      if(typeOfShip == "1Destroy") {
        isPlacedDict["1Destroy"] = 1;
        $("#1Destroy").prop("draggable", false)
      }
      if(typeOfShip == "1Battle") {
        isPlacedDict["1Battle"] = 1;
        $("#1Battle").prop("draggable", false)
      }
      if(typeOfShip == "1Carrier") {
        isPlacedDict["1Carrier"] = 1;
        $("#1Carrier").prop("draggable", false)
      }
      if(typeOfShip == "2Patrol") {
        isPlacedDict["2Patrol"] = 1;
        $("#2Patrol").prop("draggable", false)
      }
      if(typeOfShip == "2Assault") {
        isPlacedDict["2Assault"] = 1;
        $("#2Assault").prop("draggable", false)
      }
      if(typeOfShip == "2Sub") {
        isPlacedDict["2Sub"] = 1;
        $("#2Sub").prop("draggable", false)
      }
      if(typeOfShip == "2Destroy") {
        isPlacedDict["2Destroy"] = 1;
        $("#2Destroy").prop("draggable", false)
      }
      if(typeOfShip == "2Battle") {
        isPlacedDict["2Battle"] = 1;
        $("#2Battle").prop("draggable", false)
      }
      if(typeOfShip == "2Carrier") {
        isPlacedDict["2Carrier"] = 1;
        $("#2Carrier").prop("draggable", false)
      }
        //make sure to update arrays based on how long length of ship is and such, can hard code or do dynamic if needed
        ev.target.appendChild(document.getElementById(typeOfShip));
        //update the display array
        console.log(typeOfShip)
        switch (id.substring(6,7)){
            case '1':

                for(i = 0; i<= getShipLength(typeOfShip.substring(1)); i++){
                    var shipConcant = typeOfShip+"-"+i;
                    if(!isRotated){//get orintation and switch stuff
                        //horizontal
                        player1DisplayArray[getXCoordinate(id)][getYCoordinate(id)+i] = shipConcant;
                    }
                    else{
                        //vertical
                        player1DisplayArray[getXCoordinate(id)+i][getYCoordinate(id)] = shipConcant;
                    }

                }
                console.log(player1DisplayArray);
                player1ShipsMoved.push(typeOfShip.substring(1));
                checkPlayer1Pieces();
                break;
            case '2':
            for(i = 0; i<= getShipLength(typeOfShip.substring(1)); i++){
                var shipConcant = typeOfShip+"-"+i;
                if(!isRotated){//get orintation and switch stuff
                    //horizontal
                    player2DisplayArray[getXCoordinate(id)][getYCoordinate(id)+i] = shipConcant;
                }
                else{
                    //vertical
                    player2DisplayArray[getXCoordinate(id)+i][getYCoordinate(id)] = shipConcant;
                }

            }
            console.log(player2DisplayArray);
            player2ShipsMoved.push(typeOfShip.substring(1));
            checkPlayer2Pieces();
            break;
        }
    }

  console.log('dragDrop')
}

function dragEnd() {
  console.log('dragEnd')
}

function rotateShips(player) {
  console.log("rotating")
  if(isRotated == false) {
    if(isPlacedDict["1Patrol"] == 0){
      $(".rotate1Patrol").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["1Assault"] == 0){
      $(".rotate1Assault").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["1Sub"] == 0){
      $(".rotate1Sub").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["1Destroy"] == 0){
      $(".rotate1Destroy").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["1Battle"] == 0){
      $(".rotate1Battle").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["1Carrier"] == 0){
      $(".rotate1Carrier").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["2Patrol"] == 0){
      $(".rotate2Patrol").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["2Assault"] == 0){
      $(".rotate2Assault").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["2Sub"] == 0){
      $(".rotate2Sub").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["2Destroy"] == 0){
      $(".rotate2Destroy").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["2Battle"] == 0){
      $(".rotate2Battle").css("transform", "rotate(.25turn)");
    }
    if(isPlacedDict["2Carrier"] == 0){
      $(".rotate2Carrier").css("transform", "rotate(.25turn)");
    }
    isRotated = true;
  }
  else {
    if(isPlacedDict["1Patrol"] == 0){
      $(".rotate1Patrol").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["1Assault"] == 0){
      $(".rotate1Assault").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["1Sub"] == 0){
      $(".rotate1Sub").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["1Destroy"] == 0){
      $(".rotate1Destroy").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["1Battle"] == 0){
      $(".rotate1Battle").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["1Carrier"] == 0){
      $(".rotate1Carrier").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["2Patrol"] == 0){
      $(".rotate2Patrol").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["2Assault"] == 0){
      $(".rotate2Assault").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["2Sub"] == 0){
      $(".rotate2Sub").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["2Destroy"] == 0){
      $(".rotate2Destroy").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["2Battle"] == 0){
      $(".rotate2Battle").css("transform", "rotate(0turn)");
    }
    if(isPlacedDict["2Carrier"] == 0){
      $(".rotate2Carrier").css("transform", "rotate(0turn)");
    }
    isRotated = false;
  }
}

var p1shipsSankArray = [0,0,0,0,0,0]
var p2shipsSankArray = [0,0,0,0,0,0]
var p1SankLoopCheck = [0,0,0,0,0,0]
var p2SankLoopCheck = [0,0,0,0,0,0]

function checkShipSank() {
  console.log(player2DisplayArray)
  for(x=0;x<numberOfShips;x++){
    p1shipsSankArray[x] = 0
    p2shipsSankArray[x] = 0
    if(p1shipsSankArray[x] == 0){
      if(turn == 2){
        for(i=0;i<xsize;i++){
          for(j=0;j<ysize;j++){
            var string = String(player1DisplayArray[i][j])
            var currentName = String(shipNameArray[x])
            //console.log(string)
            if(string.includes(currentName)){
              console.log("p1 ship is present")
              p1shipsSankArray[x] = 1
            }
          }
        }
        if(p1SankLoopCheck[x] == 0){
          if(p1shipsSankArray[x] == 0){
            p1SankLoopCheck[x] = 1
            alert(shipNameArray[x] + " has been sank!")
          }
        }
      }
    }
    if(p2shipsSankArray[x] == 0){
      if(turn == 1){
        for(i=0;i<xsize;i++){
          for(j=0;j<ysize;j++){
            var string = String(player2DisplayArray[i][j])
            var currentName = String(shipNameArray[x])
            //console.log(string)
            if(string.includes(currentName)){
              console.log("p2 ship is present")
              p2shipsSankArray[x] = 1
            }
          }
        }
        if(p1SankLoopCheck[x] == 0){
          if(p2shipsSankArray[x] == 0){
            p2SankLoopCheck[x] = 1
            alert(shipNameArray[x] + " has been sank!")
          }
        }
      }
    }
  }
  //console.log(shipsSankArray)
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
