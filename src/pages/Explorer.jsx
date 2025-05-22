import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

const ProjectCard = ({ name, type, location, vintage, credits, price }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      rounded="lg"
      shadow="md"
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <VStack align="start" spacing={4}>
        <HStack justify="space-between" w="full">
          <Heading size="md">{name}</Heading>
          <Badge colorScheme="green">{type}</Badge>
        </HStack>

        <SimpleGrid columns={2} spacing={4} w="full">
          <Box>
            <Text fontSize="sm" color="gray.500">Location</Text>
            <Text>{location}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Vintage</Text>
            <Text>{vintage}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Available Credits</Text>
            <Text>{credits}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Price per Credit</Text>
            <Text>${price}</Text>
          </Box>
        </SimpleGrid>

        <Button colorScheme="green" w="full">
          View Details
        </Button>
      </VStack>
    </Box>
  )
}

const Explorer = () => {
  const projects = [
    {
      name: 'Forest Conservation Project',
      type: 'Nature-Based',
      location: 'Brazil',
      vintage: '2023',
      credits: '10,000',
      price: '15.75',
    },
    {
      name: 'Solar Energy Initiative',
      type: 'Renewable Energy',
      location: 'India',
      vintage: '2023',
      credits: '5,000',
      price: '12.50',
    },
    // Add more projects as needed
  ]

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Project Explorer</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Discover engineered carbon removal projects verified under the Puro Standard.
          </Text>
        </Box>

        <HStack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input placeholder="Search projects..." />
          </InputGroup>
          <Select placeholder="Project Type" maxW="200px">
            <option value="nature">Nature-Based</option>
            <option value="renewable">Renewable Energy</option>
            <option value="technology">Technology-Based</option>
          </Select>
          <Select placeholder="Location" maxW="200px">
            <option value="brazil">Brazil</option>
            <option value="india">India</option>
            <option value="kenya">Kenya</option>
          </Select>
          <Select placeholder="Vintage" maxW="200px">
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
          </Select>
        </HStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </SimpleGrid>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={4}>Project Statistics</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th isNumeric>Total Projects</Th>
                <Th isNumeric>Total Credits</Th>
                <Th isNumeric>Average Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Nature-Based</Td>
                <Td isNumeric>25</Td>
                <Td isNumeric>150,000</Td>
                <Td isNumeric>$15.75</Td>
              </Tr>
              <Tr>
                <Td>Renewable Energy</Td>
                <Td isNumeric>18</Td>
                <Td isNumeric>75,000</Td>
                <Td isNumeric>$12.50</Td>
              </Tr>
              <Tr>
                <Td>Technology-Based</Td>
                <Td isNumeric>12</Td>
                <Td isNumeric>45,000</Td>
                <Td isNumeric>$18.25</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  )
}

export default Explorer 