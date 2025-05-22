import {
  Box,
  Flex,
  Button,
  Link,
  Text,
  useColorModeValue,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaGithub, FaDiscord, FaWallet } from 'react-icons/fa';
import { useWallet } from '../../contexts/WalletContext';
import './navbar.css';

const Navbar = () => {
  const { account, connectWallet, disconnectWallet, isConnecting } = useWallet();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Box bg={useColorModeValue('white', 'gray.800')} px={4} shadow="sm">
      <Flex h={16} alignItems="center" justifyContent="space-between" maxW="1200px" mx="auto">
        <Flex alignItems="center" gap={8}>
          <Link as={RouterLink} to="/" display="flex" alignItems="center" gap={2}>
            <Image src="/logo.png" alt="Logo" h={8} />
            <Text className="logo-text" fontSize="xl" fontWeight="bold">
              Carbon Market
            </Text>
          </Link>
        </Flex>
        <HStack spacing={6}>
          <NavLink as={RouterLink} to="/overview" className="nav-item" activeClassName="active">
            Overview
          </NavLink>
          <NavLink as={RouterLink} to="/carbon-pools" className="nav-item" activeClassName="active">
            Carbon Pools
          </NavLink>
          <NavLink as={RouterLink} to="/explorer" className="nav-item" activeClassName="active">
            Explorer
          </NavLink>
          <NavLink as={RouterLink} to="/cross-chain" className="nav-item" activeClassName="active">
            Cross-Chain
          </NavLink>
          <NavLink as={RouterLink} to="/retirements" className="nav-item" activeClassName="active">
            Retirements
          </NavLink>
        </HStack>

        <Flex alignItems="center" gap={4}>
          {account ? (
            <Menu>
              <MenuButton as={Button} leftIcon={<FaWallet />} colorScheme="blue" variant="outline">
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
              className="btn-active-hovered"
              colorScheme="green"
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
  );
};

export default Navbar;
