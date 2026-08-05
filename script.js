/* ===========================
   ELEMENTS
=========================== */

const splash = document.getElementById("splash");
const intro = document.getElementById("intro");
const homepage = document.getElementById("homepage");

const truck = document.getElementById("truck");
const polygon = document.getElementById("indiaOutline");

// Convert polygon to SVG path
function polygonToPath(poly) {

    const pts = poly.points;

    let d = "";

    for (let i = 0; i < pts.numberOfItems; i++) {

        const p = pts.getItem(i);

        if (i === 0)
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

    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#FF9933");
    path.setAttribute("stroke-width", "2");

    poly.parentNode.replaceChild(path, poly);

    return path;
}

const path = polygonToPath(polygon);

/* ===========================
   DRAW ANIMATION
=========================== */

const totalLength = path.getTotalLength();

path.style.strokeDasharray = totalLength;
path.style.strokeDashoffset = totalLength;

/* ===========================
   GET POLYGON POINTS
=========================== */

const pts = path.points;
let index = 0;

function moveTruck() {

    let distance = 0;
let currentAngle = 0;
const speed = 1.2; // Increase to 2 or 3 for faster truck

function moveTruck() {

    if (distance >= totalLength) {

        // Show tricolor
        document.querySelectorAll(".flag").forEach(f => {
            f.style.opacity = 1;
        });

        // Hide orange outline
        path.style.stroke = "transparent";

        setTimeout(() => {

            intro.style.opacity = 0;

            setTimeout(() => {

                intro.style.display = "none";

                homepage.style.opacity = 1;
                homepage.style.pointerEvents = "auto";
                document.body.style.overflow = "auto";

            }, 800);

        }, 1500);

        return;
    }

    // Current position
    const p = path.getPointAtLength(distance);

    // Look slightly ahead for smoother rotation
    const next = path.getPointAtLength(
        Math.min(distance + 5, totalLength)
    );

    // Convert SVG coordinates to screen coordinates
    const svg = document.getElementById("indiaSVG");
    const rect = svg.getBoundingClientRect();

    const x = rect.left + (p.x / 241) * rect.width;
    const y = rect.top + (p.y / 260) * rect.height;

    // Calculate angle
    const targetAngle =
        Math.atan2(
            next.y - p.y,
            next.x - p.x
        ) * 180 / Math.PI;

    let diff = targetAngle - currentAngle;

    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    // Smooth rotation
    currentAngle += diff * 0.12;

    // Move truck
    truck.style.left = x + "px";
    truck.style.top = y + "px";
    truck.style.transform =
        `translate(-50%, -50%) rotate(${currentAngle}deg)`;

    // Draw outline
    path.style.strokeDashoffset = totalLength - distance;

    distance += speed;

    requestAnimationFrame(moveTruck);
}
            

    


/* ===========================
   START
=========================== */

setTimeout(() => {

    moveTruck();

},2500);