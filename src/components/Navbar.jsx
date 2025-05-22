import { Box, Flex, Button, Link, Text, useColorModeValue, HStack, Image, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaGithub, FaDiscord, FaWallet } from 'react-icons/fa'
import { useWallet } from '../contexts/WalletContext'

const Navbar = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet()

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <Flex alignItems="center" gap={8}>
          <Link as={RouterLink} to="/" display="flex" alignItems="center" gap={2}>
            <Image src="/logo.png" alt="Logo" h={8} />
            <Text fontSize="xl" fontWeight="bold">Carbon Market</Text>
          </Link>

          <HStack spacing={6}>
            <Link as={RouterLink} to="/overview">Overview</Link>
            <Link as={RouterLink} to="/carbon-pools">Carbon Pools</Link>
            <Link as={RouterLink} to="/explorer">Explorer</Link>
            <Link as={RouterLink} to="/cross-chain">Cross-Chain</Link>
            <Link as={RouterLink} to="/retirements">Retirements</Link>
          </HStack>
        </Flex>

        <Flex alignItems="center" gap={4}>
          <Link href="https://docs.toucan.earth" isExternal>
            <Text>Docs</Text>
          </Link>
          <Link href="https://github.com/toucan-protocol" isExternal>
            <FaGithub size={20} />
          </Link>
          <Link href="https://discord.gg/toucan" isExternal>
            <FaDiscord size={20} />
          </Link>
          
          {account ? (
            <Menu>
              <MenuButton
                as={Button}
                leftIcon={<FaWallet />}
                colorScheme="blue"
                variant="outline"
              >
                {formatAddress(account)}
              </MenuButton>
              <MenuList>
                <MenuItem>View Profile</MenuItem>
                <MenuItem>My Carbon Assets</MenuItem>
                <MenuDivider />
                <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              colorScheme="blue"
              onClick={connectWallet}
              isLoading={isConnecting}
              loadingText="Connecting..."
            >
              Connect Wallet
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar 