import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import WalletTab from './WalletTab';
import RecoverMyWalletTab from './RecoverMyWalletTab';

function Tabbar() {
  return (
    <Tabs align="center" mt={12}>
      <TabList>
        <Tab>New Recovery Wallet</Tab>
        <Tab>Recover My Wallet</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <WalletTab />
        </TabPanel>
        <TabPanel>
          <RecoverMyWalletTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Tabbar;
