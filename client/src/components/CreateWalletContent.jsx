import React, { useMemo } from 'react';
import {
  Button,
  Icon,
  Text,
  Tooltip,
  Box,
  Input,
  Flex,
  Heading,
  Image,
  Tag,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  FormControl,
  IconButton,
  FormLabel,
  FormErrorMessage,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { IoIosCreate } from 'react-icons/io';
import { ErrorMessage, FieldArray, FormikProvider, useFormik, Form } from 'formik';
import { FaPlus, FaMinus, FaInfoCircle, FaTrash } from 'react-icons/fa';

import { useDataContext } from '../context/data-context';
import { CreateWalletAddressSchema } from '../utils';
import chains from '../common/chains';
import ResultModal from './ResultModal';

const initialFormValues = {
  guardians: [
    {
      publicKey: ''
    }
  ],
  numberOfGuards: ''
};

function CreateWalletContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { loading, setLoading, chainId, isWalletConnected, connectWallet } = useDataContext();
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      guardians: [
        {
          publicKey: ''
        }
      ],
      numberOfGuards: ''
    },
    onSubmit: async values => {
      if (isWalletConnected) {
        createWalletAddress(values);
      } else {
        connectWallet();
      }
    },
    validationSchema: CreateWalletAddressSchema
  });
  const { handleSubmit, handleChange, values, errors, resetForm, touched } = formik;

  const createWalletAddress = values => {
    console.log({ values });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetForm(initialFormValues);
      onOpen();
      toast({
        title: 'Success!',
        description: 'New social recovery wallet has been created!',
        status: 'success'
      });
    }, 3000);
  };

  const deleteFields = () => {
    resetForm(initialFormValues);
  };

  const chainIcon = useMemo(() => {
    const foundChain = chains.find(chain => chain.chain_id === chainId);
    const iconUrl = foundChain?.icon_url ?? '/images/1.svg';
    return iconUrl;
  }, [chainId]);

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h1" size="md">
            Create Recovery Wallet
          </Heading>
          {chainId && (
            <Tag size="lg" bg="blue.50" borderRadius="md" py={1} px={2}>
              <Flex alignItems="center" gap="1">
                <span style={{ verticalAlign: 'middle' }}>
                  <Text>Chain: </Text>
                </span>
                <span>
                  <Image borderRadius="full" boxSize="20px" objectFit="cover" src={chainIcon} alt="chain icon" />
                </span>
                <span style={{ verticalAlign: 'middle' }}>
                  <Heading as="h4" size="sm" noOfLines={1} color="blackAlpha.900">
                    {chainId}
                  </Heading>
                </span>
              </Flex>
            </Tag>
          )}
        </Flex>

        <Box mt={5}>
          <GasFeeAlert />
        </Box>

        <Box mt={5}>
          <FieldArray name="guardians">
            {({ push, remove }) => (
              <>
                <FormLabel>Guardian Addresses</FormLabel>
                {values.guardians.map((guardian, index) => {
                  const guardErrors = (errors.guardians?.length && errors.guardians[index]) || {};
                  const guardTouched = (touched.guardians?.length && touched.guardians[index]) || {};
                  const isInvalidTextValue = guardErrors.publicKey && guardTouched.publicKey ? true : false;

                  return (
                    <FormControl key={index} mt={2} isInvalid={isInvalidTextValue}>
                      <Flex mt={index === 0 ? undefined : 3} gap={4}>
                        <Input
                          placeholder={`Guardian address`}
                          name={`guardians[${index}].publicKey`}
                          value={guardian.publicKey}
                          onChange={handleChange}
                          disabled={loading}
                        />
                        {index > 0 && (
                          <IconButton colorScheme="red" icon={<Icon as={FaMinus} onClick={() => remove(index)} />} />
                        )}
                      </Flex>
                      <ErrorMessage
                        name={`guardians.${index}.publicKey`}
                        component="div"
                        className="chakra_similar_invalid_text"
                      />
                    </FormControl>
                  );
                })}

                <Flex mt={5} justifyContent="flex-end" gap={3}>
                  {values.guardians.length > 2 ? (
                    <Button
                      leftIcon={<Icon as={FaTrash} />}
                      colorScheme="red"
                      type="button"
                      variant="solid"
                      onClick={deleteFields}>
                      Clear All
                    </Button>
                  ) : null}

                  <IconButton
                    colorScheme="blue"
                    type="button"
                    icon={
                      <Icon
                        as={FaPlus}
                        onClick={() => {
                          if (values.guardians.length <= 4) {
                            push({ publicKey: '' });
                          } else {
                            toast({
                              title: 'Warning!',
                              description: "You can't add guardian address more than 5!",
                              status: 'warning'
                            });
                          }
                        }}
                      />
                    }
                  />
                </Flex>
              </>
            )}
          </FieldArray>
        </Box>

        <FormControl align="start" mt={5} isInvalid={errors.numberOfGuards && touched.numberOfGuards ? true : false}>
          <Tooltip hasArrow label="Minimum number of accounts for which approval is requested" placement="top">
            <FormLabel style={{ display: 'inline-flex' }} alignItems="center" gap={1}>
              <span>Number of Guardians</span>
              <Icon as={FaInfoCircle} color="blue.500" />
            </FormLabel>
          </Tooltip>
          <Input
            name="numberOfGuards"
            placeholder="Number of guardians required"
            type="number"
            value={values.numberOfGuards}
            onChange={handleChange}
            disabled={loading}
          />
          <FormErrorMessage>{errors.numberOfGuards}</FormErrorMessage>
        </FormControl>

        <FormControl align="end" mt={5}>
          <Button
            isLoading={loading}
            loadingText="Creating"
            leftIcon={<Icon as={IoIosCreate} />}
            colorScheme="blue"
            type="submit"
            variant="solid">
            Create Account
          </Button>
        </FormControl>
      </Form>
      <ResultModal isOpen={isOpen} onClose={onClose} />
    </FormikProvider>
  );
}

export default CreateWalletContent;

function GasFeeAlert() {
  return (
    <Alert status="info" align="start" bg="blue.50">
      <AlertIcon />
      <Box>
        <AlertTitle>Attention!</AlertTitle>
        <AlertDescription>
          Creating a recovery wallet with guardians causes gas fee. Make sure you have enough balance in your wallet.
        </AlertDescription>
      </Box>
    </Alert>
  );
}
