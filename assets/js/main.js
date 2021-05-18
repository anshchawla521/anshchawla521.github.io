//var namexyz = "hello";
//console.log(`thi is a new command ${namexyz}`); //formatting  // can also use number  //also in concatination
//also typeof function is defined no brackets required is defined
// use === for generally bcz it compares data type doesnt do automatic onversion
//whereas == does data type conversion if mismatch 
const debug = false;
function logintoconsole(temp)
{
    if (debug)
    {
        console.log(temp);
    }
}

function back()
{
    window.history.back()
}







window.onhashchange = checklink;
window.onload = checklink;

function checklink(){
    let currentlocation = window.location.hash;
    logintoconsole(`i got called 1 time`);
    logintoconsole(`the location is ${currentlocation}`);


    if( !currentlocation  || currentlocation === '#')
    {
        document.getElementById("headermain").style.visibility = "visible";
        document.getElementById("headermain").style.display = "block";
        logintoconsole("header visible");


        // looking for all divs with class headings and hding them and at end hiding wrapper
        let x = Array.from(document.getElementById("wrapper").querySelectorAll(".sections"));
        x.forEach(function(item ){
        
        if(item.className.indexOf('sections') >= 0)
        {
            
            document.getElementById(item.id).style.visibility = "hidden";
            document.getElementById(item.id).style.display = "none";
        }
        document.getElementById("wrapper").style.visibility = "hidden";
        document.getElementById("wrapper").style.display = "none";


        });
        return;


    }else{
        //if something is added after hash check if its a valid section or not
        currentlocation = currentlocation.substring(1);
        let valid = false;
        let x = Array.from(document.getElementById("wrapper").querySelectorAll(".sections"));
        x.forEach(function(item ){
        
        if(item.className.indexOf('sections') >= 0)
        { document.getElementById(item.id).style.visibility = "hidden";
          document.getElementById(item.id).style.display = "none";
            if(item.id === currentlocation )
            {
                logintoconsole("valid");
                valid = true;
                //return;
            }
        }
    });

    // if its valid show it and hide others
    // if invalid do return to mane page
    if(valid){
        document.getElementById("headermain").style.visibility = "hidden";
        document.getElementById("headermain").style.display = "none";
        logintoconsole("header hidden");
        document.title = currentlocation.toLocaleUpperCase();
        document.getElementById(currentlocation).style.visibility = "visible";
        document.getElementById(currentlocation).style.display = "block";
        document.getElementById("wrapper").style.visibility = "visible";
        document.getElementById("wrapper").style.display = "block";
        //unhide then start loading the img
        let images = document.getElementById(currentlocation).querySelectorAll("img");
        images.forEach(function(img){
            img.src = img.dataset.src; 
        });



    }else{
        //window.location.hash = '';
        window.alert("invalid section or under development");
        window.history.back();
        //document.getElementById("wrapper").style.visibility = "hidden";
        //document.getElementById("wrapper").style.display = "none";
    }
}

}

document.body.addEventListener('click', function (event) {
    // logintoconsole("i am getting executed");
    if (document.getElementById("main-body").contains(event.target) && 
        !document.getElementById("wrapper").contains(event.target)) 
    {
        location.hash = '';
    }
});

