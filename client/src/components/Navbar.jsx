import { Box, Icon, Flex, Spacer, Button, Image } from '@chakra-ui/react';
import { FaWallet } from 'react-icons/fa';
import { AiFillCloseCircle } from 'react-icons/ai';
import Address from './Address';
import { useDataContext } from '../context/data-context';

const aspectRatio = 75 / 323;
const width = 220;
const height = width * aspectRatio;

function Navbar() {
  const { walletAddress, isWalletConnected, connectWallet, disconnectWallet } = useDataContext();
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2" py={2} px={4} bg="blue.900">
      <Box p="2">
        <Image width={width} height={height} objectFit="cover" src="/images/logo-horizontal.png" alt="chain icon" />
      </Box>
      <Spacer />
      <Flex gap="6" minWidth="max-content" alignItems="center">
        {isWalletConnected ? (
          <>
            <Address address={walletAddress} fontSize={20} />
            <Button leftIcon={<Icon as={AiFillCloseCircle} />} colorScheme="red" w={175} onClick={disconnectWallet}>
              Disconnect
            </Button>
          </>
        ) : (
          <Button leftIcon={<Icon as={FaWallet} />} colorScheme="blue" w={175} onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Navbar;
