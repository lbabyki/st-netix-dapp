import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaLeaf, FaChartLine, FaShieldAlt, FaGlobe } from 'react-icons/fa'

const Feature = ({ title, text, icon }) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      shadow="md"
      spacing={4}
      align="start"
    >
      <Icon as={icon} w={10} h={10} color="green.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </VStack>
  )
}

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bg={useColorModeValue('green.50', 'green.900')}
        py={20}
        px={4}
        textAlign="center"
      >
        <Container maxW="container.xl">
          <Heading
            as="h1"
            size="2xl"
            mb={6}
            color={useColorModeValue('green.800', 'white')}
          >
            Trade Carbon Credits Securely
          </Heading>
          <Text fontSize="xl" mb={8} color={useColorModeValue('gray.600', 'gray.300')}>
            Join the global marketplace for carbon credits. Buy, sell, and trade verified carbon credits
            using blockchain technology.
          </Text>
          <Button
            as={RouterLink}
            to="/marketplace"
            size="lg"
            colorScheme="green"
            px={8}
          >
            Explore Marketplace
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          <Feature
            icon={FaLeaf}
            title="Verified Credits"
            text="All carbon credits are verified and certified by recognized standards."
          />
          <Feature
            icon={FaChartLine}
            title="Market Insights"
            text="Access real-time market data and price trends for carbon credits."
          />
          <Feature
            icon={FaShieldAlt}
            title="Secure Trading"
            text="Trade securely using blockchain technology and smart contracts."
          />
          <Feature
            icon={FaGlobe}
            title="Global Impact"
            text="Contribute to global climate action through transparent trading."
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Home 