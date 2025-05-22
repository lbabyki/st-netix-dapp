import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from '@chakra-ui/react'

const Overview = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8}>Market Overview</Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
        <Stat
          px={4}
          py={5}
          bg={useColorModeValue('white', 'gray.800')}
          rounded="lg"
          shadow="md"
        >
          <StatLabel>Total Carbon Bridged</StatLabel>
          <StatNumber>21,890,661</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={5}
          bg={useColorModeValue('white', 'gray.800')}
          rounded="lg"
          shadow="md"
        >
          <StatLabel>Total Carbon Locked</StatLabel>
          <StatNumber>19,905,783</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            15.72%
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={5}
          bg={useColorModeValue('white', 'gray.800')}
          rounded="lg"
          shadow="md"
        >
          <StatLabel>Total Liquidity</StatLabel>
          <StatNumber>$1,810,027</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            8.45%
          </StatHelpText>
        </Stat>

        <Stat
          px={4}
          py={5}
          bg={useColorModeValue('white', 'gray.800')}
          rounded="lg"
          shadow="md"
        >
          <StatLabel>Total Carbon Retired</StatLabel>
          <StatNumber>210,338</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            12.89%
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={6}
        rounded="lg"
        shadow="md"
        mb={8}
      >
        <Heading size="md" mb={4}>Recent Activity</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Loading recent activity...
        </Text>
      </Box>

      <Box
        bg={useColorModeValue('white', 'gray.800')}
        p={6}
        rounded="lg"
        shadow="md"
      >
        <Heading size="md" mb={4}>Top Projects</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          Loading top projects...
        </Text>
      </Box>
    </Container>
  )
}

export default Overview 