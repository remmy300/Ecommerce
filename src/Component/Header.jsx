import {
  Badge,
  Box,
  Flex,
  IconButton,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const Header = ({ searchQuery, onSearchQuery }) => {
  const navigate = useNavigate();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleSearch = (e) => {
    onSearchQuery(e.target.value);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };
  return (
    <>
      <Box
        backgroundColor={"teal.300"}
        p={3}
        mt={3}
        boxShadow={"md"}
        position={"sticky"}
        top={0}
        zIndex={10}
      >
        <Flex
          justify={"space-between"}
          alignItems={"center"}
          gap={6}
          wrap={"wrap"}
        >
          <Text fontWeight={"bold"} fontSize={"xl"} flexShrink={0}>
            E-Commerce Store
          </Text>

          <Input
            placeholder="Enter products"
            _placeholder={{ color: "gray.500", fontSize: "md" }}
            bg={"whiteAlpha.500"}
            value={searchQuery}
            onChange={handleSearch}
            flex={1}
            maxW={"40%"}
          />

          <Link
            as={RouterLink}
            to="/"
            textDecoration={"underline"}
            flexShrink={0}
          >
            Home
          </Link>

          <Box position={"relative"} flexShrink={0}>
            <IconButton
              icon={<FiShoppingCart />}
              aria-label="Cart"
              onClick={handleCartClick}
              fontSize={"2xl"}
              bg={"transparent"}
              _hover={{ bg: "whiteAlpha.200" }}
            />

            {totalQuantity > 0 && (
              <Badge
                position={"absolute"}
                top={"-1"}
                right={"-1"}
                bg={"red.500"}
                color={"white"}
                px={3}
                borderRadius={"full"}
              >
                {totalQuantity}
              </Badge>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Header;

Header.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
};
