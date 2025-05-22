import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Image,
  Badge,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const PoolCard = ({ name, description, price, composition }) => {
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
          <Badge colorScheme="green">Active</Badge>
        </HStack>
        
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {description}
        </Text>

        <HStack w="full" justify="space-between">
          <Text fontWeight="bold">Price: ${price}</Text>
          <Button colorScheme="green" size="sm">
            Buy
          </Button>
        </HStack>

        <Box w="full">
          <Text fontWeight="bold" mb={2}>Pool Composition</Text>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Project</Th>
                <Th isNumeric>Percentage</Th>
              </Tr>
            </Thead>
            <Tbody>
              {composition.map((item, index) => (
                <Tr key={index}>
                  <Td>{item.project}</Td>
                  <Td isNumeric>{item.percentage}%</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  )
}

const CarbonPools = () => {
  const pools = [
    {
      name: 'CHAR',
      description: 'Toucan Biochar Carbon Pool',
      price: '12.50',
      composition: [
        { project: 'Project A', percentage: 40 },
        { project: 'Project B', percentage: 35 },
        { project: 'Project C', percentage: 25 },
      ],
    },
    // Add more pools as needed
  ]

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Carbon Pools</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Access biochar carbon removals available to purchase and retire 24/7 with instant order execution.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {pools.map((pool, index) => (
            <PoolCard key={index} {...pool} />
          ))}
        </SimpleGrid>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={4}>My Carbon Assets</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            You are not logged in or connected to the wrong network. Please log in and connect to the right network to see your Carbon Pool Tokens.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}

export default CarbonPools 