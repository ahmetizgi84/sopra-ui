const chains = [
  {
    name: 'All Chains',
    short_name: 'all',
    chain: 'all',
    network: '',
    is_testnet: undefined,
    inProduction: true,
    chain_id: 0,
    network_id: 0,
    rpc_url: '',
    icon_url: '/images/all.png',
    explorer_url: '',
    native_currency: {
      symbol: '',
      name: '',
      decimals: 18
    }
  },
  {
    name: 'Ethereum',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    is_testnet: false,
    inProduction: true,
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    icon_url: '/images/eth.svg',
    explorer_url: 'https://etherscan.io/',
    exchange_transferProxy_address: '0xbba4c1a0dcd50954addfc6434cb7d15e51d4933a',
    exchange_address: '0x2bae20cea439f08f10ccaeac4532e7f319ad32b9',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18
    },
    erc20_currencies: [
      {
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
        contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        currencyImageUrl: `${window.location.origin}/images/weth.svg`
      },
      {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 18,
        contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
        currencyImageUrl: `${window.location.origin}/images/tetherusdt.svg`
      },
      {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 18,
        contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        currencyImageUrl: `${window.location.origin}/images/USDC.png`
      }
    ]
  },
  {
    name: 'Avalanche',
    short_name: 'avax',
    chain: 'AVAX',
    network: 'mainnet',
    is_testnet: false,
    inProduction: false,
    chain_id: 43114,
    network_id: 43114,
    rpc_url: 'https://api.avax.network/ext/bc/C/rpc',
    icon_url: '/images/avax.svg',
    explorer_url: 'https://snowtrace.io/',
    exchange_transferProxy_address: '0x8A3F8e1Cf9D452B182F34921d9329EB93BcA5267',
    exchange_address: '0xb93caC09560A171a0A872472e1a6E6E467686e7F',
    native_currency: {
      symbol: 'AVAX',
      name: 'AVAX',
      decimals: 18
    },
    erc20_currencies: [
      {
        name: 'Wrapped Avax',
        symbol: 'WAVAX',
        decimals: 18,
        contractAddress: '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
        currencyImageUrl: `${window.location.origin}/images/wavax.svg`
      },
      {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 18,
        contractAddress: '0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7',
        currencyImageUrl: `${window.location.origin}/images/tetherusdt.svg`
      },
      {
        name: 'USD Coin',
        symbol: 'USDC',
        decimals: 18,
        contractAddress: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
        currencyImageUrl: `${window.location.origin}/images/USDC.png`
      }
    ]
  },
  {
    name: 'Binance Smart Chain',
    short_name: 'bsc',
    chain: 'smartchain',
    network: 'mainnet',
    is_testnet: false,
    inProduction: false,
    chain_id: 56,
    network_id: 56,
    rpc_url: 'https://bsc-dataseed.binance.org/',
    icon_url: '/images/bsc.svg',
    explorer_url: 'https://bscscan.com/',
    exchange_transferProxy_address: '0xbba4c1a0dcd50954addfc6434cb7d15e51d4933a',
    exchange_address: '0x2bAE20cEa439F08F10ccaEaC4532E7F319AD32B9',
    native_currency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18
    },
    erc20_currencies: [
      {
        name: 'Wrapped BNB',
        symbol: 'WBNB',
        decimals: 18,
        contractAddress: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
        currencyImageUrl: `${window.location.origin}/images/wbnb.svg`
      },
      {
        name: 'Tether USD',
        symbol: 'USDT',
        decimals: 18,
        contractAddress: '0x55d398326f99059fF775485246999027B3197955',
        currencyImageUrl: `${window.location.origin}/images/tetherusdt.svg`
      },
      {
        name: 'Binance-Peg USD Coin',
        symbol: 'USDC',
        decimals: 18,
        contractAddress: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        currencyImageUrl: `${window.location.origin}/images/USDC.png`
      },
      {
        name: 'Binance USD',
        symbol: 'BUSD',
        decimals: 18,
        contractAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
        currencyImageUrl: `${window.location.origin}/images/busd.svg`
      }
    ]
  },
  {
    name: 'Polygon',
    short_name: 'matic',
    chain: 'MATIC',
    network: 'mainnet',
    is_testnet: false,
    inProduction: false,
    chain_id: 137,
    network_id: 137,
    rpc_url: '',
    icon_url: '/images/polygon.svg',
    explorer_url: 'https://polygonscan.com/token/{contractId}?a={tokenId}',
    native_currency: {
      symbol: 'MATIC',
      name: 'MATIC',
      decimals: 18
    }
  },
  {
    name: 'Fantom Opera',
    short_name: 'FTM',
    chain: 'FTM',
    network: 'mainnet',
    is_testnet: false,
    inProduction: false,
    chain_id: 250,
    network_id: 250,
    rpc_url: 'https://rpc.ftm.tools',
    icon_url: '/images/fantom.svg',
    explorer_url: 'https://ftmscan.com/token/{contractId}?a={tokenId}',
    native_currency: {
      symbol: 'FTM',
      name: 'FTM',
      decimals: 18
    }
  },
  {
    name: 'Avalanche Fuji Testnet',
    short_name: 'avax',
    chain: 'AVAX',
    network: 'testnet',
    is_testnet: true,
    inProduction: false,
    chain_id: 43113,
    network_id: 43113,
    rpc_url: 'https://api.avax-test.network/ext/bc/C/rpc',
    explorer_url: 'https://testnet.snowtrace.io',
    icon_url: '/images/avax.svg',
    exchange_address: '0x8FEBC41AbDc952a11F4F78d2af2E68A83Ac5D44B',
    exchange_transferProxy_address: '0x88fA5B7Eb2108F6702839434c143BC90F93eA5a8',
    native_currency: {
      symbol: 'AVAX',
      name: 'AVAX',
      decimals: 18
    },
    erc20_currencies: [
      // {
      //   name: 'Hebys',
      //   symbol: 'HEBYS',
      //   decimals: 18,
      //   //TODO Change token address
      //   contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      //   // TODO Replace image with non white version.
      //   currencyImageUrl: `${window.location.origin}/images/hebys.png`
      // },
      {
        name: 'USDC',
        symbol: 'USDC',
        decimals: 18,
        //TODO Change token address by chain.
        contractAddress: '0x1fb51612043215a644aB5cfb20ee37F3e431c132',
        // TODO Replace image with non white version.
        currencyImageUrl: `${window.location.origin}/images/USDC.png`
      },
      {
        name: 'WAVAX',
        symbol: 'WAVAX',
        decimals: 18,
        //TODO Change token address by chain.
        contractAddress: '0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3',
        // TODO Replace image with non white version.
        currencyImageUrl: `${window.location.origin}/images/avax.png`
      }
    ]
  },
  {
    name: 'Ethereum Ropsten Testnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'ropsten',
    is_testnet: true,
    inProduction: false,
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
    icon_url: '/images/eth.svg',
    explorer_url: 'https://ropsten.etherscan.io/',
    exchange_transferProxy_address: '0x45F992fEA843b1051C3b2c79D5611B72AE08D262',
    exchange_address: '0xfD3F0D92F3fD1BF1659a0b6134d4766DAf219118',
    native_currency: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18
    },
    erc20_currencies: [
      {
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
        //TODO Change token address by chain.
        contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
        // TODO Replace image with non white version.
        currencyImageUrl: `${window.location.origin}/images/weth.svg`
      }
    ]
  },
  {
    name: 'Binance Smart Chain Testnet',
    short_name: 'bsc',
    chain: 'smartchain',
    network: 'testnet',
    is_testnet: true,
    inProduction: false,
    chain_id: 97,
    network_id: 97,
    rpc_url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    icon_url: '/images/bsc.svg',
    explorer_url: 'https://testnet.bscscan.com/',
    exchange_address: '0x0221F7B8CcCB2eA0F142bF969b4500ee9FF24c03',
    exchange_transferProxy_address: '0xeAfC56fC26d7DAaDE0916EBAb5748Bd1D7D6ee7D',
    native_currency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18
    },
    erc20_currencies: [
      {
        name: 'WBNB',
        symbol: 'WBNB',
        decimals: 18,
        //TODO Change token address by chain.
        contractAddress: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
        // TODO Replace image with non white version.
        currencyImageUrl: `${window.location.origin}/images/wbnb.svg`
      },
      {
        name: 'BUSD',
        symbol: 'BUSD',
        decimals: 18,
        //TODO Change token address by chain.
        contractAddress: '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee',
        // TODO Replace image with non white version.
        currencyImageUrl: `${window.location.origin}/images/busd.svg`
      }
    ]
  },
  {
    name: 'Ethereum Rinkeby Testnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'rinkeby',
    is_testnet: true,
    inProduction: false,
    chain_id: 4,
    network_id: 4,
    rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
    icon_url: '/images/eth.svg',
    explorer_url: 'https://rinkeby.etherscan.io/',
    exchange_transferProxy_address: '0x13d20C311Fdd3fA37A2ECf6dc4baD53952DF09E2',
    exchange_address: '0x9564661BaeFE5d3FFb62d424d887BF0CA18067fc',
    native_currency: {
      symbol: 'ETH',
      name: 'Ether',
      decimals: 18
    },
    erc20_currencies: [
      {
        name: 'WETH',
        symbol: 'WETH',
        decimals: 18,
        //TODO Change token address by chain.
        contractAddress: '0xc778417E063141139Fce010982780140Aa0cD5Ab',
        // TODO Replace image with non white version.
        currencyImageUrl: `${window.location.origin}/images/weth.svg`
      }
    ]
  },
  {
    name: 'Sepolia Testnet',
    short_name: 'sep',
    chain: 'ETH',
    network: 'ethereum',
    is_testnet: true,
    inProduction: false,
    chain_id: 11155111,
    network_id: 11155111,
    rpc_url: '"https://rpc.sepolia.dev"',
    icon_url: '/images/eth.svg',
    explorer_url: 'https://sepolia.otterscan.io',
    exchange_transferProxy_address: '',
    exchange_address: '',
    native_currency: {
      name: 'Sepolia Ether',
      symbol: 'SEP',
      decimals: 18
    }
  }
];

export default chains;
