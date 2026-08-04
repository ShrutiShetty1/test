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

    if (index >= pts.numberOfItems) {

        // Show tricolor
        document.querySelectorAll(".flag").forEach(flag => {
            flag.style.opacity = "1";
        });

        // Hide outline
        polygon.style.stroke = "transparent";

        setTimeout(() => {

            intro.style.opacity = "0";

            setTimeout(() => {

                intro.style.display = "none";

                homepage.style.opacity = "1";
                homepage.style.pointerEvents = "auto";

                document.body.style.overflow = "auto";

            }, 800);

        }, 2000);

        return;
    }

    // Current point
    const p = pts.getItem(index);

    // Next point (for rotation)
    const next = pts.getItem((index + 1) % pts.numberOfItems);

    const svg = document.getElementById("indiaSVG");
    const rect = svg.getBoundingClientRect();

    const x = rect.left + (p.x / 241) * rect.width;
    const y = rect.top + (p.y / 260) * rect.height;

    const angle =
        Math.atan2(
            next.y - p.y,
            next.x - p.x
        ) * 180 / Math.PI;

    truck.style.left = x + "px";
    truck.style.top = y + "px";

    truck.style.transform =
        `translate(-50%, -50%) rotate(${angle}deg)`;

    // Draw outline
    polygon.style.strokeDashoffset =
        totalLength - ((index / pts.numberOfItems) * totalLength);

    index++;

    // Continue animation
    setTimeout(moveTruck, 30);
}


/* ===========================
   START
=========================== */

setTimeout(() => {

    moveTruck();

},2500);