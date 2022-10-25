import React from 'react';
import { Button, VStack, Icon, HStack, Text, Tooltip, Box, Select, Input } from '@chakra-ui/react';
import { FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

import { useDataContext } from '../context/data-context';
import { truncateAddress } from '../utils';

const SignVerify = () => {
  const {
    walletAddress,
    switchNetwork,
    network,
    handleNetwork,
    signMessage,
    signature,
    message,
    handleInput,
    verifyMessage,
    verified
  } = useDataContext();

  return walletAddress ? (
    <HStack justifyContent="center" alignItems="flex-start" mt={5}>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" padding="10px">
        <VStack>
          <Button onClick={switchNetwork} isDisabled={!network}>
            Switch Network
          </Button>
          <Select placeholder="Select network" onChange={handleNetwork}>
            <option value="3">Ropsten</option>
            <option value="4">Rinkeby</option>
            <option value="5">Goerli</option>
            <option value="11155111">Sepolia</option>
          </Select>
        </VStack>
      </Box>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" padding="10px">
        <VStack>
          <Button onClick={signMessage} isDisabled={!message}>
            Sign Message
          </Button>
          <Input placeholder="Set Message" maxLength={20} onChange={handleInput} w="140px" />
          {signature ? (
            <Tooltip label={signature} placement="bottom">
              <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
            </Tooltip>
          ) : null}
        </VStack>
      </Box>
      <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" padding="10px">
        <VStack>
          <Button onClick={verifyMessage} isDisabled={!signature}>
            Verify Message
          </Button>
          {verified !== undefined ? (
            verified === true ? (
              <VStack>
                <Icon as={FaCheckCircle} color="green" />
                <Text>Signature Verified!</Text>
              </VStack>
            ) : (
              <VStack>
                <Icon as={FaExclamationCircle} color="red" />
                <Text>Signature Denied!</Text>
              </VStack>
            )
          ) : null}
        </VStack>
      </Box>
    </HStack>
  ) : null;
};

export default SignVerify;
