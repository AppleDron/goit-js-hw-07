import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryEl = document.querySelector(".gallery");
galleryEl.addEventListener("click", onCLick);

const addMarkup = (arr) => {
  const markup = arr
    .map(
      ({ preview, original, description }) => `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    )
    .join("");

  galleryEl.insertAdjacentHTML("beforeend", markup);
};

addMarkup(galleryItems);

function onCLick(event) {
  event.preventDefault();

  const { target } = event;

  if (target.nodeName !== "IMG") {
    return;
  }

  const instance = basicLightbox.create(
    `
        <img
            src="${target.dataset.source}"
            alt="${target.alt}"
            width="800" 
            height="600"
          />
`,
    {
      onShow: (instance) => document.addEventListener("keydown", keyDownClick),
      onClose: (instance) => document.addEventListener("keydown", keyDownClick),
    }
  );

  function keyDownClick(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }

  instance.show();

  if (instance.visible()) {
    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        instance.close();
      }
    });
  }
}
