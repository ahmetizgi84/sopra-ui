import React from 'react';
import { VStack, Icon, Text, Tooltip, Box, Flex, Divider, Image } from '@chakra-ui/react';
// import { QRCodeSVG } from 'qrcode.react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

import TabLayout from './TabLayout';
import CreateWalletContent from './CreateWalletContent';
import { useDataContext } from '../context/data-context';
import { truncateAddress } from '../utils';

// import SignVerify from './SignVerify';

function WalletTab() {
  const { walletAddress, chainId } = useDataContext();

  return (
    <TabLayout>
      <Box boxShadow="base" p="6" rounded="md" bg="white">
        <Flex alignItems="center" gap={3} mb={5}>
          <Flex alignItems="center" gap={1} flex={1} justifyContent="center" bg="blue.50" h={10} borderRadius="lg">
            <Text>{`Status: `}</Text>
            {walletAddress ? <Icon as={FaCheckCircle} color="green" /> : <Icon as={FaExclamationCircle} color="red" />}
          </Flex>

          <Flex flex={1} alignItems="center" justifyContent="center" bg="blue.50" h={10} borderRadius="lg">
            <Tooltip label={walletAddress} placement="right">
              <Text>{`Account: ${truncateAddress(walletAddress)}`}</Text>
            </Tooltip>
          </Flex>

          <Flex flex={1} alignItems="center" justifyContent="center" bg="blue.50" h={10} borderRadius="lg">
            <Text>{`Network: ${chainId ? chainId : 'No Network'}`}</Text>
          </Flex>
        </Flex>

        <VStack>
          {/* <QRCodeSVG value="0x9F331f626378DE66fE4bc2d382EAb33F9542AD60" /> */}
          <Image objectFit="cover" src="/images/logo-vertical.png" alt="chain icon" />
        </VStack>

        {/* <SignVerify /> */}

        <Divider mt={5} mb={3} />

        <CreateWalletContent />
      </Box>
    </TabLayout>
  );
}

export default WalletTab;
