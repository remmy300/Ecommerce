import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink, useParams } from "react-router-dom";
import { fetchProductsById } from "../Utills/Api";
import { Box, Image, Spinner, Text, Link } from "@chakra-ui/react";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProductsById(id),
  });

  if (isLoading)
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <Spinner />
      </Box>
    );
  if (isError) return <Text>Error loading data by id</Text>;
  return (
    <Box
      padding={3}
      textAlign={"center"}
      maxW={"500px"}
      boxShadow={"3"}
      border={"1px solid grey"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      borderRadius={"md"}
      m={"0 auto"}
      mt={5}
    >
      <Image
        src={product.image}
        height={"200px"}
        width={"100%"}
        alt={product.title}
        objectFit={"contain"}
      />
      <Text fontWeight={"bold"} fontSize={"lg"} noOfLines={1}>
        {product.title}
      </Text>
      <Text lineHeight={"1.8"}>{product.description}</Text>
      <Text>
        <strong>${product.price}</strong>
      </Text>

      <Link
        as={RouterLink}
        to="/"
        color="blue.500"
        textDecoration={"underline"}
      >
        Back Home
      </Link>
    </Box>
  );
};

export default ProductDetails;
