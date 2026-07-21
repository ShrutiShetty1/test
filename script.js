const splash = document.getElementById("splash");
const animation = document.getElementById("animation");

const truck = document.getElementById("truck");

window.addEventListener("load", () => {

    setTimeout(() => {

        splash.style.opacity = "0";
        splash.style.transition = "1s";

        setTimeout(() => {

            splash.style.display = "none";
            animation.style.display = "block";

            startAnimation();

        },1000);

    },3000);

});


function startAnimation(){

    const svg = document.getElementById("indiaMap");

    svg.addEventListener("load", ()=>{

        const svgDoc = svg.contentDocument;

        const polygon = svgDoc.getElementById("indiaPolygon");

        const points = polygon.points;

        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        let progress = 0;

        function animate(){

            progress += 2;

            if(progress > length){

                path.style.strokeDashoffset = 0;

                return;
            }

            path.style.strokeDashoffset = length - progress;

            const point = path.getPointAtLength(progress);

            truck.style.left = point.x + "px";
            truck.style.top = point.y + "px";

            const next = path.getPointAtLength(
                Math.min(progress + 1, length)
            );

            const angle =
                Math.atan2(
                    next.y - point.y,
                    next.x - point.x
                ) * 180 / Math.PI;

            truck.style.transform =
                `translate(-50%,-50%) rotate(${angle}deg)`;

            requestAnimationFrame(animate);

        }

        animate();

    });

}