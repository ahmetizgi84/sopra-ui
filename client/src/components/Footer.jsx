import { Container, Flex, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex bg="blue.900" pt={12} pb={2} alignItems="center" justifyContent="center">
      <Container maxW="3xl" align="center">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem w="100%" align="center" color="white">
            <Link>About</Link>
          </GridItem>
          <GridItem w="100%" align="center" color="white">
            <Link>FAQ</Link>
          </GridItem>
          <GridItem w="100%" align="center" color="white">
            <Link>Contact Us</Link>
          </GridItem>
          <GridItem w="100%" align="center" color="white">
            <Link>Help & Support</Link>
          </GridItem>
        </Grid>
        <Text fontSize="sm" mt={9} color="whiteAlpha.700">
          ©{new Date().getFullYear()} SOPRA digital recovery wallets
        </Text>
      </Container>
    </Flex>
  );
};

export default Footer;
