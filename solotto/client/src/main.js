import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import unoverlay from 'unoverlay-vue';
import SolanaWallets from 'solana-wallets-vue';
// import useWorkspace from './services/useWorkspace';
import './assets/css/tailwind.css'
import './assets/css/wallets.css';

import {
  BraveWalletAdapter,
  PhantomWalletAdapter,
  CoinbaseWalletAdapter,
  SlopeWalletAdapter,
  TrustWalletAdapter,
  HyperPayWalletAdapter,
  SolflareWalletAdapter,
  GlowWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
  ExodusWalletAdapter,
  Coin98WalletAdapter,
  SolongWalletAdapter,
  StrikeWalletAdapter,
  WalletConnectWalletAdapter,
  MathWalletAdapter,
  LedgerWalletAdapter,
} from '@solana/wallet-adapter-wallets';

const walletOptions = {
  wallets: [
    new BraveWalletAdapter(),
    new PhantomWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new SolflareWalletAdapter(),
    new SlopeWalletAdapter(),
    new HyperPayWalletAdapter(),
    new TrustWalletAdapter(),
    new GlowWalletAdapter(),
    new SolletWalletAdapter(),
    new SolletExtensionWalletAdapter(),
    new TorusWalletAdapter(),
    new ExodusWalletAdapter(),
    new Coin98WalletAdapter(),
    new SolongWalletAdapter(),
    new StrikeWalletAdapter(),
    new WalletConnectWalletAdapter({ network: 'devnet'}),
    new MathWalletAdapter(),
    new LedgerWalletAdapter()
  ],
  autoConnect: true
}

createApp(App)
  .use(store)
  .use(SolanaWallets, walletOptions)
  .use(unoverlay)
  .mount('#app');

