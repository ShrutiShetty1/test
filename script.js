/* ======================================
   TRUCK MAP DEMO
   SHUBH LABH DISTRIBUTIONS
====================================== */

const splash = document.getElementById("splash");
const animation = document.getElementById("animation");
const home = document.getElementById("home");

// Truck
const truck = document.getElementById("truck");

// Wait for page to load
window.addEventListener("load", () => {

    // Show splash for 3 seconds
    setTimeout(() => {

        splash.style.opacity = "0";
        splash.style.transition = "opacity 1s";

        setTimeout(() => {

            splash.style.display = "none";

            animation.style.display = "block";

            startTruckAnimation();

        },1000);

    },3000);

});


function startTruckAnimation(){

    let x = -120;
    let y = 280;

    truck.style.left = x + "px";
    truck.style.top = y + "px";

    const move = setInterval(()=>{

        x += 3;

        truck.style.left = x + "px";

        // End animation
        if(x > window.innerWidth){

            clearInterval(move);

            setTimeout(showHome,1500);

        }

    },16);

}


function showHome(){

    animation.style.opacity = "0";
    animation.style.transition = "opacity 1s";

    setTimeout(()=>{

        animation.style.display="none";

        home.style.display="block";

        home.style.opacity="0";

        setTimeout(()=>{

            home.style.transition="opacity 1s";
            home.style.opacity="1";

        },100);

    },1000);

}