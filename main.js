// ----- Marker order: Sun → Moon → Mars → Phoenix -----
const markerOrder = ["sun", "moon", "mars", "phoenix"];
let currentIndex = 0;

markerOrder.forEach((id, index) => {
  const entity = document.querySelector(`#${id}`);
  const text = entity.nextElementSibling;
  const marker = entity.parentNode; // the <a-nft> parent

  // When the marker is detected
  marker.addEventListener("markerFound", () => {
    if (index === currentIndex) {
      // Show this planet + text
      entity.setAttribute("visible", true);
      text.setAttribute("visible", true);

      // Move to next marker in sequence
      currentIndex++;
    } else {
      // Wrong marker detected → hide it
      entity.setAttribute("visible", false);
      text.setAttribute("visible", false);
    }
  });

  // When marker is lost → hide it
  marker.addEventListener("markerLost", () => {
    entity.setAttribute("visible", false);
    text.setAttribute("visible", false);
  });
});
