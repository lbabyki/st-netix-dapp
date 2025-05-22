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
  useToast,
  Textarea,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useCarbon } from '../contexts/CarbonContext'

const CrossChain = () => {
  const { credits, addCredit, updateCredit } = useCarbon()
  const [formData, setFormData] = useState({
    registryId: '',
    amount: '',
    details: '',
    projectName: '',
    vintage: '',
    location: ''
  })
  const toast = useToast()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNumberChange = (value) => {
    setFormData(prev => ({
      ...prev,
      amount: value
    }))
  }

  const handleSubmit = () => {
    if (!formData.registryId || !formData.amount || !formData.projectName) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const newCredit = addCredit(formData)
    
    // Reset form
    setFormData({
      registryId: '',
      amount: '',
      details: '',
      projectName: '',
      vintage: '',
      location: ''
    })

    toast({
      title: 'Success',
      description: 'Carbon credit details saved successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleStatusUpdate = (id, newStatus) => {
    updateCredit(id, { status: newStatus })
    toast({
      title: 'Status Updated',
      description: `Credit status updated to ${newStatus}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

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
            
            <FormControl isRequired>
              <FormLabel>Source Registry</FormLabel>
              <Input 
                name="registryId"
                value={formData.registryId}
                onChange={handleInputChange}
                placeholder="Enter registry ID" 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Project Name</FormLabel>
              <Input 
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter project name" 
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Amount to Bridge</FormLabel>
              <NumberInput 
                min={1} 
                value={formData.amount}
                onChange={handleNumberChange}
              >
                <NumberInputField placeholder="Enter amount" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Vintage</FormLabel>
              <Input 
                name="vintage"
                value={formData.vintage}
                onChange={handleInputChange}
                placeholder="Enter vintage year" 
              />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input 
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter project location" 
              />
            </FormControl>

            <FormControl>
              <FormLabel>Additional Details</FormLabel>
              <Textarea 
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="Enter any additional details about the carbon credit" 
              />
            </FormControl>

            <Button 
              colorScheme="green" 
              size="lg"
              onClick={handleSubmit}
            >
              Save Credit Details
            </Button>
          </VStack>
        </Box>

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={4}>Saved Credits</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Project Name</Th>
                <Th>Registry</Th>
                <Th>Amount</Th>
                <Th>Vintage</Th>
                <Th>Location</Th>
                <Th>Status</Th>
                <Th>Progress</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {credits.map((credit) => (
                <Tr key={credit.id}>
                  <Td>{credit.projectName}</Td>
                  <Td>{credit.registryId}</Td>
                  <Td>{credit.amount}</Td>
                  <Td>{credit.vintage}</Td>
                  <Td>{credit.location}</Td>
                  <Td>
                    <Badge colorScheme={credit.status === 'Completed' ? 'green' : 'yellow'}>
                      {credit.status}
                    </Badge>
                  </Td>
                  <Td>
                    <Progress 
                      value={credit.progress} 
                      size="sm" 
                      colorScheme={credit.status === 'Completed' ? 'green' : 'yellow'} 
                    />
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme={credit.status === 'Completed' ? 'yellow' : 'green'}
                      onClick={() => handleStatusUpdate(
                        credit.id,
                        credit.status === 'Completed' ? 'Pending' : 'Completed'
                      )}
                    >
                      {credit.status === 'Completed' ? 'Mark Pending' : 'Mark Complete'}
                    </Button>
                  </Td>
                </Tr>
              ))}
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