import { Route, Routes } from "react-router-dom";
import ProductList from "./Component/ProductList";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "./Utills/Api";

import { useState } from "react";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";
import Home from "./Component/Home";
import Layout from "./Layout/Layout";
import { Box } from "@chakra-ui/react";
const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
  });

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <Box textAlign="center" mt={20}>
        Loading products...
      </Box>
    );
  }

  if (isError) {
    return (
      <Box textAlign="center" mt={20}>
        Failed to load products.
      </Box>
    );
  }

  const filteredProducts = products?.filter((product) => {
    const name = product.name || product.title || "";
    const productCategory = product.category?.toLowerCase().trim();
    const selected = selectedCategory?.toLowerCase().trim();

    const matchesSearch = name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selected === "all" || productCategory === selected;

    return matchesSearch && matchesCategory;
  });

  return (
    <Box w={"100vw"}>
      <Routes>
        <Route
          element={
            <Layout
              searchQuery={searchQuery}
              onSearchQuery={handleSearchQuery}
              onCategorySelect={setSelectedCategory}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route
            path="/shop"
            element={
              <ProductList
                products={filteredProducts || []}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </Box>
  );
};
export default App;
