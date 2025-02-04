import { Route, Routes } from "react-router-dom";
import ProductList from "./Component/ProductList";
import ProductDetails from "./Component/ProductDetails";
import Header from "./Component/Header";
import { useState } from "react";
import Cart from "./Component/Cart";
import Checkout from "./Component/Checkout";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchQuery = (query) => {
    setSearchQuery(query);
    console.log("Searched product:", query);
  };
  return (
    <>
      <Header
        searchQuery={searchQuery || ""}
        onSearchQuery={handleSearchQuery}
      />
      <Routes>
        <Route
          path="/"
          element={<ProductList searchQuery={searchQuery || ""} />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
