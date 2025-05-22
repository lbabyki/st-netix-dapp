import {
  Box,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useToast,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react'
import { useCarbon } from '../contexts/CarbonContext'
import { useWallet } from '../contexts/WalletContext'
import { useState } from 'react'

const CarbonCredits = () => {
  const { account } = useWallet()
  const {
    credits,
    isLoading,
    error,
    addCredit,
    retireCredit,
    transferCredit,
    getActiveCredits,
    getRetiredCredits,
  } = useCarbon()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedCredit, setSelectedCredit] = useState(null)
  const [retirementMessage, setRetirementMessage] = useState('')
  const [transferAddress, setTransferAddress] = useState('')

  const handleAddCredit = () => {
    const newCredit = {
      projectName: 'Sample Project',
      amount: 100,
      type: 'Nature-Based',
      vintage: '2024',
      owner: account,
    }
    addCredit(newCredit)
    toast({
      title: 'Credit Added',
      description: 'New carbon credit has been added successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const handleRetire = (credit) => {
    setSelectedCredit(credit)
    onOpen()
  }

  const confirmRetire = () => {
    if (selectedCredit && retirementMessage) {
      retireCredit(selectedCredit.id, {
        message: retirementMessage,
        retiredBy: account,
      })
      toast({
        title: 'Credit Retired',
        description: 'Carbon credit has been retired successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onClose()
      setRetirementMessage('')
      setSelectedCredit(null)
    }
  }

  const handleTransfer = (credit) => {
    if (transferAddress) {
      transferCredit(credit.id, transferAddress)
      toast({
        title: 'Credit Transferred',
        description: 'Carbon credit has been transferred successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setTransferAddress('')
    }
  }

  if (!account) {
    return (
      <Box p={4}>
        <Text>Please connect your wallet to view carbon credits</Text>
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    )
  }

  return (
    <VStack spacing={8} align="stretch" p={4}>
      <Box>
        <Heading size="lg" mb={4}>My Carbon Credits</Heading>
        <Button onClick={handleAddCredit} isLoading={isLoading} mb={4}>
          Add Sample Credit
        </Button>
      </Box>

      <Box>
        <Heading size="md" mb={4}>Active Credits</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Project</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Vintage</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getActiveCredits().map((credit) => (
              <Tr key={credit.id}>
                <Td>{credit.projectName}</Td>
                <Td>{credit.amount}</Td>
                <Td>{credit.type}</Td>
                <Td>{credit.vintage}</Td>
                <Td>
                  <Badge colorScheme="green">Active</Badge>
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="red"
                    mr={2}
                    onClick={() => handleRetire(credit)}
                  >
                    Retire
                  </Button>
                  <Input
                    size="sm"
                    placeholder="Transfer to address"
                    value={transferAddress}
                    onChange={(e) => setTransferAddress(e.target.value)}
                    width="200px"
                    mr={2}
                  />
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => handleTransfer(credit)}
                  >
                    Transfer
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box>
        <Heading size="md" mb={4}>Retired Credits</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Project</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Vintage</Th>
              <Th>Status</Th>
              <Th>Retirement Message</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getRetiredCredits().map((credit) => (
              <Tr key={credit.id}>
                <Td>{credit.projectName}</Td>
                <Td>{credit.amount}</Td>
                <Td>{credit.type}</Td>
                <Td>{credit.vintage}</Td>
                <Td>
                  <Badge colorScheme="red">Retired</Badge>
                </Td>
                <Td>{credit.retirementData?.message}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Retire Carbon Credit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Retirement Message</FormLabel>
              <Input
                value={retirementMessage}
                onChange={(e) => setRetirementMessage(e.target.value)}
                placeholder="Enter your retirement message"
              />
            </FormControl>
            <Button
              colorScheme="red"
              mt={4}
              onClick={confirmRetire}
              isDisabled={!retirementMessage}
            >
              Confirm Retirement
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </VStack>
  )
}

export default CarbonCredits 