//var namexyz = "hello";
//console.log(`thi is a new command ${namexyz}`); //formatting  // can also use number  //also in concatination
//also typeof function is defined no brackets required is defined
// use === for generally bcz it compares data type doesnt do automatic onversion
//whereas == does data type conversion if mismatch 
const debug = true;
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

function checklink(){
    let currentlocation = window.location.hash;
    logintoconsole(`the location is ${currentlocation}`);


    if( !currentlocation  || currentlocation === '#')
    {
        document.getElementById("headermain").style.visibility = "visible";
        document.getElementById("headermain").style.display = "block";
        logintoconsole("header visible");


        // looking for all divs with class headings and hding them and at end hiding wrapper
        let x = Array.from(document.getElementById("wrapper").querySelectorAll(".headings"));
        x.forEach(function(item ){
        
        if(item.className.indexOf('headings') >= 0)
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
        let x = Array.from(document.getElementById("wrapper").querySelectorAll(".headings"));
        x.forEach(function(item ){
        
        if(item.className.indexOf('headings') >= 0)
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
        
        document.getElementById(currentlocation).style.visibility = "visible";
        document.getElementById(currentlocation).style.display = "block";
        document.getElementById("wrapper").style.visibility = "visible";
        document.getElementById("wrapper").style.display = "block";
    }else{
        //window.location.hash = '';
        window.alert("invalid section or under development");
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



checklink();