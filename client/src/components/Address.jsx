import React from 'react';
import Blockies from 'react-blockies';
import { Tag, Flex, Heading } from '@chakra-ui/react';
import { truncateAddress } from '../utils';

export default function Address(props) {
  const address = props.value || props.address;

  return (
    <Tag size="lg" bg="whiteAlpha.300" borderRadius="full" px={6} py={1}>
      <Flex alignItems="center" gap="2">
        <span style={{ verticalAlign: 'middle' }}>
          <Blockies seed={address.toLowerCase()} size={10} scale={props.fontSize ? props.fontSize / 7 : 4} />
        </span>
        <span style={{ verticalAlign: 'middle', paddingLeft: 5, fontSize: props.fontSize ? props.fontSize : 28 }}>
          <Heading as="h1" size="sm" noOfLines={1} color="whiteAlpha.900">
            {truncateAddress(address)}
          </Heading>
        </span>
      </Flex>
    </Tag>
  );
}
