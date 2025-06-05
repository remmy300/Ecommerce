import { useState } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Button,
  Box,
  Container,
  Grid,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../Utills/Api";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import Rating from "./Rating";

const ProductList = ({ products }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState();
  const dispatch = useDispatch();

  const { isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 0,
  });

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    onClose(); // Close the modal after adding to cart
  };

  if (isLoading)
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Spinner size="lg" />
      </Box>
    );

  if (isError) return <Box>Failed to load products...</Box>;

  return (
    <Container
      as={Grid}
      gridTemplateColumns={{
        base: "repeat(1,1fr)",
        sm: "repeat(2,1fr)",
        md: "repeat(3,1fr)",
        lg: "repeat(4,1fr)",
      }}
      maxW="100%"
      gap={10}
      p={5}
      backgroundColor={"whiteAlpha.200"}
    >
      <AnimatePresence>
        {Array.isArray(products) &&
          products.map((product) => (
            <Box
              key={product.id}
              as={motion.div}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              whileHover={{ scale: 1.05 }}
              border="1px solid gray"
              borderColor="gray.100"
              boxShadow="lg"
              borderRadius={5}
              p={4}
              overflow="hidden"
              transition="boxShadow 0.2s ease"
              _hover={{ boxShadow: "xl" }}
              backgroundColor={"whiteAlpha.900"}
            >
              <Image
                w="100%"
                h="200px"
                objectFit="cover"
                borderRadius="md"
                src={product.image}
                alt={product.title}
              />
              <Box p={4}>
                <Text
                  fontSize="lg"
                  noOfLines={1}
                  fontWeight="bold"
                  textColor={"black"}
                >
                  {product.title}
                </Text>

                <Flex flexWrap={"nowrap"} textColor={"black"}>
                  <Rating rating={product.rating.rate} />
                  <span className="text-sm font-semibold text-black">
                    ({product.rating.count}reviews)
                  </span>
                </Flex>
                <Text fontSize="xl" color="goldenrod" mb={2}>
                  ${product.price}
                </Text>

                <Text fontSize="md" mb={4} noOfLines={4} textColor={"black"}>
                  {product.description}
                </Text>

                {/* Quantity Dropdown */}
                <Box mb={4}>
                  <Text fontWeight="semibold" mb={1} textColor={"black"}>
                    Quantity:
                  </Text>
                  <Select
                    placeholder="Select quantity"
                    mb="4"
                    textColor={"black"}
                    border={"1px solid black"}
                    _hover={{ border: "1px solid black" }}
                    _focus={{ border: "1px solid black", boxShadow: "md" }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </Select>
                </Box>

                <Button
                  onClick={() => handleViewDetails(product)}
                  textColor={"black"}
                  background={"gold"}
                  _hover={{ background: "yellow.400" }}
                >
                  View Details
                </Button>
              </Box>
            </Box>
          ))}
      </AnimatePresence>

      {/* Modal */}
      {selectedProduct && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          motionPreset="scale"
        >
          <ModalOverlay />
          <ModalContent maxW={"4xl"} p={4} w={"full"}>
            <ModalCloseButton />
            <ModalBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={6}
                align="start"
              >
                {/* Left Side: Image */}
                <Image
                  src={selectedProduct.image}
                  boxSize={{ base: "200px", md: "250px" }}
                  objectFit="cover"
                  borderRadius="md"
                  alt={selectedProduct.title}
                  alignItems={"center"}
                />

                {/* Right Side: Text and Button */}
                <Box flex="1">
                  <Text
                    fontSize={{ base: "2xl", md: "4xl" }}
                    fontWeight="bold"
                    mb={2}
                  >
                    {selectedProduct.title}
                  </Text>

                  {/* Rating */}
                  <Flex flexWrap={"nowrap"}>
                    <Rating rating={selectedProduct.rating.rate} /> &nbsp;
                    <span className="text-2xl font-semibold">
                      ({selectedProduct.rating.count}reviews)
                    </span>
                  </Flex>

                  <Text fontSize="xl" color="gold" mb={2}>
                    ${selectedProduct.price}
                  </Text>

                  <Text fontSize="md" mb={4}>
                    {selectedProduct.description}
                  </Text>

                  {/* Quantity Dropdown */}
                  <Box mb={4}>
                    <Text fontWeight="semibold" mb={1}>
                      Quantity:
                    </Text>
                    <Select placeholder="Select quantity" mb="4">
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Select>
                  </Box>

                  {/* Add to Cart Button */}
                  <Button
                    background={"gold"}
                    textColor={"white"}
                    _hover={{ background: "yellow.400" }}
                    width="full"
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};
