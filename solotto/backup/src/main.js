import { createApp } from 'vue';
import App from './App.vue';
import unoverlay from 'unoverlay-vue';
import SolanaWallets from 'solana-wallets-vue';
import './styles.css';

import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  CoinbaseWalletAdapter,
  BraveWalletAdapter,
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
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new CoinbaseWalletAdapter(),
    new BraveWalletAdapter(),
    new TrustWalletAdapter(),
    new HyperPayWalletAdapter(),
    new SolflareWalletAdapter(),
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
  .use(SolanaWallets, walletOptions)
  .use(unoverlay)
  .mount('#app');


