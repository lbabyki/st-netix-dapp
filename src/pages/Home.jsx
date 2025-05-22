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
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Flex,
  Image,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaLeaf, FaChartLine, FaShieldAlt, FaGlobe } from 'react-icons/fa';
import '../css/home/home.css';
const StatCard = ({ label, value, icon }) => {
  return (
    <Stat px={4} py={5} bg={useColorModeValue('white', 'gray.800')} rounded="lg" shadow="md">
      <StatLabel fontSize="sm" color="gray.500">
        {label}
      </StatLabel>
      <StatNumber fontSize="2xl" fontWeight="bold">
        {value}
      </StatNumber>
      <Icon as={icon} w={6} h={6} color="green.500" mt={2} />
    </Stat>
  );
};

const Feature = ({ title, text, icon, link }) => {
  return (
    <VStack
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      shadow="md"
      spacing={4}
      align="start"
      as={RouterLink}
      to={link}
      _hover={{ transform: 'translateY(-4px)', transition: 'all 0.2s' }}
    >
      <Icon as={icon} w={10} h={10} color="green.500" />
      <Heading size="md">{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </VStack>
  );
};

const Home = () => {
  return (
    <Box>
      {/* Stats Section */}
      <Box bg={useColorModeValue('green.50', 'green.900')} py={8} px={4}>
        <Container maxW="container.xl">
          <StatGroup>
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6} w="full">
              <StatCard label="Total Carbon Bridged" value="21,890,661" icon={FaLeaf} />
              <StatCard label="Total Carbon Locked" value="19,905,783" icon={FaShieldAlt} />
              <StatCard label="Total Liquidity" value="$1,810,027" icon={FaChartLine} />
              <StatCard label="Total Carbon Retired" value="210,338" icon={FaGlobe} />
            </SimpleGrid>
          </StatGroup>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box py={20} px={4}>
        <Container maxW="container.xl">
          <Flex direction={{ base: 'column', md: 'row' }} gap={8} align="center">
            <Box flex={1} className="box-hovered">
              <Heading as="h1" size="2xl" mb={6} color={useColorModeValue('green.800', 'white')}>
                The World's First Liquid Market for Carbon Credits
              </Heading>
              <Text fontSize="xl" mb={8} color={useColorModeValue('gray.600', 'gray.300')}>
                Access verified carbon credits, bridge them across chains, and create real climate
                impact through transparent trading.
              </Text>
              <Button as={RouterLink} to="/carbon-pools" size="lg" colorScheme="green" px={8}>
                Explore Carbon Pools
              </Button>
            </Box>
            <Box flex={1}>
              <Image src="/hero-image.png" alt="Carbon Market" rounded="lg" shadow="xl" />
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          <Feature
            icon={FaLeaf}
            title="Carbon Pools"
            text="Access biochar carbon removals available to purchase and retire 24/7 with instant order execution."
            link="/carbon-pools"
          />
          <Feature
            icon={FaChartLine}
            title="Explorer"
            text="Discover engineered carbon removal projects verified under the Puro Standard."
            link="/explorer"
          />
          <Feature
            icon={FaShieldAlt}
            title="Carbon Bridge"
            text="Tokenize carbon removals from supported source registries on a 1-1 verifiable basis."
            link="/cross-chain"
          />
          <Feature
            icon={FaGlobe}
            title="Retirements"
            text="Create impact claims by retiring TCO2s and removing them permanently from circulation."
            link="/retirements"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Home;
