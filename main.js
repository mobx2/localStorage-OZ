let lis = document.querySelectorAll("ul li");
let mainDiv = document.querySelector(".color-view");
let body = document.querySelector("body");

//! Check if there's a saved color in localStorage
if (window.localStorage.getItem("color")) {
  let savedColor = localStorage.getItem("color");

  mainDiv.style.backgroundColor = savedColor;

  mainDiv.classList.add("visible");

  body.style.backgroundColor = getBodyColor(savedColor);

  lis.forEach((li) => li.classList.remove("active"));
  document
    .querySelector(`[data-color="${savedColor}"]`)
    .classList.add("active");
}

// Add hover event to each li

lis.forEach((li) => {
  li.addEventListener("mouseover", (e) => {
    // Remove active class from all lis

    lis.forEach((li) => li.classList.remove("active"));

    // Add active class to the hovered li
    e.currentTarget.classList.add("active");

    // Get the hovered color
    let hoveredColor = e.currentTarget.dataset.color;

    // Change the main div background color
    mainDiv.style.backgroundColor = hoveredColor;

    // Trigger fade animation

    mainDiv.classList.remove("visible");

    setTimeout(() => {
      mainDiv.classList.add("visible");
    }, 100);

    // Change the body background color
    body.style.backgroundColor = getBodyColor(hoveredColor);
  });

  // Optional: Reset colors on mouseout

  li.addEventListener("mouseout", () => {
    let savedColor = localStorage.getItem("color");
    if (savedColor) {
      mainDiv.style.backgroundColor = savedColor;
      body.style.backgroundColor = getBodyColor(savedColor);
    }
  });

  // Save the color to localStorage on click

  li.addEventListener("click", (e) => {
    let selectedColor = e.currentTarget.dataset.color;
    localStorage.setItem("color", selectedColor);
  });
});

// Function to return the appropriate body background color

function getBodyColor(color) {
  switch (color) {
    case "red":
      return "#f5a7a7";
    case "green":
      return "#a9e0a9";
    case "blue":
      return "#a9c7e0";
    case "black":
      return "#6e7a7f";
    default:
      return "#f7f7f7";
  }
}
