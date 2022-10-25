import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import WalletTab from './WalletTab';
import GuardsTab from './GuardsTab';

function Tabbar() {
  return (
    <Tabs align="center" mt={12}>
      <TabList>
        <Tab>New Recovery Wallet</Tab>
        <Tab>Save My Wallet</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <WalletTab />
        </TabPanel>
        <TabPanel>
          <GuardsTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Tabbar;
