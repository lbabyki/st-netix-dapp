import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  InputGroup,
  InputLeftElement,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { FaSearch, FaTrash } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { useCarbon } from '../contexts/CarbonContext'

const ProjectCard = ({ project, onViewDetails, onDelete }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      rounded="lg"
      shadow="md"
      border="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <VStack align="start" spacing={4}>
        <HStack justify="space-between" w="full">
          <Heading size="md">{project.projectName}</Heading>
          <Badge colorScheme="green">{project.registryId}</Badge>
        </HStack>

        <SimpleGrid columns={2} spacing={4} w="full">
          <Box>
            <Text fontSize="sm" color="gray.500">Location</Text>
            <Text>{project.location || 'N/A'}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Vintage</Text>
            <Text>{project.vintage || 'N/A'}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Available Credits</Text>
            <Text>{project.amount}</Text>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.500">Status</Text>
            <Badge colorScheme={project.status === 'Completed' ? 'green' : 'yellow'}>
              {project.status}
            </Badge>
          </Box>
        </SimpleGrid>

        <HStack w="full" spacing={2}>
          <Button 
            colorScheme="green" 
            flex={1}
            onClick={() => onViewDetails(project)}
          >
            View Details
          </Button>
          <Button 
            colorScheme="red" 
            variant="outline"
            onClick={() => onDelete(project.id)}
          >
            <FaTrash />
          </Button>
        </HStack>
      </VStack>
    </Box>
  )
}

const ProjectDetailsModal = ({ isOpen, onClose, project }) => {
  if (!project) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Project Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="bold">Project Name</Text>
              <Text>{project.projectName}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Registry</Text>
              <Text>{project.registryId}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Amount</Text>
              <Text>{project.amount} credits</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Location</Text>
              <Text>{project.location || 'N/A'}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Vintage</Text>
              <Text>{project.vintage || 'N/A'}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Status</Text>
              <Badge colorScheme={project.status === 'Completed' ? 'green' : 'yellow'}>
                {project.status}
              </Badge>
            </Box>
            <Box>
              <Text fontWeight="bold">Additional Details</Text>
              <Text>{project.details || 'No additional details provided'}</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Created At</Text>
              <Text>{new Date(project.timestamp).toLocaleString()}</Text>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const Explorer = () => {
  const { credits, deleteCredit, clearAllCredits } = useCarbon()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedVintage, setSelectedVintage] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  const handleViewDetails = (project) => {
    setSelectedProject(project)
    onOpen()
  }

  const handleDelete = (id) => {
    deleteCredit(id)
    toast({
      title: 'Project deleted',
      description: 'The project has been successfully deleted',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all projects? This action cannot be undone.')) {
      clearAllCredits()
      toast({
        title: 'All projects deleted',
        description: 'All projects have been successfully deleted',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const filteredProjects = credits.filter(project => {
    const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.registryId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !selectedType || project.registryId === selectedType
    const matchesLocation = !selectedLocation || project.location === selectedLocation
    const matchesVintage = !selectedVintage || project.vintage === selectedVintage
    return matchesSearch && matchesType && matchesLocation && matchesVintage
  })

  const projectTypes = [...new Set(credits.map(credit => credit.registryId))]
  const locations = [...new Set(credits.map(credit => credit.location).filter(Boolean))]
  const vintages = [...new Set(credits.map(credit => credit.vintage).filter(Boolean))]

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading mb={4}>Project Explorer</Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')}>
            Discover and manage carbon removal projects verified under the Puro Standard.
          </Text>
        </Box>

        <HStack spacing={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Select 
            placeholder="Project Type" 
            maxW="200px"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
          <Select 
            placeholder="Location" 
            maxW="200px"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </Select>
          <Select 
            placeholder="Vintage" 
            maxW="200px"
            value={selectedVintage}
            onChange={(e) => setSelectedVintage(e.target.value)}
          >
            {vintages.map(vintage => (
              <option key={vintage} value={vintage}>{vintage}</option>
            ))}
          </Select>
          <Button 
            colorScheme="red" 
            variant="outline"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </HStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
              onViewDetails={handleViewDetails}
              onDelete={handleDelete}
            />
          ))}
        </SimpleGrid>

        {filteredProjects.length === 0 && (
          <Box 
            textAlign="center" 
            py={10}
            color={useColorModeValue('gray.500', 'gray.400')}
          >
            <Text fontSize="lg">No projects found</Text>
            <Text>Try adjusting your search criteria</Text>
          </Box>
        )}

        <Box
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={4}>Project Statistics</Heading>
          <Table>
            <Thead>
              <Tr>
                <Th>Type</Th>
                <Th isNumeric>Total Projects</Th>
                <Th isNumeric>Total Credits</Th>
                <Th isNumeric>Completed</Th>
                <Th isNumeric>Pending</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projectTypes.map(type => {
                const typeProjects = credits.filter(p => p.registryId === type)
                const totalCredits = typeProjects.reduce((sum, p) => sum + Number(p.amount), 0)
                const completed = typeProjects.filter(p => p.status === 'Completed').length
                const pending = typeProjects.length - completed

                return (
                  <Tr key={type}>
                    <Td>{type}</Td>
                    <Td isNumeric>{typeProjects.length}</Td>
                    <Td isNumeric>{totalCredits}</Td>
                    <Td isNumeric>{completed}</Td>
                    <Td isNumeric>{pending}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      </VStack>

      <ProjectDetailsModal 
        isOpen={isOpen}
        onClose={onClose}
        project={selectedProject}
      />
    </Container>
  )
}

export default Explorer 