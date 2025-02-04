import { useState } from "react";
import { finalizeOrder } from "../Redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  FaUser,
  FaMapPin,
  FaCity,
  FaAddressCard,
  FaPhone,
  FaMailBulk,
} from "react-icons/fa";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Box,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Image,
} from "@chakra-ui/react";
const Checkout = () => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    postalCode: "",
    country: "",
    city: "",
    phoneNumber: "",
    email: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(finalizeOrder(formData));
    console.log("Order submitted:", formData, items, totalAmount);

    setFormData({
      name: "",
      address: "",
      postalCode: "",
      country: "",
      city: "",
      phoneNumber: "",
      email: "",
    });
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  return (
    <Container
      p={4}
      border={"1px solid grey"}
      mx={"auto"}
      borderRadius={"lg"}
      boxShadow={"lg"}
    >
      <Text
        color={"blue.400"}
        fontSize={"lg"}
        fontWeight={"bold"}
        mb={4}
        textAlign={"center"}
      >
        Checkout Form
      </Text>

      {showAlert && (
        <Box zIndex={2000} position={"fixed"} top={0} right={0} left={0}>
          <Alert
            status="success"
            mb={4}
            borderRadius={"md"}
            color={"blue.700"}
            bg={"blue.100"}
          >
            <AlertIcon />
            <Box flex={1}>
              <AlertTitle>Order submitted</AlertTitle>
              <AlertDescription>
                Your order has been submitted successfuly!
              </AlertDescription>
            </Box>
            <CloseButton
              onClick={() => setShowAlert(false)}
              position={"absolute"}
              top={"8px"}
              right={"8px"}
            />
          </Alert>
        </Box>
      )}
      <VStack
        as={"form"}
        onSubmit={handleSubmit}
        spacing={[3, 5]}
        w={"100% 80% 60%"}
      >
        <FormControl isInvalid={!formData.name}>
          <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
            Enter Name
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <FaUser color="grey" />
            </InputLeftElement>
            <Input
              type="text"
              _placeholder={"fontsize:3, color:gray.400"}
              placeholder="Enter your name"
              _hover={{ background: "blue.700", color: "white" }}
              _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>Name is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formData.postalCode}>
          <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
            Enter your Postal Code
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <FaMapPin color="grey" />
            </InputLeftElement>
            <Input
              type="text"
              name="postalCode"
              _hover={{ background: "blue.700", color: "white" }}
              _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
              placeholder="Enter your postal code"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>postal code is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!formData.phoneNumber}>
          <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
            Enter your phone number
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <FaPhone color="grey" />
            </InputLeftElement>
            <Input
              type="text"
              name="phoneNumber"
              _hover={{ background: "blue.700", color: "white" }}
              _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>phone number is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!formData.email}>
          <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
            Enter your email
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <FaMailBulk color="grey" />
            </InputLeftElement>
            <Input
              type="email"
              name="email"
              _hover={{ background: "blue.700", color: "white" }}
              _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>Email is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formData.city}>
          <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
            Enter your City
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <FaCity color="grey" />
            </InputLeftElement>
            <Input
              type="text"
              name="city"
              placeholder="Enter your city"
              _hover={{ background: "blue.700", color: "white" }}
              _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
              value={formData.city}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>city name is required.</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!formData.country}>
          <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
            Enter Country
          </FormLabel>
          <InputGroup>
            <Select
              type="text"
              placeholder="select your country"
              _hover={{ background: "blue.700", color: "white" }}
              _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="Kenya">Kenya</option>
              <option value="USA">USA</option>
              <option value="Korea">Korea</option>
              <option value="London">London</option>
            </Select>
          </InputGroup>
          <FormErrorMessage>country name is required.</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!formData.address}>
          <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
            Enter your Postal Address
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"}>
              <FaAddressCard color="gray" />
            </InputLeftElement>
            <Input
              type="text"
              name="address"
              placeholder="Enter your address"
              _hover={{ background: "blue.700", color: "white" }}
              _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
              value={formData.address}
              onChange={handleChange}
            />
          </InputGroup>
          <FormErrorMessage>address is required.</FormErrorMessage>
        </FormControl>
        <Box mt={4}>
          <Text>Total Amount: ${totalAmount.toFixed(2)}</Text>
        </Box>
        <Box mt={4}>
          <Text fontWeight={"bold"} fontSize={"lg"} color={"blue.300"}>
            Payment Method
          </Text>
          <Box display={"flex"} alignItems={"center"} mb={4}>
            <Image src="/images/visa.png" alt="visa" boxSize={"40px"} mr={3} />
            <Image
              src="/images/mastercard.png"
              alt="mastercard"
              boxSize={"40px"}
              mr={3}
            />
            <Image
              src="/images/paypal.png"
              alt="paypal"
              boxSize={"40px"}
              mr={3}
            />
          </Box>
          <Select
            placeholder="select payment method"
            _hover={{ background: "blue.700", color: "white" }}
            _focus={{ border: "blue.100", boxShadow: "0 0 0 1px blue.300" }}
            name="paymentMethod"
            onChange={handleChange}
          >
            <option value={"paypal"}>Paypal</option>
            <option value={"visa"}>Visa</option>
            <option value={"Mastercard"}>MasterCard</option>
          </Select>
        </Box>
        <Button type="submit" alignItems={"center"}>
          Submit
        </Button>
      </VStack>
    </Container>
  );
};

export default Checkout;
