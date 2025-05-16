import { useState } from "react";
import { finalizeOrder } from "../Redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  Box,
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
    paymentMethod: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      paymentMethod: "",
    });
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "postalCode", label: "Postal Code", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "phoneNumber", label: "Phone Number", type: "tel" },
    { name: "email", label: "Email Address", type: "email" },
  ];

  return (
    <Container
      maxW="md"
      bg="white"
      p={6}
      my={8}
      borderRadius="md"
      boxShadow="lg"
    >
      <Text
        fontSize="2xl"
        fontWeight="bold"
        mb={6}
        textAlign="center"
        color="gray.700"
      >
        Checkout Form
      </Text>

      {showAlert && (
        <Box position="fixed" top={4} right={4} zIndex={2000} w="auto">
          <Alert
            status="success"
            borderRadius="md"
            boxShadow="md"
            px={4}
            py={3}
          >
            <AlertIcon />
            <Box flex="1">
              <AlertTitle>Order submitted</AlertTitle>
              <AlertDescription>
                Your order has been submitted successfully!
              </AlertDescription>
            </Box>
            <CloseButton
              onClick={() => setShowAlert(false)}
              position="absolute"
              top="8px"
              right="8px"
            />
          </Alert>
        </Box>
      )}

      <VStack as="form" spacing={4} onSubmit={handleSubmit}>
        {fields.map(({ name, label, type }) => (
          <FormControl key={name} isRequired>
            <FormLabel fontWeight="semibold" color="gray.600">
              {label}
            </FormLabel>
            <Input
              type={type}
              placeholder={`Enter your ${label.toLowerCase()}`}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              bg="gray.200"
              textColor={"gray.800"}
              _hover={{ bg: "gray.100" }}
              _focus={{
                bg: "white",
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue",
              }}
              borderRadius="md"
            />
          </FormControl>
        ))}

        <FormControl isRequired isInvalid={!formData.country}>
          <FormLabel fontWeight="semibold" color="gray.600">
            Country
          </FormLabel>
          <Select
            placeholder="Select your country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            textColor={"gray.100"}
            bg="gray.600"
            _hover={{ bg: "gray.300" }}
            _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px blue" }}
            borderRadius="md"
          >
            <option value="Kenya">Kenya</option>
            <option value="USA">USA</option>
            <option value="Korea">Korea</option>
            <option value="London">London</option>
          </Select>
        </FormControl>

        <Box w="100%" mt={4}>
          <Text fontWeight="semibold" fontSize="lg" color="gray.700" mb={3}>
            Payment Method
          </Text>
          <Flex gap={4} mb={4}>
            <Image src="/images/visa.png" alt="visa" boxSize="40px" />
            <Image
              src="/images/mastercard.png"
              alt="mastercard"
              boxSize="40px"
            />
            <Image src="/images/paypal.png" alt="paypal" boxSize="40px" />
          </Flex>
          <Select
            placeholder="Select payment method"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            textColor={"gray.100"}
            bg="gray.600"
            _hover={{ bg: "gray.300" }}
            _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px blue" }}
            borderRadius="md"
            isRequired
          >
            <option value="paypal">Paypal</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
          </Select>
        </Box>

        <Box w="100%" mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={2} textColor={"gray.800"}>
            Total Amount: ${totalAmount.toFixed(2)}
          </Text>
          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="100%"
            _hover={{ bg: "blue.600" }}
          >
            Submit Order
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default Checkout;
