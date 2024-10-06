function setupReadMore() {
  const readMoreContainers = document.querySelectorAll(".read-more-container");

  readMoreContainers.forEach((container) => {
    const maxLength = parseInt(container.getAttribute("max-length"), 10);
    if (maxLength == NaN) maxLength = 100; //if max-length is not specified

    const text = container.querySelector(".read-more-text");
    const readMoreBtn = container.querySelector(".read-more-btn");

    const fullText = text.innerHTML;
    if (fullText.length > maxLength) {
      text.innerHTML = truncateHTML(fullText, maxLength);
      let isExpanded = false;

      //const show = fullText.slice(0, maxLength);
      //const hide = fullText.slice(maxLength);
      //container.innerHTML = `${show}<span class="dots">...</span><span class="hidden-content">${hide}</span><span class="read-more-btn">Read More</span>`;
      //container.innerHTML += `<span class="dots">...</span><span class="read-more-btn"> Read More</span>`;

      //const readMoreBtn = container.querySelector(".read-more-btn");
      //const dots = container.querySelector("dots");
      //const hiddenText = container.querySelector("hidden-content");

      readMoreBtn.addEventListener("click", () => {
        if (
          //hiddenText.style.disply === "none" ||
          //hiddenText.style.display === ""
          !isExpanded //hasn't been expanded
        ) {
          text.innerHTML = fullText;
          //This does not work because innerHTML is always getting changed
          //and thus the previous btn is overwritten
          //text.innerHTML += `<span class="read-more-btn">Read More</span>`;
          //hiddenText.style.display = "inline";
          //dots.style.display = "none";
          readMoreBtn.textContent = "Read Less";
        } else {
          text.innerHTML = truncateHTML(fullText, maxLength);
          //text.innerHTML += `<span class="dots">...</span><span class="read-more-btn"> Read More</span>`;
          //hiddenText.style.display = "none";
          //dots.style.display = "inline";
          readMoreBtn.textContent = "...Read More";
        }
        isExpanded = !isExpanded;
      });
    } else {
      readMoreBtn.style.display = "none";
    }
  });
}

function truncateHTML(html, charLimit) {
  let div = document.createElement("div");
  div.innerHTML = html;

  let content = "";
  let length = 0;

  function traverse(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.textContent;
      if (length + text.length > charLimit) {
        content += text.substring(0, charLimit - length);
        length = charLimit;
      } else {
        content += text;
        length += text.length;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      let tagOpen = `<${node.tagName.toLowerCase()}${Array.from(node.attributes)
        .map((attr) => ` ${attr.name}="${attr.value}"`)
        .join("")}>`;
      let tagClose = `</${node.tagName.toLowerCase()}>`;

      content += tagOpen;
      Array.from(node.childNodes).forEach((child) => {
        if (length < charLimit) {
          traverse(child);
        }
      });
      content += tagClose;
    }
  }

  traverse(div);
  return content;
}

// Export the function so it can be used in the HTML file
export { setupReadMore };
