const splash=document.getElementById("splash");
const container=document.getElementById("mapContainer");

setTimeout(()=>{

splash.style.display="none";
container.style.display="flex";

startAnimation();

},2000);


function startAnimation(){

const path=document.getElementById("indiaPath");

const truck=document.getElementById("truck");

const length=path.getTotalLength();

path.style.strokeDasharray=length;
path.style.strokeDashoffset=length;

let progress=0;

const speed=2;

function animate(){

progress+=speed;

path.style.strokeDashoffset=length-progress;

const point=path.getPointAtLength(progress);

truck.style.left=(point.x+20)+"px";
truck.style.top=(point.y+20)+"px";

const next=path.getPointAtLength(
Math.min(progress+1,length)
);

const angle=Math.atan2(
next.y-point.y,
next.x-point.x
);

truck.style.transform=
`translate(-50%,-50%)
rotate(${angle*180/Math.PI}deg)`;

if(progress<length){

requestAnimationFrame(animate);

}else{

setTimeout(()=>{

window.location="home.html";

},1000);

}

}

animate();

}