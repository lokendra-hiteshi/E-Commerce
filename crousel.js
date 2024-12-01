let carouselItems;
let currentIndex = 0;
let autoSlideInterval;

function showSlide(index) {
  if (!carouselItems || carouselItems.length === 0) return;

  carouselItems?.forEach((item) => {
    item.style.display = "none";
  });

  carouselItems[index].style.display = "block";
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  showSlide(currentIndex);
}

function previousSlide() {
  currentIndex =
    (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  showSlide(currentIndex);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000);
}

export function crouselComponent(products) {
  const container = document.getElementById("root");

  const crouselPage = document.createElement("div");
  crouselPage.classList.add("crousel-page");
  crouselPage.id = "crousel-page";
  crouselPage.style.textAlign = "center";
  crouselPage.style.position = "relative";

  const crouselContainer = document.createElement("div");
  crouselContainer.classList.add("crousel-container");
  crouselContainer.id = "crousel-container";
  crouselContainer.style.width = "100%";
  crouselContainer.style.height = "400px";
  crouselContainer.style.overflow = "hidden";
  crouselContainer.style.position = "realtive";
  crouselPage.style.margin = "2% 10%";

  products.map((product) => {
    let crouselItem = document.createElement("div");
    crouselItem.classList.add("carousel-item");
    crouselItem.style.width = "100%";
    crouselItem.style.height = "100%";
    crouselItem.style.display = "none";

    let contentContainer = document.createElement("div");
    contentContainer.style.display = "flex";
    contentContainer.style.justifyContent = "flex-start";
    contentContainer.style.textAlign = "left";
    contentContainer.style.width = "100%";
    contentContainer.style.height = "100%";

    let crouselimage = document.createElement("img");
    crouselimage.src = product.thumbnail;
    crouselimage.style.width = "50%";
    crouselimage.style.height = "100%";

    const discContainer = document.createElement("div");
    discContainer.style.margin = "0 10px";

    let title = document.createElement("h2");
    title.textContent = product.title;

    let description = document.createElement("p");
    description.textContent = product.description;

    let price = document.createElement("span");
    price.textContent = `Price: $${product.price}`;
    price.style.fontWeight = "bold";

    const imageContainer = document.createElement("div");
    imageContainer.style.display = "flex";
    imageContainer.style.padding = "10px";

    product.images.map((image) => {
      let createImage = document.createElement("img");
      createImage.src = image;
      createImage.style.cssText = `
          width: 20%;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin: 10px;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;`;

      imageContainer.appendChild(createImage);
    });

    discContainer.appendChild(title);
    discContainer.appendChild(description);
    discContainer.appendChild(price);
    discContainer.appendChild(imageContainer);
    contentContainer.appendChild(crouselimage);
    contentContainer.appendChild(discContainer);
    crouselItem.appendChild(contentContainer);
    crouselContainer.appendChild(crouselItem);
  });

  const prevButton = document.createElement("button");
  prevButton.classList.add("carousel-btn");
  prevButton.id = "prevBtn";
  prevButton.textContent = "<";
  prevButton.style.top = "50%";
  prevButton.style.position = "absolute";
  prevButton.style.left = "0";
  prevButton.style.display = "inline-block";
  prevButton.style.fontSize = "16px";
  prevButton.style.cursor = "pointer";
  prevButton.style.textAlign = "center";
  prevButton.style.textDecoration = "black";
  prevButton.style.outline = "none";
  prevButton.style.color = "black";
  prevButton.style.border = "none";
  prevButton.style.borderRadius = "15px";
  prevButton.style.transitionDuration = "0.4s";

  const nextButton = document.createElement("button");
  nextButton.classList.add("carousel-btn");
  nextButton.id = "nextBtn";
  nextButton.textContent = ">";
  nextButton.style.position = "absolute";
  nextButton.style.top = "50%";
  nextButton.style.right = "0px";
  nextButton.style.display = "inline-block";
  nextButton.style.fontSize = "16px";
  nextButton.style.cursor = "pointer";
  nextButton.style.textAlign = "center";
  nextButton.style.textDecoration = "black";
  nextButton.style.outline = "none";
  nextButton.style.color = "black";
  nextButton.style.border = "none";
  nextButton.style.borderRadius = "15px";
  nextButton.style.transitionDuration = "0.4s";

  crouselPage.appendChild(crouselContainer);
  crouselPage.appendChild(prevButton);
  crouselPage.appendChild(nextButton);

  container.appendChild(crouselPage);

  carouselItems = document.querySelectorAll(".carousel-item");

  showSlide(currentIndex);

  document.getElementById("nextBtn").addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    previousSlide();
    resetAutoSlide();
  });

  autoSlideInterval = setInterval(nextSlide, 5000);
}
