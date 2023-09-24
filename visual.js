let rupertWidth = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--rupert-width"),
);
let catsOnScreen = Math.ceil(window.innerWidth / rupertWidth);

(function uuh() {
  appendSpinningCat();
})();

function appendSpinningCat() {
  const header = document.querySelector("header");
  const catsContainer = document.createElement("section");
  catsContainer.classList.add("track");

  for (let i = 0; i < catsOnScreen; i++) {
    createSpiningCat(catsContainer);
  }

  header.appendChild(catsContainer);
  window.addEventListener("resize", handleResize);
}

function handleResize() {
  const newCatsOnScreen = Math.ceil(window.innerWidth / rupertWidth);

  if (newCatsOnScreen > catsOnScreen) {
    const diff = newCatsOnScreen - catsOnScreen;
    const catsContainer = document.querySelector(".track");

    for (let i = 0; i < diff; i++) {
      createSpiningCat(catsContainer);
    }
  }

  if (newCatsOnScreen < catsOnScreen) {
    const diff = catsOnScreen - newCatsOnScreen;

    for (let i = 0; i < diff; i++) {
      const imgs = document.querySelectorAll("img");
      const img = imgs[0];
      img.parentNode.removeChild(img);
    }
  }

  catsOnScreen = newCatsOnScreen;
}

function createSpiningCat(container) {
  const img = document.createElement("img");
  // 192 x 128
  img.setAttribute(
    "src",
    "https://cdn.7tv.app/emote/636531e48ed289fb207f21e1/4x.webp",
  );
  img.setAttribute("alt", "Rupert's spinning so sweetly, pretty, huh?");

  container.appendChild(img);
}
