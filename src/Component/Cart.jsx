import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../Redux/CartSlice";
import { Box, Button, Image, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import shopping_cart from "../assets/shopping-cart.png";
import { motion, AnimatePresence } from "framer-motion";
import { DeleteIcon } from "@chakra-ui/icons";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleNavigate = () => {
    navigate("/checkout");
  };
  return (
    <Box p={4} backgroundColor={"white"}>
      {items.length === 0 ? (
        <Box textAlign={"center"}>
          <Image
            src={shopping_cart}
            alt="empty cart"
            mx={"auto"}
            h={{ base: 200, md: 300 }}
            w={{ base: 200, md: 300 }}
          />
          <Text color={"black"}>Your cart is empty.Start shopping now</Text>
          <Button onClick={() => navigate("/")} colorScheme="teal" mt={3}>
            Shop now
          </Button>
        </Box>
      ) : (
        <>
          <AnimatePresence>
            {items.map((item) => (
              <Box
                key={item.id}
                as={motion.div}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                p={5}
                display={"flex"}
                alignItems={"center"}
                flexDirection={{ sm: "column", md: "row" }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  boxSize={"200px"}
                  mr={5}
                />
                <Box flex={1} textAlign={{ sm: "center", md: "left" }}>
                  <Text fontWeight={"bold"} fontSize={"lg"} textColor={"black"}>
                    {item.title}
                  </Text>
                  <Text>Price: ${item.price}</Text>
                  <Text>Quantity: {item.quantity}</Text>
                  <Text>
                    SubTotal: ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Box>

                <DeleteIcon
                  onClick={() => handleRemove(item.id)}
                  color={"black"}
                  boxSize={10}
                />
              </Box>
            ))}
          </AnimatePresence>

          <Box mt={4}>
            <Text>Total Items: {totalQuantity}</Text>
            <Text>Total Amount: ${totalAmount.toFixed(2)}</Text>
          </Box>

          <Flex align={"center"} justify={"space-between"} gap={4} mt={3}>
            <Button onClick={handleNavigate} colorScheme="teal" mt={3}>
              Checkout
            </Button>

            <Button onClick={() => dispatch(clearCart())} colorScheme="red">
              Clear
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Cart;
