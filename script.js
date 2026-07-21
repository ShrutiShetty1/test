const splash = document.getElementById("splash");
const main = document.getElementById("main");

const truck = document.getElementById("truck");
const done = document.getElementById("done");

const routes = [
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3"),
    document.getElementById("r4"),
    document.getElementById("r5"),
    document.getElementById("r6")
];

const cities = [
    document.getElementById("c1"),
    document.getElementById("c2"),
    document.getElementById("c3"),
    document.getElementById("c4"),
    document.getElementById("c5"),
    document.getElementById("c6"),
    document.getElementById("c7")
];

const points = [
    {x:140,y:120},
    {x:260,y:220},
    {x:180,y:340},
    {x:430,y:260},
    {x:380,y:430},
    {x:500,y:500},
    {x:720,y:170}
];

window.onload = () => {

    setTimeout(() => {

        splash.style.opacity = "0";

        setTimeout(() => {

            splash.style.display = "none";
            main.style.display = "block";

            truck.style.left = points[0].x + "px";
            truck.style.top = points[0].y + "px";

            cities[0].classList.add("active");

            animateRoute(0);

        },1000);

    },3000);

};

function animateRoute(index){

    if(index >= routes.length){

        done.style.opacity = "1";
        return;

    }

    routes[index].classList.add("draw");

    moveTruck(
        points[index],
        points[index+1],
        () => {

            cities[index+1].classList.add("active");

            animateRoute(index+1);

        }
    );

}

function moveTruck(start,end,callback){

    const duration = 1200;

    const startTime = performance.now();

    const angle =
        Math.atan2(
            end.y-start.y,
            end.x-start.x
        )*180/Math.PI;

    truck.style.transform =
        `translate(-50%,-50%) rotate(${angle}deg)`;

    function frame(time){

        let progress = (time-startTime)/duration;

        if(progress>1) progress=1;

        const x =
            start.x +
            (end.x-start.x)*progress;

        const y =
            start.y +
            (end.y-start.y)*progress;

        truck.style.left = x+"px";
        truck.style.top = y+"px";

        if(progress<1){

            requestAnimationFrame(frame);

        }else{

            callback();

        }

    }

    requestAnimationFrame(frame);

}