import { Box, Flex, Button, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <Flex alignItems="center">
          <Link as={RouterLink} to="/" fontSize="xl" fontWeight="bold">
            Carbon Credit Market
          </Link>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <Link as={RouterLink} to="/marketplace" px={2} py={1}>
            Marketplace
          </Link>
          <Link as={RouterLink} to="/create-listing" px={2} py={1}>
            Create Listing
          </Link>
          <Link as={RouterLink} to="/profile" px={2} py={1}>
            Profile
          </Link>
          <Button colorScheme="blue">
            Connect Wallet
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 