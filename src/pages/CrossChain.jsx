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
  Progress,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

const CrossChain = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Carbon Bridge</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Tokenize carbon removals from supported source registries on a 1-1 verifiable basis.
          </Text>
        </Box>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={6} align="stretch">
            <Heading size="md">Bridge Carbon Credits</Heading>
            
            <FormControl>
              <FormLabel>Source Registry</FormLabel>
              <Input placeholder="Enter registry ID" />
            </FormControl>

            <FormControl>
              <FormLabel>Amount to Bridge</FormLabel>
              <NumberInput min={1}>
                <NumberInputField placeholder="Enter amount" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button colorScheme="green" size="lg">
              Bridge Credits
            </Button>
          </VStack>
        </Box>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={4}>Bridge Status</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Transaction ID</Th>
                <Th>Source Registry</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
                <Th>Progress</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>0x1234...5678</Td>
                <Td>VCS</Td>
                <Td>1,000</Td>
                <Td>
                  <Badge colorScheme="green">Completed</Badge>
                </Td>
                <Td>
                  <Progress value={100} size="sm" colorScheme="green" />
                </Td>
              </Tr>
              <Tr>
                <Td>0x8765...4321</Td>
                <Td>GS</Td>
                <Td>500</Td>
                <Td>
                  <Badge colorScheme="yellow">In Progress</Badge>
                </Td>
                <Td>
                  <Progress value={60} size="sm" colorScheme="yellow" />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={4}>Supported Registries</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Registry</Th>
                <Th>Status</Th>
                <Th>Total Bridged</Th>
                <Th>Last Update</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Verified Carbon Standard (VCS)</Td>
                <Td>
                  <Badge colorScheme="green">Active</Badge>
                </Td>
                <Td>15,000,000</Td>
                <Td>2024-02-20</Td>
              </Tr>
              <Tr>
                <Td>Gold Standard (GS)</Td>
                <Td>
                  <Badge colorScheme="green">Active</Badge>
                </Td>
                <Td>5,000,000</Td>
                <Td>2024-02-19</Td>
              </Tr>
              <Tr>
                <Td>American Carbon Registry (ACR)</Td>
                <Td>
                  <Badge colorScheme="yellow">Coming Soon</Badge>
                </Td>
                <Td>-</Td>
                <Td>-</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Container>
  )
}

export default CrossChain 