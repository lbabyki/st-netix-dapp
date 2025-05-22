import {
  Box,
  Container,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  HStack,
  Text,
  Button,
  useToast,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Heading,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { FaLeaf, FaHistory, FaList } from 'react-icons/fa'
import ListingCard from '../components/ListingCard'
import CarbonCredits from '../components/CarbonCredits'

// Mock data - in a real app, this would come from your backend/blockchain
const mockUserData = {
  address: '0x1234...5678',
  totalCredits: 2500,
  totalValue: 38750,
  activeListings: [
    {
      id: 1,
      title: 'Verified Carbon Standard Credits',
      price: 15.5,
      quantity: 1000,
      standard: 'VCS',
      location: 'Brazil',
      image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    },
  ],
  transactionHistory: [
    {
      id: 1,
      type: 'purchase',
      amount: 500,
      price: 15.5,
      date: '2024-02-20',
      status: 'completed',
    },
    {
      id: 2,
      type: 'sale',
      amount: 200,
      price: 16.0,
      date: '2024-02-19',
      status: 'completed',
    },
  ],
}

const Profile = () => {
  const { active, account } = useWeb3React()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  if (!active) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="gray.500">
            Please connect your wallet to view your profile
          </Text>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>My Profile</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Manage your carbon credits and view your transaction history.
          </Text>
        </Box>

        <CarbonCredits />

        {/* Profile Header */}
        <Box bg={cardBg} p={6} rounded="lg" shadow="md" border="1px" borderColor={borderColor} mb={8}>
          <VStack spacing={4} align="stretch">
            <Text fontSize="2xl" fontWeight="bold">
              Profile
            </Text>
            <Text color="gray.500">
              Wallet Address: {account}
            </Text>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mt={4}>
              <Stat>
                <StatLabel>Total Credits</StatLabel>
                <StatNumber>{mockUserData.totalCredits.toLocaleString()}</StatNumber>
                <StatHelpText>Carbon credits owned</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Total Value</StatLabel>
                <StatNumber>${mockUserData.totalValue.toLocaleString()}</StatNumber>
                <StatHelpText>Current market value</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Active Listings</StatLabel>
                <StatNumber>{mockUserData.activeListings.length}</StatNumber>
                <StatHelpText>Listings for sale</StatHelpText>
              </Stat>
            </SimpleGrid>
          </VStack>
        </Box>

        {/* Tabs */}
        <Tabs variant="enclosed">
          <TabList>
            <Tab>
              <HStack>
                <FaList />
                <Text>My Listings</Text>
              </HStack>
            </Tab>
            <Tab>
              <HStack>
                <FaHistory />
                <Text>Transaction History</Text>
              </HStack>
            </Tab>
          </TabList>

          <TabPanels>
            {/* My Listings Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                  <Text fontSize="xl" fontWeight="bold">
                    Active Listings
                  </Text>
                  <Button
                    leftIcon={<FaLeaf />}
                    colorScheme="green"
                    onClick={() => window.location.href = '/create-listing'}
                  >
                    Create New Listing
                  </Button>
                </HStack>

                {mockUserData.activeListings.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                    {mockUserData.activeListings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Box textAlign="center" py={10}>
                    <Text color="gray.500">No active listings found</Text>
                  </Box>
                )}
              </VStack>
            </TabPanel>

            {/* Transaction History Tab */}
            <TabPanel>
              <VStack spacing={6} align="stretch">
                <Text fontSize="xl" fontWeight="bold">
                  Transaction History
                </Text>

                {mockUserData.transactionHistory.map((transaction) => (
                  <Box
                    key={transaction.id}
                    bg={cardBg}
                    p={4}
                    rounded="lg"
                    shadow="sm"
                    border="1px"
                    borderColor={borderColor}
                  >
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold" color={transaction.type === 'purchase' ? 'green.500' : 'blue.500'}>
                          {transaction.type === 'purchase' ? 'Purchase' : 'Sale'}
                        </Text>
                        <Text color="gray.500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </Text>
                      </VStack>
                      <VStack align="end" spacing={1}>
                        <Text fontWeight="bold">
                          {transaction.amount.toLocaleString()} credits
                        </Text>
                        <Text color="gray.500">
                          ${(transaction.amount * transaction.price).toLocaleString()}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}

export default Profile 