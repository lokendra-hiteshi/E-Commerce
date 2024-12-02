
let cart = JSON.parse(localStorage.getItem("cart")) || [];

export const getCart = () => {
  return cart;
};

export const updateCart = (product, action) => {
  const productIndex = cart.findIndex((item) => item.id === product.id);

  if (action === "add" && productIndex === -1) {
    cart.push(product);
  } else if (action === "remove" && productIndex !== -1) {
    cart.splice(productIndex, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
};

export const clearCart = () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const createModal = (product) => {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "1000";

  const modal = document.createElement("div");
  modal.style.backgroundColor = "#fff";
  modal.style.padding = "20px";
  modal.style.borderRadius = "8px";
  modal.style.width = "80%";
  modal.style.maxWidth = "500px";
  modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  modal.style.textAlign = "center";

  const content = document.createElement("div");
  content.classList.add("prod-content");
  content.style.cssText = `
      display: flex;
      justify-content: flext-start;
      text-align: left;
    `;

  let productImage = document.createElement("img");
  productImage.classList.add("prod-model-img");
  productImage.src = product.thumbnail;
  productImage.style.cssText = `
      width: 40%;
      height: 200px;
    `;

  const discContainer = document.createElement("div");
  discContainer.classList.add("dics");

  const title = document.createElement("h2");
  title.textContent = product.title;

  const description = document.createElement("p");
  description.textContent = product.description;

  const price = document.createElement("span");
  price.textContent = `Price: $${product.price}`;
  price.style.fontWeight = "bold";

  const relatedButtons = document.createElement("div");
  relatedButtons.classList.add("prod-btn");
  relatedButtons.style.cssText = `
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;

  const buyButton = document.createElement("button");
  buyButton.textContent = "Buy";
  buyButton.style.marginTop = "10px";
  buyButton.style.padding = "10px 20px";
  buyButton.style.border = "none";
  buyButton.style.backgroundColor = "red";
  buyButton.style.color = "#fff";
  buyButton.style.borderRadius = "5px";
  buyButton.style.cursor = "pointer";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "10px";
  closeButton.style.padding = "10px 20px";
  closeButton.style.border = "none";
  closeButton.style.backgroundColor = "#007BFF";
  closeButton.style.color = "#fff";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";

  closeButton.onclick = () => {
    document.body.removeChild(overlay);
  };

  content.appendChild(productImage);
  discContainer.appendChild(title);
  discContainer.appendChild(description);
  discContainer.appendChild(price);
  content.appendChild(discContainer);
  modal.appendChild(content);

  relatedButtons.appendChild(buyButton);
  relatedButtons.appendChild(closeButton);

  modal.appendChild(relatedButtons);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
};

export function homeComponent(products) {
  const container = document.getElementById("root");

  const home = document.createElement("div");
  home.classList.add("home");
  home.id = "home";

  const homeContainer = document.createElement("div");
  homeContainer.classList.add("home-container");
  homeContainer.id = "home-container";

  const pageTitle = document.createElement("h2");
  pageTitle.textContent = "See All Products";
  pageTitle.style.textAlign = "center";
  pageTitle.style.marginTop = "30px";
  homeContainer.appendChild(pageTitle);

  const productContainer = document.createElement("div");
  productContainer.id = "product-container";
  productContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
      padding: 10px;
      margin: 0 10%;
    `;

  products.forEach((product) => {
    productCardFunction(product, productContainer);
  });

  homeContainer.appendChild(productContainer);
  home.appendChild(homeContainer);
  container.appendChild(home);
}

export const productCardFunction = (product, productContainer) => {
  const productCard = document.createElement("div");
  productCard.classList.add("product-card");
  productCard.style.cssText = `
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
      `;

  const productImage = document.createElement("img");
  productImage.src = product.thumbnail;
  productImage.style.cssText = `
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 5px;
      `;

  const productTitle = document.createElement("p");
  productTitle.textContent = product.title;

  const inStock = document.createElement("p");
  if (product.stock) {
    inStock.textContent = `In stock ${product.stock}`;
    inStock.style.color = "green";
  } else {
    inStock.textContent = `Out of stock`;
    inStock.style.color = "red";
  }

  const productPrice = document.createElement("p");
  productPrice.textContent = `$ ${product.price}`;
  productPrice.style.fontWeight = "bold";

  const cartButton = document.createElement("button");
  cartButton.style.cssText = `
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    background-color: red;
  `;

  const isInCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.some((item) => item.id === product.id);
  };

  const updateButtonState = () => {
    if (isInCart()) {
      cartButton.textContent = "Remove From Cart";
      cartButton.style.backgroundColor = "gray";
    } else {
      cartButton.textContent = "Add To Cart";
      cartButton.style.backgroundColor = "red";
    }
  };

  updateButtonState();

  cartButton.onclick = (event) => {
    event.stopPropagation();

    const action = isInCart() ? "remove" : "add";
     updateCart(product, action);
    updateButtonState();
  
  };
  productCard.onclick = () => createModal(product);
  productCard.append(
    productImage,
    productTitle,
    productPrice,
    inStock,
    cartButton
  );
  productContainer.appendChild(productCard);
};
