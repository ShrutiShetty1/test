/* ===========================
   ELEMENTS
=========================== */

const splash = document.getElementById("splash");
const intro = document.getElementById("intro");
const homepage = document.getElementById("homepage");

const truck = document.getElementById("truck");
const polygon = document.getElementById("indiaOutline");

/* ===========================
   DRAW ANIMATION
=========================== */

const totalLength = polygon.getTotalLength();

polygon.style.strokeDasharray = totalLength;
polygon.style.strokeDashoffset = totalLength;

/* ===========================
   GET POLYGON POINTS
=========================== */

const pts = polygon.points;
let index = 0;

function moveTruck() {

    if(index >= pts.numberOfItems){

        polygon.style.fill = "#FFFFFF";

        setTimeout(() => {

            polygon.style.fill = "#138808";

        },600);

        setTimeout(() => {

            intro.style.opacity = 0;

            setTimeout(() => {

                intro.style.display = "none";

                homepage.style.opacity = 1;
                homepage.style.pointerEvents = "auto";

                document.body.style.overflow = "auto";

            },800);

        },1800);

        return;
    }

    const p = pts.getItem(index);

    const svg = document.getElementById("indiaSVG");

    const rect = svg.getBoundingClientRect();

    const x = rect.left + (p.x / 241) * rect.width;
    const y = rect.top + (p.y / 260) * rect.height;

    truck.style.left = x + "px";
    truck.style.top = y + "px";

    polygon.style.strokeDashoffset =
        totalLength - ((index / pts.numberOfItems) * totalLength);

    index++;

    requestAnimationFrame(moveTruck);

}

/* ===========================
   START
=========================== */

setTimeout(() => {

    moveTruck();

},2500);