import {
  Box,
  Container,
  Grid,
  Image,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
  Divider,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import { FaLeaf, FaCheckCircle } from 'react-icons/fa'

// Mock data - in a real app, this would come from your backend/blockchain
const mockListing = {
  id: 1,
  title: 'Verified Carbon Standard Credits',
  description: 'High-quality carbon credits from a reforestation project in the Amazon rainforest. These credits are verified by the Verified Carbon Standard and have been certified for their environmental impact.',
  price: 15.5,
  quantity: 1000,
  standard: 'VCS',
  location: 'Brazil',
  certification: 'VCS-1234-2023',
  vintage: '2023',
  image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  seller: '0x1234...5678',
  projectDetails: {
    type: 'Reforestation',
    methodology: 'AR-AM0001',
    coBenefits: ['Biodiversity', 'Community Development', 'Water Conservation'],
  },
}

const ListingDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { active, account } = useWeb3React()
  const [purchaseQuantity, setPurchaseQuantity] = useState(1)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async () => {
    if (!active) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet to make a purchase',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    setIsPurchasing(true)
    try {
      // Here you would typically:
      // 1. Check if user has enough ETH
      // 2. Interact with smart contract to purchase credits
      // 3. Update the listing quantity
      
      // Mock successful purchase
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      toast({
        title: 'Purchase successful',
        description: 'You have successfully purchased the carbon credits',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      
      navigate('/profile')
    } catch (error) {
      toast({
        title: 'Error making purchase',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        {/* Left Column - Listing Details */}
        <VStack align="stretch" spacing={6}>
          <Image
            src={mockListing.image}
            alt={mockListing.title}
            rounded="lg"
            h="400px"
            objectFit="cover"
          />

          <Box bg={cardBg} p={6} rounded="lg" shadow="md" border="1px" borderColor={borderColor}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              {mockListing.title}
            </Text>

            <HStack spacing={2} mb={4}>
              <Badge colorScheme="green" px={2} py={1} rounded="md">
                {mockListing.standard}
              </Badge>
              <Badge colorScheme="blue" px={2} py={1} rounded="md">
                {mockListing.location}
              </Badge>
            </HStack>

            <Text color="gray.600" mb={6}>
              {mockListing.description}
            </Text>

            <Divider mb={6} />

            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text fontWeight="medium">Certification Number:</Text>
                <Text>{mockListing.certification}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Vintage Year:</Text>
                <Text>{mockListing.vintage}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Project Type:</Text>
                <Text>{mockListing.projectDetails.type}</Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontWeight="medium">Methodology:</Text>
                <Text>{mockListing.projectDetails.methodology}</Text>
              </HStack>
            </VStack>

            <Divider my={6} />

            <Text fontWeight="bold" mb={2}>
              Co-Benefits:
            </Text>
            <HStack spacing={2} wrap="wrap">
              {mockListing.projectDetails.coBenefits.map((benefit) => (
                <Badge key={benefit} colorScheme="purple" px={2} py={1} rounded="md">
                  {benefit}
                </Badge>
              ))}
            </HStack>
          </Box>
        </VStack>

        {/* Right Column - Purchase Section */}
        <Box bg={cardBg} p={6} rounded="lg" shadow="md" border="1px" borderColor={borderColor}>
          <VStack spacing={6} align="stretch">
            <Text fontSize="xl" fontWeight="bold">
              Purchase Carbon Credits
            </Text>

            <VStack align="stretch" spacing={4}>
              <HStack justify="space-between">
                <Text>Price per credit:</Text>
                <Text fontWeight="bold" color="green.500">
                  ${mockListing.price.toFixed(2)}
                </Text>
              </HStack>

              <HStack justify="space-between">
                <Text>Available:</Text>
                <Text fontWeight="bold">
                  {mockListing.quantity.toLocaleString()} credits
                </Text>
              </HStack>

              <FormControl>
                <Text mb={2}>Quantity to purchase:</Text>
                <NumberInput
                  min={1}
                  max={mockListing.quantity}
                  value={purchaseQuantity}
                  onChange={(value) => setPurchaseQuantity(Number(value))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Divider />

              <HStack justify="space-between">
                <Text fontWeight="bold">Total:</Text>
                <Text fontSize="xl" fontWeight="bold" color="green.500">
                  ${(mockListing.price * purchaseQuantity).toFixed(2)}
                </Text>
              </HStack>

              <Button
                leftIcon={<FaLeaf />}
                colorScheme="green"
                size="lg"
                onClick={handlePurchase}
                isLoading={isPurchasing}
                loadingText="Processing..."
                isDisabled={!active}
              >
                Purchase Credits
              </Button>

              {!active && (
                <Text color="red.500" textAlign="center">
                  Please connect your wallet to make a purchase
                </Text>
              )}
            </VStack>
          </VStack>
        </Box>
      </Grid>
    </Container>
  )
}

export default ListingDetails 