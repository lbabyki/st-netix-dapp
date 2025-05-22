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
  Select,
  Tooltip,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useCarbon } from '../contexts/CarbonContext'
import { FaInfoCircle } from 'react-icons/fa'
import {
  SUPPORTED_REGISTRIES,
  PROJECT_TYPES,
  LOCATIONS,
  VINTAGE_YEARS,
  BRIDGE_STATUS,
  BRIDGE_PROGRESS_STAGES
} from '../constants/registryData'

const CrossChain = () => {
  const { credits, addCredit, updateCredit } = useCarbon()
  const [formData, setFormData] = useState({
    registryId: '',
    amount: '',
    details: '',
    projectName: '',
    vintage: '',
    location: '',
    projectType: ''
  })
  const [selectedRegistry, setSelectedRegistry] = useState(null)
  const toast = useToast()

  useEffect(() => {
    if (formData.registryId) {
      const registry = SUPPORTED_REGISTRIES.find(r => r.id === formData.registryId)
      setSelectedRegistry(registry)
      // Reset dependent fields when registry changes
      setFormData(prev => ({
        ...prev,
        location: '',
        projectType: ''
      }))
    } else {
      setSelectedRegistry(null)
    }
  }, [formData.registryId])

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

    const registry = SUPPORTED_REGISTRIES.find(r => r.id === formData.registryId)
    if (registry) {
      const amount = Number(formData.amount)
      if (amount < registry.minAmount || amount > registry.maxAmount) {
        toast({
          title: 'Invalid Amount',
          description: `Amount must be between ${registry.minAmount} and ${registry.maxAmount} for ${registry.name}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        return
      }
    }

    const newCredit = addCredit(formData)
    
    // Reset form
    setFormData({
      registryId: '',
      amount: '',
      details: '',
      projectName: '',
      vintage: '',
      location: '',
      projectType: ''
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
              <Select 
                name="registryId"
                value={formData.registryId}
                onChange={handleInputChange}
                placeholder="Select registry"
              >
                {SUPPORTED_REGISTRIES.map(registry => (
                  <option key={registry.id} value={registry.id}>
                    {registry.name}
                  </option>
                ))}
              </Select>
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
              <FormLabel>Project Type</FormLabel>
              <Select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                placeholder="Select project type"
                isDisabled={!formData.registryId}
              >
                {formData.registryId && PROJECT_TYPES[formData.registryId]?.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Amount to Bridge</FormLabel>
              <NumberInput 
                min={selectedRegistry?.minAmount || 1}
                max={selectedRegistry?.maxAmount || 1000000}
                value={formData.amount}
                onChange={handleNumberChange}
              >
                <NumberInputField placeholder="Enter amount" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {selectedRegistry && (
                <Text fontSize="sm" color="gray.500" mt={1}>
                  Min: {selectedRegistry.minAmount}, Max: {selectedRegistry.maxAmount}
                </Text>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Select location"
                isDisabled={!formData.registryId}
              >
                {formData.registryId && LOCATIONS[formData.registryId]?.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Vintage</FormLabel>
              <Select
                name="vintage"
                value={formData.vintage}
                onChange={handleInputChange}
                placeholder="Select vintage year"
              >
                {VINTAGE_YEARS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
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
                <Th>Type</Th>
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
                  <Td>{credit.projectType}</Td>
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
          <Accordion allowMultiple>
            {SUPPORTED_REGISTRIES.map((registry) => (
              <AccordionItem key={registry.id}>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text fontWeight="bold">{registry.name}</Text>
                        <Badge colorScheme={registry.status === 'Active' ? 'green' : 'yellow'}>
                          {registry.status}
                        </Badge>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={3}>
                    <Text>{registry.description}</Text>
                    <HStack>
                      <Text fontWeight="bold">Total Bridged:</Text>
                      <Text>{registry.totalBridged}</Text>
                    </HStack>
                    <HStack>
                      <Text fontWeight="bold">Last Update:</Text>
                      <Text>{registry.lastUpdate}</Text>
                    </HStack>
                    <Box>
                      <Text fontWeight="bold">Supported Project Types:</Text>
                      <HStack wrap="wrap" mt={1}>
                        {registry.projectTypes.map(type => (
                          <Badge key={type} colorScheme="blue" mr={2} mb={2}>
                            {type}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Available Locations:</Text>
                      <HStack wrap="wrap" mt={1}>
                        {registry.locations.map(location => (
                          <Badge key={location} colorScheme="purple" mr={2} mb={2}>
                            {location}
                          </Badge>
                        ))}
                      </HStack>
                    </Box>
                    <Box>
                      <Text fontWeight="bold">Credit Limits:</Text>
                      <Text>Min: {registry.minAmount}, Max: {registry.maxAmount}</Text>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </VStack>
    </Container>
  )
}

export default CrossChain 