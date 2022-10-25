import { ethers } from 'ethers';
import { createContext, useCallback, useContext, useReducer, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import Web3Modal from 'web3modal';
import { providerOptions } from './providerOptions';
import { toHex } from '../utils';
import { networkParams } from '../networks';

const DataContext = createContext();

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

const initialState = {
  loading: false,
  appName: 'SOPRA - Social Recovery Wallet',
  walletAddress: '',
  message: '',
  signedMessage: '',
  signature: '',
  isWalletConnected: false,
  provider: null,
  library: null,
  network: null,
  chainId: undefined,
  verified: undefined,
  numberOfGuardians: 1
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_LOADING':
      return { ...state, loading: payload };
    case 'SET_WALLET_ADDRESS':
      return { ...state, walletAddress: payload };
    case 'SET_WALLET_CONNECTED':
      return { ...state, isWalletConnected: payload };
    case 'SET_PROVIDER':
      return { ...state, provider: payload };
    case 'SET_LIBRARY':
      return { ...state, library: payload };
    case 'SET_NETWORK':
      return { ...state, network: payload };
    case 'SET_CHAIN_ID':
      return { ...state, chainId: payload };
    case 'SET_MESSAGE':
      return { ...state, message: payload };
    case 'SET_SIGNED_MESSAGE':
      return { ...state, signedMessage: payload };
    case 'SET_SIGNATURE':
      return { ...state, signature: payload };
    case 'SET_VERIFIED':
      return { ...state, verified: payload };
    case 'SET_NUMBER_OF_GUARDIANS':
      return { ...state, numberOfGuardians: payload };
    case 'CLEAR_ALL_DATA':
      return { ...state, provider: null, isWalletConnected: false, walletAddress: '', chainId: null };

    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    loading,
    appName,
    walletAddress,
    isWalletConnected,
    provider,
    chainId,
    library,
    network,
    message,
    signedMessage,
    signature,
    verified,
    numberOfGuardians
  } = state;
  const toast = useToast();

  // 🏃‍♂️ Actions ################################################################################
  const setLoading = useCallback(_loading => {
    dispatch({ type: 'SET_LOADING', payload: _loading });
  }, []);

  const setWalletAddress = useCallback(_walletAddress => {
    dispatch({ type: 'SET_WALLET_ADDRESS', payload: _walletAddress });
  }, []);

  const setWalletConnected = useCallback(() => {
    dispatch({ type: 'SET_WALLET_CONNECTED', payload: true });
  }, []);

  const setProvider = useCallback(_provider => {
    dispatch({ type: 'SET_PROVIDER', payload: _provider });
  }, []);

  const setLibrary = useCallback(_library => {
    dispatch({ type: 'SET_LIBRARY', payload: _library });
  }, []);

  const setNetwork = useCallback(_network => {
    dispatch({ type: 'SET_NETWORK', payload: _network });
  }, []);

  const setChainId = useCallback(_chainId => {
    dispatch({ type: 'SET_CHAIN_ID', payload: _chainId });
  }, []);

  const setSignedMessage = useCallback(_message => {
    dispatch({ type: 'SET_SIGNED_MESSAGE', payload: _message });
  }, []);

  const setMessage = useCallback(_message => {
    dispatch({ type: 'SET_MESSAGE', payload: _message });
  }, []);

  const setSignature = useCallback(_signature => {
    dispatch({ type: 'SET_SIGNATURE', payload: _signature });
  }, []);

  const setVerified = useCallback(_isVerified => {
    dispatch({ type: 'SET_VERIFIED', payload: _isVerified });
  }, []);

  const setNumberOfGuardians = useCallback(_guardianNumber => {
    dispatch({ type: 'SET_NUMBER_OF_GUARDIANS', payload: _guardianNumber });
  }, []);

  const clearAllData = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL_DATA' });
  }, []);

  // 🚀 Handlers ###############################################################################

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setWalletAddress(accounts[0]);
      setChainId(network.chainId);
      setWalletConnected();
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'bottom-right'
      });
    }
  };

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    clearAllData();
  };

  const handleNetwork = e => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(network) }]
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams[toHex(network)]]
          });
        } catch (error) {
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            position: 'bottom-right'
          });
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: 'personal_sign',
        params: [message, walletAddress]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'bottom-right'
      });
    }
  };

  const handleInput = e => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: 'personal_ecRecover',
        params: [signedMessage, signature]
      });
      setVerified(verify === walletAddress.toLowerCase());
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'bottom-right'
      });
    }
  };

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = accounts => {
        if (accounts && accounts.length > 0) setWalletAddress(accounts[0]);
        else disconnectWallet();
      };

      const handleChainChanged = _hexChainId => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        disconnectWallet();
      };

      provider.on('disconnect', handleDisconnect);
      provider.on('chainChanged', handleChainChanged);
      provider.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('disconnect', handleDisconnect);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [provider]);

  const value = {
    appName,
    loading,
    walletAddress,
    isWalletConnected,
    chainId,
    network,
    signature,
    message,
    verified,
    numberOfGuardians,
    connectWallet,
    disconnectWallet,
    setLoading,
    switchNetwork,
    handleNetwork,
    signMessage,
    handleInput,
    verifyMessage,
    setNumberOfGuardians
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export { useDataContext, DataProvider };
