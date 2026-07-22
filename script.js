// ===========================
// Splash Screen
// ===========================

const splash = document.getElementById("splash");
const mapIntro = document.getElementById("mapIntro");
const companyText = document.getElementById("companyText");

setTimeout(() => {

    splash.style.display = "none";
    mapIntro.style.display = "flex";

    loadAnimation();

}, 2000);


// ===========================
// Truck Animation
// ===========================

function loadAnimation() {

    const object = document.getElementById("indiaMap");

    object.addEventListener("load", function () {

        const svg = object.contentDocument;

        const path = svg.getElementById("indiaPath");

        if (!path) {
            alert("indiaPath not found inside india.svg");
            return;
        }

        const truck = document.getElementById("truck");

        const totalLength = path.getTotalLength();

        path.style.fill = "none";
        path.style.stroke = "#0A4FAF";
        path.style.strokeWidth = "4";
        path.style.strokeDasharray = totalLength;
        path.style.strokeDashoffset = totalLength;

        let progress = 0;
        const speed = 2;

        function animate() {

            progress += speed;

            if (progress > totalLength)
                progress = totalLength;

            // Draw line
            path.style.strokeDashoffset = totalLength - progress;

            // Current point
            const pt = path.getPointAtLength(progress);

            // Next point (for angle)
            const next = path.getPointAtLength(
                Math.min(progress + 1, totalLength)
            );

            const rect = object.getBoundingClientRect();

            truck.style.left =
                (rect.left + pt.x * rect.width / 400) + "px";

            truck.style.top =
                (rect.top + pt.y * rect.height / 500) + "px";

            const angle = Math.atan2(
                next.y - pt.y,
                next.x - pt.x
            ) * 180 / Math.PI;

            truck.style.transform =
                "translate(-50%,-50%) rotate(" +
                angle +
                "deg)";

            if (progress < totalLength) {

                requestAnimationFrame(animate);

            } else {

                companyText.style.opacity = 1;

                setTimeout(function () {

                    window.location.href = "home.html";

                }, 3000);

            }

        }

        animate();

    });

}