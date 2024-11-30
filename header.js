import { createModal } from "./home.js";

const openLoginModel = () => {
  // Overlay
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

  // Modal content
  const modal = document.createElement("div");
  modal.style.backgroundColor = "#fff";
  modal.style.position = "relative";
  modal.style.padding = "20px";
  modal.style.borderRadius = "8px";
  modal.style.width = "80%";
  modal.style.maxWidth = "450px";
  modal.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  modal.style.textAlign = "center";

  // Close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.postion = "relative";
  closeButton.style.top = "0";
  closeButton.style.right = "0";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.background = "transparent";

  closeButton.onclick = () => {
    document.body.removeChild(overlay);
  };

  modal.appendChild(closeButton);

  const loginTitle = document.createElement("h2");
  loginTitle.classList.add("login-heading");
  loginTitle.id = "logim-heading";
  loginTitle.textContent = "Login";

  modal.appendChild(loginTitle);

  const content = document.createElement("div");
  content.classList.add("login-content");
  content.style.textAlign = "center";

  const phoneField = document.createElement("input");
  phoneField.classList.add("phone-field");
  phoneField.id = "phone-field";
  phoneField.placeholder = "Enter Phone or Email";
  phoneField.style.display = "block";
  phoneField.style.margin = "10px";
  phoneField.style.width = "90%";
  phoneField.setAttribute("type", "text");
  phoneField.style.height = "30px";

  const passField = document.createElement("input");
  passField.classList.add("pass-field");
  passField.id = "pass-field";
  passField.placeholder = "Enter Password";
  passField.style.display = "block";
  passField.style.margin = "10px";
  passField.style.width = "90%";

  passField.setAttribute("type", "password");
  passField.style.height = "30px";

  content.appendChild(phoneField);
  content.appendChild(passField);

  modal.appendChild(content);

  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.style.marginTop = "10px";
  loginButton.style.padding = "10px 20px";
  loginButton.style.border = "none";
  loginButton.style.backgroundColor = "blue";
  loginButton.style.color = "#fff";
  loginButton.style.borderRadius = "5px";
  loginButton.style.cursor = "pointer";

  modal.appendChild(loginButton);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
};

export const cartDrawer = (cartItems, onClose) => {
  // Overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  overlay.style.zIndex = "1000";
  overlay.style.transition = "opacity 0.3s ease";

  // Drawer content
  const drawer = document.createElement("div");
  drawer.style.position = "fixed";
  drawer.style.top = "0";
  drawer.style.right = "0";
  drawer.style.height = "100%";
  drawer.style.width = "30%";
  drawer.style.maxWidth = "400px";
  drawer.style.backgroundColor = "#fff";
  drawer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.3)";
  drawer.style.padding = "20px";
  drawer.style.overflowY = "auto";
  drawer.style.transform = "translateX(100%)";
  drawer.style.transition = "transform 0.3s ease";

  // Close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.border = "none";
  closeButton.style.cursor = "pointer";
  closeButton.style.background = "transparent";
  closeButton.style.fontSize = "20px";

  closeButton.onclick = () => {
    drawer.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(overlay);
      onClose();
    }, 300);
  };

  // Cart title
  const cartTitle = document.createElement("h2");
  cartTitle.textContent = "Your Cart";
  cartTitle.style.marginBottom = "20px";

  // Cart items container
  const cartContent = document.createElement("div");
  cartContent.style.display = "flex";
  cartContent.style.flexDirection = "column";
  cartContent.style.gap = "15px";

  const subtotalContainer = document.createElement("div");
  subtotalContainer.style.marginTop = "20px";
  subtotalContainer.style.fontWeight = "bold";
  subtotalContainer.style.fontSize = "18px";

  let subtotal = 0;

  const updateSubtotal = () => {
    subtotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    subtotalContainer.textContent = `Subtotal: $ ${subtotal.toFixed(2)}`;
  };

  cartItems.forEach((item, index) => {
    const itemContainer = document.createElement("div");
    itemContainer.style.display = "flex";
    itemContainer.style.position = "relative";
    itemContainer.style.gap = "15px";
    itemContainer.style.borderBottom = "1px solid #ccc";
    itemContainer.style.paddingBottom = "10px";

    const removeItemButton = document.createElement("button");
    removeItemButton.textContent = "X";
    removeItemButton.style.position = "absolute";
    removeItemButton.style.top = "0";
    removeItemButton.style.right = "0";
    removeItemButton.style.border = "none";
    removeItemButton.style.cursor = "pointer";
    removeItemButton.style.background = "transparent";

    removeItemButton.onclick = () => {
      cartItems = cartItems.filter((i) => i.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      document.body.removeChild(overlay);
      cartDrawer(cartItems);
    };

    const img = document.createElement("img");
    img.src = item.thumbnail;
    img.alt = item.title;
    img.style.width = "60px";
    img.style.height = "60px";
    img.style.objectFit = "cover";
    img.style.cursor = "pointer";

    img.onclick = () => createModal(item);

    const info = document.createElement("div");
    info.style.flex = "1";

    const title = document.createElement("h3");
    title.textContent = item.title;
    title.style.margin = "0";
    title.style.fontSize = "16px";

    const description = document.createElement("p");
    description.textContent = item.description;
    description.style.margin = "5px 0";
    description.style.fontSize = "14px";
    description.style.color = "#666";

    const price = document.createElement("p");
    price.textContent = `Price: $${item.price}`;
    price.style.margin = "0";
    price.style.fontSize = "14px";

    const quantityControls = document.createElement("div");
    quantityControls.style.display = "flex";
    quantityControls.style.alignItems = "center";
    quantityControls.style.gap = "10px";

    if (!item.hasOwnProperty("quantity")) {
      item.quantity = 1;
    }

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.style.cursor = "pointer";
    decrementButton.style.border = "1px solid #ccc";
    decrementButton.style.padding = "5px 10px";

    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.style.cursor = "pointer";
    incrementButton.style.border = "1px solid #ccc";
    incrementButton.style.padding = "5px 10px";

    const quantityDisplay = document.createElement("span");
    quantityDisplay.textContent = item.quantity;
    quantityDisplay.style.fontWeight = "bold";

    decrementButton.onclick = () => {
      if (item.quantity > 1) {
        item.quantity--;
        quantityDisplay.textContent = item.quantity;
        updateSubtotal();
      }
    };

    incrementButton.onclick = () => {
      item.quantity++;
      quantityDisplay.textContent = item.quantity;
      updateSubtotal();
    };

    quantityControls.appendChild(decrementButton);
    quantityControls.appendChild(quantityDisplay);
    quantityControls.appendChild(incrementButton);

    info.appendChild(title);
    info.appendChild(description);
    info.appendChild(price);
    info.appendChild(quantityControls);

    itemContainer.appendChild(removeItemButton);
    itemContainer.appendChild(img);
    itemContainer.appendChild(info);

    cartContent.appendChild(itemContainer);
  });

  updateSubtotal();

  drawer.appendChild(closeButton);
  drawer.appendChild(cartTitle);
  drawer.appendChild(cartContent);
  drawer.appendChild(subtotalContainer);

  // Add to overlay
  overlay.appendChild(drawer);
  document.body.appendChild(overlay);

  // Show drawer
  setTimeout(() => {
    drawer.style.transform = "translateX(0)";
  }, 10);
};

export function headerComponent(cartItems) {
  const container = document.getElementById("root");

  const header = document.createElement("div");
  header.classList.add("header");
  header.id = "header";
  header.style.backgroundColor = "#2874F0";
  header.style.color = "white";

  header.style.position = "sticky";

  const headerContainer = document.createElement("div");
  headerContainer.classList.add("header-container");
  headerContainer.id = "header-container";

  // Logo Field

  const logo = document.createElement("div");
  logo.classList.add("header-logo");
  logo.id = "header-logo";

  const logoImage = document.createElement("img");
  logoImage.classList.add("header-logo-img");
  logoImage.id = "header-logo-img";
  logoImage.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxggIt5CPQqUxKi3eW4QhNIKv5eH5LdhRwMA&s";

  logo.appendChild(logoImage);

  const logoText = document.createElement("h2");
  logoText.classList.add("header-logo-text");
  logoText.id = "header-logo-text";
  logoText.textContent = "Filpkart";

  logo.appendChild(logoText);

  // Search Field

  const search = document.createElement("div");
  search.classList.add("search");
  search.id = "search";
  search.style.height = "30px";

  const searchField = document.createElement("input");
  searchField.classList.add("search-field");
  searchField.id = "search-field";
  searchField.placeholder = "Search products, watches and more";
  searchField.setAttribute("type", "text");
  searchField.style.width = "600px";
  searchField.style.height = "100%";
  searchField.style.borderRadius = "8px";
  searchField.style.border = "none";

  search.appendChild(searchField);

  const searchButton = document.createElement("button");
  searchButton.classList.add("search-button");
  searchButton.id = "search-button";
  searchButton.textContent = "Search";
  searchButton.style.height = "100%";
  searchButton.style.border = "none";
  searchButton.style.borderRadius = "8px";
  searchButton.style.cursor = "pointer";

  search.appendChild(searchButton);

  // Navigation Button Field

  const navButton = document.createElement("div");
  navButton.classList.add("btn");
  navButton.id = "btn";

  const navButtonLogin = document.createElement("button");
  navButtonLogin.classList.add("login-button");
  navButtonLogin.classList.add("nav-btn");
  navButtonLogin.id = "nav-btn";
  navButtonLogin.textContent = "Login";
  navButtonLogin.style.height = "30px";
  navButtonLogin.style.border = "none";
  navButtonLogin.style.borderRadius = "8px";
  navButtonLogin.style.cursor = "pointer";

  navButtonLogin.onclick = () => openLoginModel();

  navButton.appendChild(navButtonLogin);

  const navButtonCart = document.createElement("button");
  navButtonCart.classList.add("cart-button");
  navButtonCart.classList.add("nav-btn");
  navButtonCart.id = "nav-btn";
  navButtonCart.style.height = "30px";
  navButtonCart.style.border = "none";
  navButtonCart.style.borderRadius = "8px";
  navButtonCart.style.cursor = "pointer";

  navButtonCart.textContent = `🛒 Cart`;
  navButtonCart.onclick = () => cartDrawer(cartItems);

  navButton.appendChild(navButtonCart);

  // header container logo, search and login + cart Button

  headerContainer.appendChild(logo);
  headerContainer.appendChild(search);
  headerContainer.appendChild(navButton);

  header.appendChild(headerContainer);
  container.appendChild(header);

  // styling

  document.getElementById("header-container").style.margin = "0 20%";
  document.getElementById("header-container").style.display = "flex";
  document.getElementById("header-container").style.justifyContent =
    "space-between";
  document.getElementById("header-container").style.alignItems = "center";

  document.getElementById("header-logo").style.padding = "3px";
  document.getElementById("header-logo").style.alignItems = "center";

  document.getElementById("header-logo").style.display = "flex";
  document.getElementById("header-logo-img").style.width = "50px";
  document.getElementById("header-logo-img").style.height = "50px";
  document.getElementById("header-logo-img").style.margin = "0 10px";

  var element = document.getElementsByClassName("nav-btn");

  for (let i = 0; i < element.length; i++) {
    element[i].style.margin = "0 5px";
  }
}
