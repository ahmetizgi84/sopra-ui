import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useToast,
  VStack
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FaCopy } from 'react-icons/fa';

function ResultModal({ isOpen, onClose }) {
  const toast = useToast();

  const copyToClipboard = value => {
    toast({
      title: 'Copied!',
      description: value,
      status: 'success'
    });
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Your Wallet Info</ModalHeader>

        <ModalBody pb={6}>
          <Alert borderRadius="md" status="success" variant="subtle" mb={3}>
            <AlertIcon boxSize="24px" />
            <AlertDescription>New wallet address has been created! </AlertDescription>
          </Alert>

          <Alert borderRadius="md" status="warning" variant="subtle" mb={10}>
            <AlertIcon boxSize="24px" />
            <AlertDescription>
              Make sure keeping the private key generated below in a safe before closing this page.
            </AlertDescription>
          </Alert>

          <VStack align="start">
            <Text fontSize="sm">Your wallet address</Text>
            <Flex bg="blackAlpha.200" borderRadius="md" px={3} py={2} w="100%" alignItems="center">
              <Text flex={1}>0x9F331f626378DE66fE4bc2d382EAb33F9542AD60</Text>
              <Tooltip label="Copy" placement="top">
                <IconButton
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  icon={<Icon as={FaCopy} />}
                  onClick={() => copyToClipboard('0x9F331f626378DE66fE4bc2d382EAb33F9542AD60')}
                />
              </Tooltip>
            </Flex>
            <Text fontSize="sm">Private key</Text>
            <Flex bg="blackAlpha.200" borderRadius="md" px={3} py={2} w="100%" alignItems="center">
              <Text flex={1}>{uuidv4()}</Text>
              <Tooltip label="Copy" placement="top">
                <IconButton
                  variant="outline"
                  colorScheme="blue"
                  size="sm"
                  icon={<Icon as={FaCopy} />}
                  onClick={() => copyToClipboard('f550dce3-3aa5-4c0f-91c5-d9f1f08e62cb')}
                />
              </Tooltip>
            </Flex>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose} type="button">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ResultModal;
