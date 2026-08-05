/* ===========================
   ELEMENTS
=========================== */

const intro = document.getElementById("intro");
const homepage = document.getElementById("homepage");
const truck = document.getElementById("truck");

const polygon = document.getElementById("indiaOutline");

/* ===========================
   POLYGON -> PATH
=========================== */

function polygonToPath(poly){

    const pts = poly.points;

    let d = "";

    for(let i=0;i<pts.numberOfItems;i++){

        const p = pts.getItem(i);

        if(i===0)
            d += `M ${p.x} ${p.y}`;
        else
            d += ` L ${p.x} ${p.y}`;
    }

    d += " Z";

    const path =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

    path.setAttribute("id","indiaPath");
    path.setAttribute("d",d);
    path.setAttribute("fill","none");
    path.setAttribute("stroke","#FF9933");
    path.setAttribute("stroke-width","2");
    path.setAttribute("stroke-linejoin","round");
    path.setAttribute("stroke-linecap","round");

    poly.parentNode.replaceChild(path,poly);

    return path;
}

const path = polygonToPath(polygon);

/* ===========================
   DRAW SETTINGS
=========================== */

const totalLength = path.getTotalLength();

path.style.strokeDasharray = totalLength;
path.style.strokeDashoffset = totalLength;

/* ===========================
   VARIABLES
=========================== */

let distance = 0;
let currentAngle = 0;

const speed = 0.8;
/* ===========================
   MOVE TRUCK
=========================== */

function moveTruck() {

    if (distance >= totalLength) {

        // Show tricolor (if you add it later)
        setTimeout(() => {
    document.querySelectorAll(".flag").forEach(flag => {
        flag.style.opacity = "1";
    });
}, 300);

        // Hide orange outline
        path.style.stroke = "transparent";

        setTimeout(() => {

            intro.style.opacity = "0";

            setTimeout(() => {

                intro.style.display = "none";

                homepage.style.opacity = "1";
                homepage.style.pointerEvents = "auto";

                document.body.style.overflow = "auto";

            }, 800);

        }, 1500);

        return;
    }

    // Current point
    const p = path.getPointAtLength(distance);

    // Next point
    const next = path.getPointAtLength(
        Math.min(distance + 8, totalLength)
    );

    const svg = document.getElementById("indiaSVG");
    const rect = svg.getBoundingClientRect();

    // Convert SVG coordinates to screen coordinates
    const x = rect.left + window.scrollX + (p.x / 241) * rect.width;
const y = rect.top + window.scrollY + (p.y / 260) * rect.height;

    // Calculate truck angle
    const targetAngle =
        Math.atan2(
            next.y - p.y,
            next.x - p.x
        ) * 180 / Math.PI;

    let diff = targetAngle - currentAngle;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    // Smooth rotation
    currentAngle += diff * 0.08;

    // Move truck
    truck.style.left = x + "px";
    truck.style.top = y + "px";

    truck.style.transform =
        `translate(-50%, -50%) rotate(${currentAngle}deg)`;

    // Draw outline gradually
    const drawOffset = Math.max(totalLength - distance - 15, 0);
path.style.strokeDashoffset = drawOffset;

    // Move forward
    let curveSpeed = speed;

if (Math.abs(diff) > 20) {
    curveSpeed = speed * 0.7; // Slow down at sharper turns
}

distance += curveSpeed;

    requestAnimationFrame(moveTruck);
}

/* ===========================
   START ANIMATION
=========================== */

// Hide homepage initially
homepage.style.opacity = "0";
homepage.style.pointerEvents = "none";

// Keep intro visible
intro.style.opacity = "1";

// Prepare path for drawing
path.style.strokeDasharray = totalLength;
path.style.strokeDashoffset = totalLength;

// Wait until splash screen finishes
setTimeout(() => {

    distance = 0;
    currentAngle = 0;

    moveTruck();

}, 2500);
