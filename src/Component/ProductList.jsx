import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../Utills/Api";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { motion, AnimatePresence } from "framer-motion";

import {
  Box,
  Container,
  Grid,
  Image,
  Spinner,
  Text,
  Link,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const ProductList = ({ searchQuery }) => {
  const dispatch = useDispatch();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 0,
  });
  console.log("Fetched products:", products);

  const filteredProducts = products
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  console.log(filteredProducts);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!products) return null;

  if (isLoading)
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <Spinner size={"lg"} />
      </Box>
    );
  if (isError) return <Box>Failed to load products...</Box>;
  return (
    <Container
      as={Grid}
      gridTemplateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(2 ,1fr )",
        md: "repeat(3,1fr)",
        lg: "repeat(4,1fr)",
      }}
      maxW={"100%"}
      width={"100vw"}
      gap={10}
      p={5}
    >
      <AnimatePresence>
        {filteredProducts.map((product) => (
          <>
            <Box
              key={product.id}
              as={motion.div}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              whileHover={{ scale: 1.05 }}
              border={"1px solid gray"}
              borderColor={"gray.100"}
              boxShadow={"md"}
              borderRadius={5}
              p={4}
              overflow={"hidden"}
              transition={"boxShadow 0.2s ease"}
              _hover={{ boxShadow: "xl" }}
            >
              <Image
                w={"100%"}
                h={"200px"}
                objectFit={"cover"}
                borderRadius={"md"}
                src={product.image}
                alt={product.title}
              />
              <Box p={4}>
                <Text fontSize={"lg"} noOfLines={1} fontWeight={"bold"}>
                  {product.title}
                </Text>
                <Text fontSize={"sm"} noOfLines={2} color={"blue.500"}>
                  ${product.price}
                </Text>
                <Link
                  as={RouterLink}
                  to={`/product/${product.id}`}
                  color="blue.600"
                  textDecoration="underline"
                >
                  View Details
                </Link>
              </Box>
              <Button
                onClick={() => handleAddToCart(product)}
                colorScheme="red"
              >
                Add
              </Button>
            </Box>
          </>
        ))}
      </AnimatePresence>
    </Container>
  );
};

export default ProductList;

ProductList.propTypes = {
  searchQuery: PropTypes.string.isRequired,
};
