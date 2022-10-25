import {
  Box,
  VStack,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Icon,
  Button,
  Text,
  Tooltip,
  IconButton,
  useToast,
  Heading,
  Stack,
  AlertTitle
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import { FaCopy, FaMailBulk } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';

import { useDataContext } from '../context/data-context';
import { RecoverMyWalletSchema } from '../utils';
import TabLayout from './TabLayout';

// DUMMY RESPONSE MODEL
const responseModel = {
  guardians: [
    {
      id: 1,
      address: '0x9F331f626378DE66fE4bc2d382EAb33F9542AD60',
      isApproved: 'success'
    },
    {
      id: 2,
      address: '0x9F331f626378DE66fE4bc2d382EAb33F9542AD60',
      isApproved: 'success'
    },
    {
      id: 3,
      address: '0x9F331f626378DE66fE4bc2d382EAb33F9542AD60',
      isApproved: 'error'
    },
    {
      id: 4,
      address: '0x9F331f626378DE66fE4bc2d382EAb33F9542AD60',
      isApproved: 'success'
    }
  ],
  allApproved: false,
  isAlreadyRequested: true
};

function RecoverMyWalletTab() {
  const toast = useToast();
  const [isVisible, setIsVisible] = React.useState(false);
  const [isApprovalVisible, setIsApprovalVisible] = React.useState(false);
  const { loading, setLoading, isWalletConnected, connectWallet } = useDataContext();

  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      addressToBeRecovered: '',
      newWalletAddress: ''
    },
    onSubmit: async values => {
      if (isWalletConnected) {
        createLinkHandler(values);
      } else {
        connectWallet();
      }
    },
    validationSchema: RecoverMyWalletSchema
  });
  const { handleSubmit, handleChange, values, errors, touched } = formik;

  // Request recovery process & create a link
  const createLinkHandler = values => {
    console.log('values: ', values);

    //if user hasn't requested recovery process yet.
    if (!responseModel.isAlreadyRequested) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsVisible(true);
      }, 3500);
      // user has already requested recovery process.
    } else {
      setIsApprovalVisible(true);
      toast({
        title: 'Waiting!',
        description: "You've already requested recovery process. Please wait approval of the guardians",
        status: 'warning'
      });
    }
  };

  const copy = value => {
    copyToClipboard(value);
    toast({
      title: 'Copied!',
      description: value,
      status: 'success'
    });
  };

  return (
    <TabLayout>
      <Box boxShadow="base" p="6" rounded="md" bg="white">
        <VStack>
          <Box w="100%" mb={5}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl isInvalid={errors.addressToBeRecovered && touched.addressToBeRecovered ? true : false}>
                <FormLabel>Wallet Addres To Be Recovered</FormLabel>
                <Input
                  name="addressToBeRecovered"
                  placeholder="wallet address"
                  value={values.addressToBeRecovered}
                  onChange={handleChange}
                  disabled={loading}
                />
                <FormErrorMessage>{errors.addressToBeRecovered}</FormErrorMessage>
              </FormControl>

              <Alert status="warning" variant="subtle" mt={5}>
                <AlertIcon boxSize="24px" />
                <AlertDescription>
                  In order to start recovering process, you need to provide a new wallet address to keep your assets
                  which will be sent after recovery process.
                </AlertDescription>
              </Alert>

              <FormControl mt={4} isInvalid={errors.newWalletAddress && touched.newWalletAddress ? true : false}>
                <FormLabel>New Wallet Address</FormLabel>
                <Input
                  name="newWalletAddress"
                  placeholder="new wallet address"
                  value={values.newWalletAddress}
                  onChange={handleChange}
                  disabled={loading}
                />
                <FormErrorMessage>{errors.newWalletAddress}</FormErrorMessage>
              </FormControl>

              <FormControl align="end" mt={5}>
                <Button
                  isLoading={loading}
                  loadingText="Creating"
                  leftIcon={<Icon as={IoIosCreate} />}
                  colorScheme="blue"
                  type="submit"
                  variant="solid">
                  Create Link
                </Button>
              </FormControl>
            </form>
          </Box>

          {isVisible && (
            <VStack align="start" w="100%" spacing={6}>
              <Box w="100%" align="start">
                <Alert status="info" bg="blue.50" variant="subtle">
                  <AlertIcon boxSize="24px" />
                  <AlertDescription>
                    Please share the link generated below with guardian wallet account owners.
                  </AlertDescription>
                </Alert>
                <Text fontSize="sm" mb={1} mt={3}>
                  Generated Link
                </Text>
                <Flex bg="blackAlpha.200" borderRadius="md" px={3} py={2} w="100%" alignItems="center">
                  <Text flex={1}>https://tinyurl.com/32ceteu3</Text>
                  <Tooltip label="Copy" placement="top">
                    <IconButton
                      variant="outline"
                      colorScheme="blue"
                      size="sm"
                      icon={<Icon as={FaCopy} />}
                      onClick={() => copy('https://tinyurl.com/32ceteu3')}
                    />
                  </Tooltip>
                </Flex>
              </Box>

              <Flex justifyContent="flex-end" w="100%">
                <Button
                  isLoading={loading}
                  loadingText="Creating"
                  leftIcon={<Icon as={FaMailBulk} />}
                  colorScheme="blue"
                  type="submit"
                  variant="solid">
                  Share Link
                </Button>
              </Flex>
            </VStack>
          )}

          {isApprovalVisible && (
            <VStack align="start" w="100%" spacing={6}>
              <Heading as="h4" size="sm">
                Waiting for Approval
              </Heading>

              <Stack align="start" w="100%" spacing={3}>
                {responseModel.guardians.map(guardian => (
                  <Alert key={guardian.id} status={guardian.isApproved} variant="left-accent">
                    <AlertIcon />
                    {guardian.address}
                  </Alert>
                ))}
              </Stack>

              {responseModel.allApproved && (
                <Alert
                  status="success"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  height="200px">
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    Approved!
                  </AlertTitle>
                  <AlertDescription maxWidth="sm">
                    All assests you own have been transfered to address that you define.
                  </AlertDescription>
                </Alert>
              )}
            </VStack>
          )}
        </VStack>
      </Box>
    </TabLayout>
  );
}

export default RecoverMyWalletTab;
