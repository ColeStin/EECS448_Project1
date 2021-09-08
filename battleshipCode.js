function hoverOverId(id){
    $("#"+id).css("border-color", "red");
    $("#"+id).css("border-style", "solid");
}

function mouseOutOfBox(id){
    $("#"+id).css("border-color", "blue");
}

function mouseClick(id){
    console.log("here");
    $("#"+id).css("background-color", "orange");
}

$(document).ready(function(){
    for(var x =0; x<9;x++){
        var html = `
        <div id='row`+x+`' class='row' style='padding:px'>
        </div>`
        $("#primary").append(html);
        for(var y =0; y<10; y++){
            var letter = (y+10).toString(36);
            console.log(letter);
            var innerHTML =`
            <div id='col`+x+letter+`' class='selectionBox' onmouseover="hoverOverId('col`+x+letter+`')" onmouseout="mouseOutOfBox('col`+x+letter+`')" onclick="mouseClick('col`+x+letter+`')" >
                `+x+letter+`
                </div>
            `;
            $("#row"+x).append(innerHTML);
        }
    }
    console.log("ready")
});
