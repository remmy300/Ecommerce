import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { HStack, Icon } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Rating = ({ rating }) => {
  let stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<Icon as={FaStar} color={"yellow.400"} key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<Icon as={FaStarHalfAlt} color={"yellow.400"} key={i} />);
    } else {
      stars.push(<Icon as={FaRegStar} key={i} color={"gray.300"} />);
    }
  }
  return <HStack spacing={1}>{stars}</HStack>;
};

export default Rating;

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};
