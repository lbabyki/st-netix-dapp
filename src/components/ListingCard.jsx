import {
  Box,
  Image,
  Text,
  Badge,
  VStack,
  HStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaLeaf } from 'react-icons/fa'

const ListingCard = ({ listing }) => {
  const {
    id,
    title,
    price,
    quantity,
    standard,
    location,
    image,
  } = listing

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Box
      as={RouterLink}
      to={`/listing/${id}`}
      bg={cardBg}
      rounded="lg"
      overflow="hidden"
      shadow="md"
      border="1px"
      borderColor={borderColor}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-4px)',
        shadow: 'lg',
      }}
    >
      <Image
        src={image}
        alt={title}
        h="200px"
        w="full"
        objectFit="cover"
      />

      <VStack p={4} align="start" spacing={3}>
        <Text fontSize="lg" fontWeight="bold" noOfLines={2}>
          {title}
        </Text>

        <HStack spacing={2}>
          <Badge colorScheme="green" px={2} py={1} rounded="md">
            {standard}
          </Badge>
          <Badge colorScheme="blue" px={2} py={1} rounded="md">
            {location}
          </Badge>
        </HStack>

        <HStack justify="space-between" w="full">
          <VStack align="start" spacing={0}>
            <Text color="gray.500" fontSize="sm">
              Price per credit
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="green.500">
              ${price.toFixed(2)}
            </Text>
          </VStack>

          <VStack align="end" spacing={0}>
            <Text color="gray.500" fontSize="sm">
              Available
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              {quantity.toLocaleString()}
            </Text>
          </VStack>
        </HStack>

        <Button
          leftIcon={<FaLeaf />}
          colorScheme="green"
          size="md"
          w="full"
          mt={2}
        >
          View Details
        </Button>
      </VStack>
    </Box>
  )
}

export default ListingCard 