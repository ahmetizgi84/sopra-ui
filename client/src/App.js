import { Box, Flex } from '@chakra-ui/react';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Tabbar from './components/Tabbar';

function App() {
  return (
    <Flex bg="gray.50" minWidth="max-content" direction="column" justifyContent="space-between">
      <Box>
        <Navbar />
        <Tabbar />
      </Box>
      <Footer />
    </Flex>
  );
}

export default App;
