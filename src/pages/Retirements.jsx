import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  SimpleGrid,
} from '@chakra-ui/react'

const RetirementCard = ({ project }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      rounded="lg"
      shadow="md"
    >
      <VStack align="stretch" spacing={4}>
        <Image
          src={project.image}
          alt={project.name}
          rounded="md"
          height="200px"
          objectFit="cover"
        />
        <Heading size="md">{project.name}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {project.description}
        </Text>
        <HStack justify="space-between">
          <Text fontWeight="bold">Credits Retired:</Text>
          <Text>{project.credits.toLocaleString()}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text fontWeight="bold">Date:</Text>
          <Text>{project.date}</Text>
        </HStack>
        <Button colorScheme="green" size="sm">
          View Certificate
        </Button>
      </VStack>
    </Box>
  )
}

const Retirements = () => {
  const projects = [
    {
      name: 'Amazon Rainforest Conservation',
      description: 'Protecting 1,000 hectares of primary rainforest in Brazil',
      credits: 5000,
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Wind Power Project in India',
      description: 'Supporting renewable energy development in rural communities',
      credits: 3000,
      date: '2024-02-10',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Mangrove Restoration in Indonesia',
      description: 'Restoring coastal ecosystems and supporting local communities',
      credits: 2000,
      date: '2024-02-05',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ]

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Carbon Credit Retirements</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            View and manage your retired carbon credits, and access retirement certificates.
          </Text>
        </Box>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={6} align="stretch">
            <Heading size="md">Retire Carbon Credits</Heading>
            
            <FormControl>
              <FormLabel>Project Type</FormLabel>
              <Input placeholder="Select project type" />
            </FormControl>

            <FormControl>
              <FormLabel>Amount to Retire</FormLabel>
              <NumberInput min={1}>
                <NumberInputField placeholder="Enter amount" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Retirement Message</FormLabel>
              <Input placeholder="Enter a message for your retirement certificate" />
            </FormControl>

            <Button colorScheme="green" size="lg">
              Retire Credits
            </Button>
          </VStack>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Your Retirements</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {projects.map((project, index) => (
              <RetirementCard key={index} project={project} />
            ))}
          </SimpleGrid>
        </Box>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={4}>Retirement History</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Project</Th>
                <Th>Credits</Th>
                <Th>Status</Th>
                <Th>Certificate</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>2024-02-15</Td>
                <Td>Amazon Rainforest Conservation</Td>
                <Td>5,000</Td>
                <Td>
                  <Badge colorScheme="green">Completed</Badge>
                </Td>
                <Td>
                  <Button size="sm" variant="link" colorScheme="blue">
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>2024-02-10</Td>
                <Td>Wind Power Project in India</Td>
                <Td>3,000</Td>
                <Td>
                  <Badge colorScheme="green">Completed</Badge>
                </Td>
                <Td>
                  <Button size="sm" variant="link" colorScheme="blue">
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td>2024-02-05</Td>
                <Td>Mangrove Restoration in Indonesia</Td>
                <Td>2,000</Td>
                <Td>
                  <Badge colorScheme="green">Completed</Badge>
                </Td>
                <Td>
                  <Button size="sm" variant="link" colorScheme="blue">
                    View
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  )
}

export default Retirements 