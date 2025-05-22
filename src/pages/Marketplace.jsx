import {
  Box,
  Container,
  SimpleGrid,
  Input,
  Select,
  Flex,
  Text,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import ListingCard from '../components/ListingCard'

// Mock data for demonstration
const mockListings = [
  {
    id: 1,
    title: 'Verified Carbon Standard Credits',
    price: 15.5,
    quantity: 1000,
    standard: 'VCS',
    location: 'Brazil',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    title: 'Gold Standard Carbon Credits',
    price: 18.2,
    quantity: 500,
    standard: 'GS',
    location: 'India',
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  // Add more mock listings as needed
]

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStandard, setSelectedStandard] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')

  const filteredListings = mockListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStandard = !selectedStandard || listing.standard === selectedStandard
    const matchesLocation = !selectedLocation || listing.location === selectedLocation
    return matchesSearch && matchesStandard && matchesLocation
  })

  return (
    <Container maxW="container.xl" py={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={8}>
        Carbon Credit Marketplace
      </Text>

      {/* Filters */}
      <Flex
        gap={4}
        mb={8}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'stretch', md: 'center' }}
      >
        <InputGroup maxW={{ base: 'full', md: '300px' }}>
          <InputLeftElement pointerEvents="none">
            <FaSearch color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>

        <Select
          placeholder="Select Standard"
          maxW={{ base: 'full', md: '200px' }}
          value={selectedStandard}
          onChange={(e) => setSelectedStandard(e.target.value)}
        >
          <option value="VCS">Verified Carbon Standard</option>
          <option value="GS">Gold Standard</option>
          <option value="CDM">Clean Development Mechanism</option>
        </Select>

        <Select
          placeholder="Select Location"
          maxW={{ base: 'full', md: '200px' }}
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="Brazil">Brazil</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Kenya">Kenya</option>
        </Select>
      </Flex>

      {/* Listings Grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </SimpleGrid>

      {filteredListings.length === 0 && (
        <Box textAlign="center" py={10}>
          <Text fontSize="xl" color="gray.500">
            No listings found matching your criteria
          </Text>
        </Box>
      )}
    </Container>
  )
}

export default Marketplace 