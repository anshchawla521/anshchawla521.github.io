//var namexyz = "hello";
//console.log(`thi is a new command ${namexyz}`); //formatting  // can also use number  //also in concatination
//also typeof function is defined no brackets required is defined
// use === for generally bcz it compares data type doesnt do automatic onversion
//whereas == does data type conversion if mismatch 

//isplaying variable in dataset
//0 player doesnt exist 1 means not paying 2 means playing
const debug = true;
var isYoutubeReady = false;
var videoQueue = Array();
var currentlocation = window.location.hash;

//  YOUTUBE
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);




var player = new Array() ;

function loadvideo(location){
    let videos = document.getElementById(location).querySelectorAll(".video"); // check if a video class exists in that section/div
    if(videos){
    videos.forEach(function(video){
    if(videoQueue.indexOf(video)<0){
    videoQueue.push(video);   
    console.log(`added to video `);  
    console.log(videoQueue);
    }
    });
       
    if(isYoutubeReady)
    {
        onYouTubeIframeAPIReady();
    }
    }
}

function onYouTubeIframeAPIReady() {
    isYoutubeReady = true;

    if(videoQueue){
    videoQueue.forEach(function(video , index){
    
    if(!video.id){
    //if player doesnt exist make it exist
     video.id = `player${player.length}`;
    //  console.log("found div");
    if(video.dataset.videoid){
    var temp =  new YT.Player( video.id , {
         videoId: video.dataset.videoid,
         playerVars: {
             'rel' : 0,
             'autoplay' : 0,  // because no mute option available
             'start': video.dataset.starttime,
             'end': video.dataset.endtime,
             'origin': 'https://anshchawla521.github.io'
         }
       });
    player.push(temp);
    }
 }
videoQueue.pop();
})
}
}



function back()
{
    pausevideo(currentlocation);
    if(window.history.length != 1){
        window.history.back();
    }else{
        window.location.hash = '';
    }
}
function clos()
{
    
    pausevideo(currentlocation);
    location.hash="";
    
}

function createmodal(currentlocation){
    // will check if a particular image is part of gallery class or not if yes add modal div in bottom line
    if(document.getElementById(currentlocation).querySelector(".imagegallery")){
    let imagegallery = document.getElementById(currentlocation).querySelector(".imagegallery");
    if(!imagegallery.querySelector('.modal')){
    let modal = document.createElement('div');



    let button = document.createElement('a');
    button.onclick = destroymodal;
    let icon = document.createElement('i');
    icon.className = ("fas fa-times");
    button.appendChild(icon);
    modal.appendChild(button);



    modal.classList.add('modal');
    imagegallery.appendChild(modal);
    modal.appendChild(document.createElement('img'));
    imagegallery = imagegallery.querySelectorAll('img');
    // console.log(imagegallery)
    imagegallery.forEach(function(image){
    image.onclick = function(){
        // let modal = document.getElementsByClassName('modal');
        // console.log(modal);
        modal.style.display = 'block';
        modal.querySelector('img').src = this.src;
        
        
    };
});
    }
}
}
function destroymodal()
{ 
    if(document.getElementById(currentlocation).querySelector(".imagegallery")){
        if(document.getElementById(currentlocation).querySelector(".imagegallery").querySelector('.modal')){
            document.getElementById(currentlocation).querySelector(".imagegallery").querySelector(".modal").style.display = "none";
        }
    }
}




function pausevideo(location){
    if(location && location !== "#"){
    let videos = document.getElementById(location).querySelectorAll(".video"); // check if a video class exists in that section/div
    if(videos)
    {
        videos.forEach(function(video){
            if(video.id)
            {//player exists
                
                player[video.id.split("r")[1]].pauseVideo();
            }
        });

    }
}
}









window.onhashchange = checklink;
window.onload = checklink;

function checklink(){
    currentlocation = window.location.hash;
    // console.log(`the location is ${currentlocation}`);


    if( !currentlocation  || currentlocation === '#')
    {
        // document.getElementById("headermain").style.visibility = "visible";
        document.getElementById("headermain").style.animation = "fade-in 0.8s forwards";
        document.getElementById("headermain").style.display = "block";
        console.log("header visible");
        setTimeout(() => {
            window.scrollTo({top: 0, behavior: "smooth"});
        },0.8); // Match this delay to the CSS transition duration

        document.title = document.getElementById("headermain").dataset.title;
        // looking for all divs with class headings and hding them and at end hiding wrapper
        let x = Array.from(document.getElementById("wrapper").querySelectorAll(".sections"));
        x.forEach(function(item ){
        
        if(item.className.indexOf('sections') >= 0)
        {
            
            // document.getElementById(item.id).style.visibility = "hidden";
            document.getElementById(item.id).style.animation = "fade-out 0s forwards";
            document.getElementById(item.id).style.display = "none";
        }
        // document.getElementById("wrapper").style.visibility = "hidden";
        document.getElementById("wrapper").style.animation = "fade-out 0s forwards";
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
        {
            if(item.id === currentlocation )
            {
                //if the section to be accessed exists show it
                // console.log("valid");
                valid = true;
                //return;
            }else{
                // document.getElementById(item.id).style.visibility = "hidden";
                document.getElementById(item.id).style.animation = "fade-out 0s forwards";
                document.getElementById(item.id).style.display = "none";
                //hide the rest of sections
            }
        }
    });

    // if its valid show it and hide others
    // if invalid do return to mane page
    if(valid){
        let title = document.getElementById(currentlocation).dataset.title;
        if(title){
        document.title = title;
        }else{
            document.title = "Ansh Chawla";
        }
        // document.getElementById("headermain").style.visibility = "hidden";
        // header main is the main page 
        
        document.getElementById("headermain").style.animation = "fade-out 0s forwards";
        document.getElementById("headermain").style.display = "none";
        // document.getElementById(currentlocation).style.visibility = "visible";
        document.getElementById(currentlocation).style.animation = "fade-in 0.8s forwards";
        document.getElementById(currentlocation).style.display = "block";
        destroymodal();

        // document.getElementById("wrapper").style.visibility = "visible";
        // wrapper is the secondary window
        document.getElementById("wrapper").style.animation = "fade-in 0.8s forwards";
        document.getElementById("wrapper").style.display = "block";
        loadvideo(currentlocation);

        setTimeout(() => {
            window.scrollTo({top: 0, behavior: "smooth"});
          },0.8); // Match this delay to the CSS transition duration
        
        //unhide then start loading the img
        let images = document.getElementById(currentlocation).querySelectorAll("img");
       

        images.forEach(function(img){
            img.src = img.dataset.src; 
            
        });
        createmodal(currentlocation);
  

    }else{
        //window.location.hash = '';
        window.alert("invalid section or under development");
        if(window.history.length != 1){
            window.history.back(); // previous page exists
        }else{
            window.location.hash = '';
        }
    }
}



}

document.body.addEventListener('click', function (event) {
    // console.log("i am getting executed");
    if (document.getElementById("main-body").contains(event.target) && 
        !document.getElementById("wrapper").contains(event.target)) 
    {
        clos();
    }
});






