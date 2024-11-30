import { headerComponent } from "./header.js";
import { crouselComponent } from "./crousel.js";
import { homeComponent } from "./home.js";

let products = [];

const fetchProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    products = data.products;
  } catch (err) {
    console.error(err);
  }
};

export const initializeApp = async () => {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  await fetchProducts();
  headerComponent(cartItems);
  crouselComponent(products);
  homeComponent(products, cartItems);
};

initializeApp();
