document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("startBtn");
  const arScene = document.getElementById("arScene");

  // Show scene and hide button on click
  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    arScene.style.display = "block";
    arScene.play(); // ensures mobile browser treats it as user gesture
  });

  // Marker order logic: only next marker is active
  const markerOrder = ["sunBox", "moonBox", "marsBox", "phoenixBox"];
  let currentIndex = 0;

  markerOrder.forEach((id, index) => {
    const el = document.getElementById(id);
    if (!el) return;

    // AR.js events
    el.addEventListener("markerFound", () => {
      if (index === currentIndex) {
        el.setAttribute("visible", true);
        currentIndex++;
      } else {
        el.setAttribute("visible", false); // prevent skipping order
      }
    });

    el.addEventListener("markerLost", () => {
      el.setAttribute("visible", false);
    });
  });

});
