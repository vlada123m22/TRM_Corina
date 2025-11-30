// Optional: Add logic to control marker order
document.addEventListener("DOMContentLoaded", () => {

  const markerOrder = ["sun", "moon", "mars", "phoenix"];
  let currentIndex = 0;

  function showMarker(markerId) {
    const marker = document.querySelector(`#${markerId}`);
    if (marker) marker.setAttribute("visible", true);
  }

  function hideMarker(markerId) {
    const marker = document.querySelector(`#${markerId}`);
    if (marker) marker.setAttribute("visible", false);
  }

  markerOrder.forEach((id, index) => {
    const el = document.querySelector(`#${id}`);
    if (!el) return;

    el.addEventListener("markerFound", () => {
      if (index === currentIndex) {
        el.setAttribute("visible", true);
        currentIndex++;
      }
    });

    el.addEventListener("markerLost", () => {
      // optional: hide when marker is lost
      el.setAttribute("visible", false);
    });
  });

});
