import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Select,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import hero from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../Utills/Api";
import { useQuery } from "@tanstack/react-query";
import Rating from "./Rating";
import { addToCart } from "../Redux/CartSlice";
import { useDispatch } from "react-redux";
import {
  CheckIcon,
  RepeatClockIcon,
  LockIcon,
  PhoneIcon,
} from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";
import { MdPayment } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 0,
  });
  console.log(products);

  const featuredProducts = Array.isArray(products) ? products.slice(0, 3) : [];

  if (isLoading)
    return (
      <div className="justify-center items-center h-[100vh]">
        <Spinner size={"md"} />
      </div>
    );
  if (isError) return <div>Error loading data</div>;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      <Box position="relative" w="100vw" h="100vh" overflow="hidden">
        <Box
          position="fixed"
          top={0}
          left={0}
          zIndex={-1}
          w="100vw"
          h="100vh"
          overflow="hidden"
        >
          <Box
            as="img"
            src={hero}
            alt="hero"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>

        <Container
          position="relative"
          zIndex={1}
          centerContent
          h="100%"
          maxW="container.md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="whiteAlpha.800"
            p={8}
            borderRadius="lg"
            textAlign="center"
            boxShadow="lg"
          >
            <Text fontSize="3xl" fontWeight="bold" color="gray.700">
              Welcome to Remmy&apos;s Store
            </Text>
            <Text mt={2} fontSize={"2xl"} textColor={"black"}>
              Explore the best deals curated just for you!
            </Text>
            <Button
              onClick={() => navigate("/shop")}
              rounded={"md"}
              mt={5}
              border={"1px solid gray"}
              textColor={"gray.600"}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>
      {/* Featured products */}
      <Box
        overflowX={"hidden"}
        width="100vw"
        backgroundColor={"whiteAlpha.700"}
        margin={5}
        p={5}
        textColor={"black"}
      >
        <Box textAlign={"center"} mb={5}>
          <Text fontSize={"3xl"} fontWeight={"semibold"}>
            Featured Products
          </Text>
          <Text fontSize={"lg"}>
            Discover our handpicked selection of our products
          </Text>
        </Box>
        <Box
          height={1}
          width={100}
          borderRadius={"md"}
          backgroundColor={"black"}
          display={"block"}
          m={"auto"}
        ></Box>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={5}
          padding={3}
          zIndex={1}
          m={10}
        >
          {featuredProducts.map((product) => (
            <Box
              key={product.id}
              borderBottom={"1px"}
              borderColor={"gray.400"}
              overflow={"hidden"}
              borderRadius={"md"}
              boxShadow={"lg"}
              background={"whiteAlpha.900"}
              textColor={"black"}
              p={4}
              _hover={{ transform: "scale 1.05" }}
            >
              <Image
                src={product.image}
                alt={product.title}
                height={"200px"}
                mx={"auto"}
                objectFit={"contain"}
              />
              <Text fontSize={"xl"} fontWeight={"bold"} noOfLines={1}>
                {product.title}
              </Text>
              <Text fontSize={"md"} fontWeight={"semibold"}>
                ${product.price}
              </Text>
              <Flex wrap={"nowrap"}>
                <Rating rating={product.rating.rate} />

                <span>({product.rating.count})reviews</span>
              </Flex>
              <Text fontSize={"lg"} lineHeight={7} noOfLines={3}>
                {product.description}
              </Text>
              <Flex m={5} gap={5} justifyItems={"center"} alignItems={"center"}>
                <Text>Quantity:</Text>
                <Select
                  w={20}
                  background={"white"}
                  border={"1px solid black"}
                  _hover={{ border: "1px solid gray" }}
                  _focus={{ border: "1px solid black", boxShadow: "md" }}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value="i + 1">
                      {i + 1}
                    </option>
                  ))}
                </Select>
              </Flex>

              <Button
                background={"whiteAlpha.700"}
                border={"1px solid black"}
                textColor={"black"}
                _hover={{ background: "white.400" }}
                width="full"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Box>
          ))}
        </SimpleGrid>
        <Button
          onClick={() => navigate("/shop")}
          display={"block"}
          margin={"auto"}
          border={"1px solid black"}
          textColor={"black"}
          borderRadius={"md"}
        >
          View All Products
        </Button>
      </Box>
      <Container background={"whiteAlpha.700"} maxW={"100%"} m={5}>
        <Box textAlign={"center"} textColor={"black"} m={6}>
          <Text fontSize={"3xl"} fontWeight={"bold"}>
            Why Choose Us
          </Text>
          <Text fontSize={"md"}>
            We take pride in offering the best shopping experience
          </Text>
        </Box>
        <Box
          height={1}
          width={100}
          borderRadius={"md"}
          backgroundColor={"black"}
          display={"block"}
          m={"auto"}
        ></Box>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} p={10} m={5}>
          {[
            {
              icon: CheckIcon,
              title: "Quality Products",
              desc: "We source the finest products from trusted suppliers. Every item is inspected for exceptional quality.",
            },
            {
              icon: RepeatClockIcon,
              title: "Fast Shipping",
              desc: "Experience fast delivery with our optimized logistics. We ship quickly and reliably.",
            },
            {
              icon: LockIcon,
              title: "Secure Payments",
              desc: "Your transactions are protected with industry-leading encryption. Shop with peace of mind.",
            },
          ].map(({ icon, title, desc }, index) => (
            <Flex
              key={index}
              direction="column"
              align="center"
              bg="white"
              p={5}
              borderRadius="md"
              boxShadow="md"
            >
              <Box
                bg="yellow.300"
                p={4}
                rounded="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={icon} boxSize={5} />
              </Box>
              <Text mt={3} fontSize="xl" fontWeight="bold " textColor={"black"}>
                {title}
              </Text>
              <Text textAlign="center" color="gray.700" mt={2}>
                {desc}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
        <Flex justify="center" gap={4} mt={8} wrap="wrap">
          <Button
            leftIcon={<CheckIcon />}
            color="green"
            background={"green.200"}
            variant="subtle"
          >
            100% Satisfaction
          </Button>
          <Button
            leftIcon={<Icon as={MdPayment} />}
            color="blue"
            background={"blue.200"}
            variant="subtle"
          >
            Money-Back Guarantee
          </Button>
          <Button
            leftIcon={<PhoneIcon />}
            color="purple"
            variant="subtle"
            background={"purple.200"}
          >
            24/7 Support
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
