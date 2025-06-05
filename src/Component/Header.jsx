import {
  Box,
  Flex,
  IconButton,
  Input,
  Link,
  Text,
  Badge,
  Button,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

const Header = ({ searchQuery, onSearchQuery, onCategorySelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleSearch = (e) => {
    onSearchQuery(e.target.value);
    console.log("Searched Query:", searchQuery);
  };

  const categories = [
    "All",
    "Men's Clothing",
    "Women's Clothing",
    "Electronics",
    "Jewelery",
  ];

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="10"
      bg="white"
      boxShadow="md"
      p={4}
    >
      <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
        {/* Logo */}
        <Text fontWeight="bold" fontStyle="italic" fontSize="2xl" color="gold">
          Trendify&apos;s Store
        </Text>

        {/* Search Bar */}
        <Input
          placeholder="Enter products"
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          textColor={"black"}
          maxW="40%"
          display={{ base: "none", lg: "block" }}
          autoFocus
          _focus={{ border: "1px solid gray", boxShadow: "md" }}
          _placeholder={{ color: "gray.600", fontSize: "md" }}
          border={"1px solid gray"}
          _hover={{ border: "1px solid gray" }}
        />

        {/* Category Dropdown */}
        <Box
          position="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Button
            rightIcon={<FaChevronDown />}
            textColor="gray.600"
            variant="outline"
          >
            Category
          </Button>

          {showDropdown && (
            <VStack
              position="absolute"
              top="100%"
              left="0"
              bg="white"
              boxShadow="md"
              p={2}
              align="stretch"
              borderRadius="md"
              spacing={1}
              zIndex={20}
            >
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant="ghost"
                  justifyContent="flex-start"
                  onClick={() => {
                    onCategorySelect(cat);
                    setShowDropdown(false);
                  }}
                  backgroundColor={"gray.600"}
                  _hover={{ background: "gray.300" }}
                >
                  {cat}
                </Button>
              ))}
            </VStack>
          )}
        </Box>

        {/* Desktop Nav */}
        <Flex gap={4} display={{ base: "none", lg: "flex" }}>
          <Link as={RouterLink} to="/" color="gray.700" fontSize="lg">
            Home
          </Link>
          <Link as={RouterLink} to="/shop" color="gray.700" fontSize="lg">
            Shop
          </Link>
        </Flex>
        {/* Cart */}
        <Box position="relative" display="inline-block">
          <IconButton
            icon={<FiShoppingCart />}
            aria-label="Cart"
            onClick={() => navigate("/cart")}
            fontSize="2xl"
            color="black"
            variant="ghost"
          />
          {totalQuantity > 0 && (
            <Badge
              position="absolute"
              top="0"
              right="0"
              transform="translate(50%, -50%)"
              bg="red.500"
              color="white"
              fontSize="xs"
              fontWeight="bold"
              px={2}
              height="20px"
              minWidth="20px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              boxShadow="0 0 6px rgba(0,0,0,0.15)"
              userSelect="none"
              pointerEvents="none"
            >
              {totalQuantity > 99 ? "99+" : totalQuantity}
            </Badge>
          )}
        </Box>

        {/* Hamburger Icon */}
        <Box display={{ base: "block", lg: "none" }}>
          <IconButton
            icon={<HamburgerIcon boxSize={8} />}
            aria-label="Toggle Menu"
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            background="gray.500"
          />
        </Box>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box
          mt={4}
          display={{ base: "block", lg: "none" }}
          bg="white"
          p={4}
          boxShadow="md"
          borderRadius="md"
        >
          <Input
            placeholder="Enter products"
            value={searchQuery}
            onChange={handleSearch}
            mb={3}
            borderColor="gray.400"
            _placeholder={{ color: "gray.600", fontSize: "md" }}
          />
          <Link
            as={RouterLink}
            to="/"
            display="block"
            mb={2}
            color="gray.700"
            fontSize="lg"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/shop"
            display="block"
            color="gray.700"
            fontSize="lg"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
        </Box>
      )}
    </Box>
  );
};

Header.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchQuery: PropTypes.func.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};

export default Header;
