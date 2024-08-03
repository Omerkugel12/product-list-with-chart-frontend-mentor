import axios from "axios";
import { Dessert } from "./types";

const DESSERT_URL = "http://localhost:8001/desserts";
const CART_URL = "http://localhost:8001/cart";

export async function fetchDesserts() {
  const { data } = await axios.get(DESSERT_URL);
  return data;
}

export async function fetchCartItems() {
  const { data } = await axios.get(CART_URL);
  return data;
}

export async function addToCart(dessert: Dessert) {
  const response = await axios.post(CART_URL, { dessert });
  return response.data;
}

export async function removeCartItem(cartItemId: string) {
  await axios.delete(`${CART_URL}/${cartItemId}`);
}
