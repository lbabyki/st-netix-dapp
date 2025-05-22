import {
  Box,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Text,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useNavigate } from 'react-router-dom'

const CreateListing = () => {
  const { active } = useWeb3React()
  const navigate = useNavigate()
  const toast = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    quantity: '',
    standard: '',
    location: '',
    certification: '',
    vintage: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!active) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to create a listing',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setIsSubmitting(true)
    try {
      // Here you would typically:
      // 1. Upload images to IPFS
      // 2. Create metadata
      // 3. Interact with smart contract to create listing
      
      // Mock successful submission
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      toast({
        title: 'Listing created',
        description: 'Your carbon credit listing has been created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      navigate('/marketplace')
    } catch (error) {
      toast({
        title: 'Error creating listing',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Container maxW="container.md" py={8}>
      <Box
        bg={formBg}
        p={8}
        rounded="lg"
        shadow="md"
        border="1px"
        borderColor={borderColor}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={6}>
          Create New Carbon Credit Listing
        </Text>

        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter listing title"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your carbon credits"
                rows={4}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price per Credit (USD)</FormLabel>
              <NumberInput min={0} precision={2}>
                <NumberInputField
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price per credit"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Quantity Available</FormLabel>
              <NumberInput min={1}>
                <NumberInputField
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Standard</FormLabel>
              <Select
                name="standard"
                value={formData.standard}
                onChange={handleChange}
                placeholder="Select standard"
              >
                <option value="VCS">Verified Carbon Standard</option>
                <option value="GS">Gold Standard</option>
                <option value="CDM">Clean Development Mechanism</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Location</FormLabel>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter project location"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Certification Number</FormLabel>
              <Input
                name="certification"
                value={formData.certification}
                onChange={handleChange}
                placeholder="Enter certification number"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Vintage Year</FormLabel>
              <Input
                name="vintage"
                value={formData.vintage}
                onChange={handleChange}
                placeholder="Enter vintage year"
                type="number"
                min="2000"
                max={new Date().getFullYear()}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="green"
              size="lg"
              w="full"
              isLoading={isSubmitting}
              loadingText="Creating listing..."
            >
              Create Listing
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  )
}

export default CreateListing 