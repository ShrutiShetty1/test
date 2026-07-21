const splash = document.getElementById("splash");
const main = document.getElementById("main");

const truck = document.getElementById("truck");

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

    {x:180,y:320},

    {x:420,y:260},

    {x:380,y:420},

    {x:470,y:500},

    {x:700,y:180}

];

window.onload=function(){

    setTimeout(()=>{

        splash.style.opacity="0";

        setTimeout(()=>{

            splash.style.display="none";

            main.style.display="block";

            startAnimation();

        },1000);

    },3000);

}

function moveTruck(from,to,callback){

    let x=from.x;

    let y=from.y;

    const dx=(to.x-from.x)/100;

    const dy=(to.y-from.y)/100;

    const angle=Math.atan2(
        to.y-from.y,
        to.x-from.x
    )*180/Math.PI;

    truck.style.transform=
    `translate(-50%,-50%) rotate(${angle}deg)`;

    let step=0;

    const timer=setInterval(()=>{

        x+=dx;

        y+=dy;

        truck.style.left=x+"px";
        truck.style.top=y+"px";

        step++;

        if(step>=100){

            clearInterval(timer);

            callback();

        }

    },15);

}

function startAnimation(){

    truck.style.left=points[0].x+"px";
    truck.style.top=points[0].y+"px";

    cities[0].classList.add("active");

    let i=0;

    function next(){

        if(i>=routes.length){

            document
            .getElementById("done")
            .style.opacity=1;

            return;
        }

        routes[i].classList.add("draw");

        moveTruck(

            points[i],

            points[i+1],

            ()=>{

                cities[i+1]
                .classList
                .add("active");

                i++;

                next();

            }

        );

    }

    next();

}