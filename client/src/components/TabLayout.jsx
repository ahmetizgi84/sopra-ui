import React from 'react';
import { Container } from '@chakra-ui/react';

function TabLayout({ children }) {
  return (
    <Container maxW="2xl" color="#262626">
      {children}
    </Container>
  );
}

export default TabLayout;
