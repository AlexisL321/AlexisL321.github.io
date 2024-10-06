function setupReadMore() {
  const readMoreContainers = document.querySelectorAll(".read-more-container");

  readMoreContainers.forEach((container) => {
    const maxLength = parseInt(container.getAttribute("max-length"), 10);
    if (maxLength == NaN) maxLength = 100; //if max-length is not specified

    const fullText = readMoreContent.textContent.trim();
    if (fullText.length > maxLength) {
      const show = fullText.slice(0, maxLength);
      const hide = fullText.slice(maxLength);
      container.innerHTML = `${show}<span class="dots">...</span><span
class="hidden-content">${hide}</span><span class="read-more-btn">Read
 More</span>`;

      const readMoreBtn = container.querySelector(".read-more-btn");
      const dots = container.querySelector("dots");
      const hiddenText = container.querySelector("hidden-content");

      readMoreBtn.addEventListener("click", () => {
        if (
          hiddenText.style.disply === "none" ||
          hiddenText.style.display === ""
        ) {
          hiddenText.style.display = "inline";
          dots.style.display = "none";
          readMoreBtn.textContent = "Read Less";
        } else {
          hiddenText.style.display = "none";
          dots.style.display = "inline";
          readMorebtn.textContent = "Read More";
        }
      });
    }
  });
}

// Export the function so it can be used in the HTML file
module.exports= { setupReadMore };
