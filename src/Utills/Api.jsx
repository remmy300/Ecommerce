import axios from "axios";

const base_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${base_URL}/products`);

    console.log("Api response:", response.data);

    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error("Error Fetching Products:", error);
    return [];
  }
};

export const fetchProductsById = async (id) => {
  const response = await axios.get(`${base_URL}/products/${id}`);
  return Array.isArray(response.data) ? response.data : [];
};
