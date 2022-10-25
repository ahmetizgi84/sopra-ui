import { Heading, Box, VStack, Tag, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import React from 'react';
import Blockies from 'react-blockies';
import { v4 as uuidv4 } from 'uuid';

import { useDataContext } from '../context/data-context';
import TabLayout from './TabLayout';

function GuardsTab() {
  const { guardians } = useDataContext();

  return (
    <TabLayout>
      <Box boxShadow="base" p="6" rounded="md" bg="white" h={500}>
        <VStack>
          <Heading as="h1" size="md" noOfLines={1}>
            Dedicated Guardians
          </Heading>

          <Box p={3} />

          {guardians && guardians.length > 0 ? (
            guardians?.map(guard => (
              <Tag key={uuidv4()} size="lg" bg="teal.50" borderRadius="base" px={4} py={2} w={300}>
                <Flex alignItems="center" gap="2">
                  <span style={{ verticalAlign: 'middle' }}>
                    <Blockies seed={guard.toLowerCase()} size={10} scale={20 / 7} />
                  </span>
                  <span style={{ verticalAlign: 'middle', paddingLeft: 5, fontSize: 20 }}>
                    <Heading size="sm" noOfLines={1} color="balckAlpha.900">
                      {guard}
                    </Heading>
                  </span>
                </Flex>
              </Tag>
            ))
          ) : (
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px">
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                No Guardians
              </AlertTitle>
              <AlertDescription maxWidth="sm">There s no any specified guardians!</AlertDescription>
            </Alert>
          )}
        </VStack>
      </Box>
    </TabLayout>
  );
}

export default GuardsTab;
