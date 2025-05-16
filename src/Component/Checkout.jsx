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
  Flex,
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
        {["name", "postalCode", "address", "city", "phoneNumber", "email"].map(
          (field) => (
            <Flex key={field} direction={"column"}>
              <FormLabel fontSize={"lg"} fontWeight={"bold"} color={"blue.300"}>
                {field}
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents={"none"}></InputLeftElement>
                <Input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                      ? "phone"
                      : field === "postalCode"
                      ? "postalCode"
                      : "text"
                  }
                  _placeholder={"fontsize:3, color:gray.400"}
                  placeholder={`Your ${field}`}
                  _hover={{ background: "blue.700", color: "white" }}
                  _focus={{
                    border: "blue.100",
                    boxShadow: "0 0 0 1px blue.300",
                  }}
                  required
                  name={field}
                  value={formData.field}
                  onChange={handleChange}
                />
              </InputGroup>
            </Flex>
          )
        )}

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
        </FormControl>
      </VStack>

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
    </Container>
  );
};

export default Checkout;
