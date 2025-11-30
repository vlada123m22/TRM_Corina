// Force scan order: Sun → Moon → Mars → Phoenix
const markerOrder = ["sun", "moon", "mars", "phoenix"];
let currentIndex = 0;

markerOrder.forEach((id, index) => {
  const entity = document.querySelector(`#${id}`);
  const text = entity.nextElementSibling;
  const marker = entity.parentNode;

  marker.addEventListener("markerFound", () => {
    // Correct next marker → show it
    if (index === currentIndex) {
      entity.setAttribute("visible", true);
      text.setAttribute("visible", true);
      currentIndex++;
    } else {
      // Wrong marker → keep hidden
      entity.setAttribute("visible", false);
      text.setAttribute("visible", false);
    }
  });

  marker.addEventListener("markerLost", () => {
    entity.setAttribute("visible", false);
    text.setAttribute("visible", false);
  });
});
