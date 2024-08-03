import axios from "axios";

const DESSERT_URL = "http://localhost:8001/desserts";

export async function fetchDesserts() {
  const { data } = await axios.get(DESSERT_URL);
  return data;
}
