import { Box, Flex, Text, Heading, Link, Divider } from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      bg="whiteAlpha.900"
      color="black"
      p={6}
      mt={10}
      overflowX={"hidden"}
      maxW="100%"
    >
      <Flex wrap="wrap" justify="space-between" gap={10}>
        {/* About Section */}
        <Box flexBasis={{ base: "100%", md: "40%" }}>
          <Heading fontSize="lg" fontWeight="bold">
            About Trendify&apos;s Store
          </Heading>
          <Text fontSize="md" mt={4} lineHeight={6}>
            Welcome to Trendify — your go-to destination for quality products at
            unbeatable prices. We are passionate about providing a curated
            selection of essentials and trends, backed by exceptional customer
            service.
          </Text>
        </Box>

        {/* Quick Links */}
        <Box flexBasis={{ base: "100%", md: "25%" }}>
          <Heading fontSize="lg">Quick Links</Heading>
          <Flex flexDirection="column" mt={3} lineHeight={7}>
            <Link
              as={RouterLink}
              to="/"
              fontSize="md"
              _hover={{ color: "gold" }}
            >
              Home
            </Link>
            <Link
              as={RouterLink}
              to="/shop"
              fontSize="md"
              _hover={{ color: "gold" }}
            >
              Shop
            </Link>
            <Link
              as={RouterLink}
              to="/cart"
              fontSize="md"
              _hover={{ color: "gold" }}
            >
              Cart
            </Link>
          </Flex>
        </Box>

        {/* Contact Section */}
        <Box flexBasis={{ base: "100%", md: "25%" }}>
          <Heading fontSize="lg" fontWeight="bold" mb={3}>
            Contact Us
          </Heading>
          <Text fontSize="md">Email: jentahrehema7@gmail.com</Text>
          <Text fontSize="md">Phone: +2547435216</Text>
          <Text fontSize="md">Address: 126 Off Riverside Close</Text>
          <Flex gap={4} mt={4}>
            <Link href="https://facebook.com" isExternal color="blue.500">
              <FaFacebook size={28} />
            </Link>
            <Link href="https://instagram.com" isExternal color="purple.600">
              <FaInstagram size={28} />
            </Link>
            <Link href="https://linkedin.com" isExternal color="blue.700">
              <FaLinkedin size={28} />
            </Link>
          </Flex>
        </Box>
      </Flex>

      <Divider my={6} borderColor="gray.400" />

      <Text textAlign="center" fontSize="sm">
        &copy; {new Date().getFullYear()} Trendify Store. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
