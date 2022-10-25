import { Alert } from '@chakra-ui/react';
import Web3 from 'web3';
import * as yup from 'yup';

export const truncateAddress = address => {
  if (!address) return 'No Account';
  const match = address.match(/^(0x[a-zA-Z0-9]{3})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = num => {
  const val = Number(num);
  return '0x' + val.toString(16);
};

export async function copyToClipboard(info) {
  navigator.clipboard
    .writeText(info)
    .then(() => {})
    .catch(() => {
      Alert("Couldn't copied!");
    });
}

const verifyAddress = address => {
  if (address) {
    if (Web3.utils.isAddress(address)) {
      return true;
    } else {
      return false;
    }
  }
};

export const CreateWalletAddressSchema = yup.object().shape({
  numberOfGuards: yup.string().required('Required Field'),
  guardians: yup.array().of(
    yup.object().shape({
      publicKey: yup
        .string()
        .trim()
        .required('Required Field')
        .test('test-address', 'Invalid wallet address!', publicKey => verifyAddress(publicKey))
    })
  )
});

export const RecoverMyWalletSchema = yup.object().shape({
  addressToBeRecovered: yup
    .string()
    .trim()
    .required('Required Field')
    .test('test-address', 'Invalid wallet address!', addressToBeRecovered => verifyAddress(addressToBeRecovered)),
  newWalletAddress: yup
    .string()
    .trim()
    .required('Required Field')
    .test('test-address', 'Invalid wallet address!', newWalletAddress => verifyAddress(newWalletAddress))
});
