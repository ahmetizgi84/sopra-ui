import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  Heading,
  Image,
  Alert,
  AlertIcon,
  Box,
  AlertTitle,
  AlertDescription,
  IconButton,
  Icon,
  Tooltip,
  FormErrorMessage
} from '@chakra-ui/react';
import { ErrorMessage, FieldArray, FormikProvider, useFormik, Form } from 'formik';
import { useMemo } from 'react';
import { FaPlus, FaMinus, FaInfoCircle } from 'react-icons/fa';

import { useDataContext } from '../context/data-context';
import chains from '../common/chains';
import { CreateWalletAddressSchema } from '../utils';

const initialFormValues = {
  guardians: [
    {
      publicKey: ''
    }
  ],
  numberOfGuards: ''
};

function SopraModal() {
  const { loading, setLoading, isOpen, onClose, chainId } = useDataContext();
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
      createWalletAddress(values);
    },
    validationSchema: CreateWalletAddressSchema
  });
  const { handleSubmit, handleChange, values, errors, resetForm, touched } = formik;

  const handleClose = () => {
    onClose();
    resetForm(initialFormValues);
  };

  // 0x9F331f626378DE66fE4bc2d382EAb33F9542AD60

  // create a new wallet
  const createWalletAddress = values => {
    console.log({ values });
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClose();
    }, 3000);
  };

  const chainIcon = useMemo(() => {
    const foundChain = chains.find(chain => chain.chain_id === chainId);
    const iconUrl = foundChain?.icon_url;
    return iconUrl;
  }, [chainId]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <ModalHeader>
              <Flex alignItems="center" justifyContent="space-between">
                Create Recovery Wallet
                <Tag size="lg" bg="teal.50" borderRadius="full" py={1} px={2}>
                  <Flex alignItems="center" gap="1">
                    <span style={{ verticalAlign: 'middle' }}>
                      <Text>Chain: </Text>
                    </span>
                    <span>
                      <Image borderRadius="full" boxSize="20px" objectFit="cover" src={chainIcon} alt="chain icon" />
                    </span>
                    <span style={{ verticalAlign: 'middle' }}>
                      <Heading as="h1" size="sm" noOfLines={1} color="blackAlpha.900">
                        {chainId}
                      </Heading>
                    </span>
                  </Flex>
                </Tag>
              </Flex>
            </ModalHeader>

            <ModalBody pb={6}>
              <Box mb={5}>
                <GasFeeAlert />
              </Box>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              {/* <pre>{JSON.stringify(touched, null, 2)}</pre> */}

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
                            />
                            {index > 0 && (
                              <IconButton
                                colorScheme="red"
                                icon={<Icon as={FaMinus} onClick={() => remove(index)} />}
                              />
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

                    <Flex mt={5} justifyContent="flex-end">
                      <IconButton
                        colorScheme="teal"
                        type="button"
                        icon={<Icon as={FaPlus} onClick={() => push({ publicKey: '' })} />}
                      />
                    </Flex>
                  </>
                )}
              </FieldArray>

              <FormControl mt={5} isInvalid={errors.numberOfGuards && touched.numberOfGuards ? true : false}>
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
                />
                <FormErrorMessage>{errors.numberOfGuards}</FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} isLoading={loading} loadingText="Creating" type="submit">
                Create
              </Button>
              <Button onClick={handleClose} type="button">
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </FormikProvider>
      </ModalContent>
    </Modal>
  );
}

export default SopraModal;

function GasFeeAlert() {
  return (
    <Alert status="info">
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
