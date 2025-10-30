<template>
<div>
  <header>
  <video autoplay loop  play class="fixed -z-10 w-auto min-w-full min-h-full opacity-60">
    <source src="./assets/vids/hero.mp4" type="video/mp4" />
  </video>
</header>
  <div :class="this.$store.state.dark ? 'bg-black/50' : 'bg-white/50'">
    <NavbarWallet :users="users" :balance="balance" :time="time" class="z-50 fixed"/>
    <hero-section class="bg-transparent"></hero-section>
    <about-section ></about-section>
    <collection-section></collection-section>
    <team-section></team-section>
    <social-section ></social-section>
    <FooterComp class="z-20" :time="time" :users="users" />
  </div>
</div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import NavbarWallet from './components/NavbarWallet.vue';
import FooterComp from './components/FooterComp.vue';
import { useAnchorWallet } from 'solana-wallets-vue';
import { Connection } from '@solana/web3.js';
import io from 'socket.io-client';
import bgmusic from './assets/mp3/track2.mp3';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import CollectionSection from './components/ColectionSection.vue';
import SocialSection from './components/SocialSection.vue';
import TeamSection from './components/TeamSection.vue';


export default {
  name: 'App',
  components: {
    NavbarWallet,
    HeroSection,
    AboutSection,
    CollectionSection,
    SocialSection,

TeamSection,
    FooterComp,
    
  },
  
  setup () {

    const music = new Audio(bgmusic);
    // if ( store.state.sound )
    music.play();
    music.play();


    // if ( !store.state.sound )
    //   music.pause();

    const socket = io(process.env.VUE_APP_SOCKET_ENDPOINT, {
         transports: ['websocket'],
        });
    const users = ref();
    socket.on('userNumber', (data) => {
      users.value = String(data).split(' ')[1];
      return data;
    });

    function formatTime (num) {
      if (String(num).length < 2) 
        return '0' + String(num);
      else if (String(num).length < 1) 
        return '00';
      return String(num);
    }

    // User wallet
    const wallet = useAnchorWallet();
    const user_wallet = ref('');
    try {
      user_wallet.value = wallet.value.publicKey;
    } catch { console.log('Wallet connection error')}
    const connection = new Connection(process.env.VUE_APP_CLUSTER_URL, 'connected')
    const balance = ref();
    watchEffect(async () => {
    try {
      user_wallet.value = wallet.value.publicKey;
    } catch { console.log('Wallet connection error')}
      const bal = await connection.getBalance(user_wallet.value)/1000000000;
      balance.value = Math.floor(bal*100)/100;
      setInterval( async () => {
        balance.value = Math.floor(await connection.getBalance(user_wallet.value)/1000000000*100)/100;
      }, 10000);
    });

    const date = ref('')
    date.value = getDate();
    function getDate () {
      const d = new Date;
      const year = formatTime(d.getUTCFullYear());
      const month = formatTime(d.getUTCMonth()+1);
      const day = formatTime(d.getUTCDate());
      return `${year}-${month}-${day}`;
    }

    const time = ref('');
    time.value = getTime();
    function getTime () {
      const d = new Date;
      const hours = formatTime(d.getUTCHours());
      const minutes = formatTime(d.getMinutes());
      const seconds = formatTime(d.getSeconds());
      return `${hours}:${minutes}:${seconds}`;
    }

    return {
      users,
      balance,
      date,
      time,
    }
  }
}
</script>

<style>


html {
  overflow-x: hidden;
}

video{
  z-index: -1;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background-color: rgba(184, 184, 184, 0.692);
  border-radius: 0.75rem;
  margin: 0.4rem;
  border-left: 1px solid rgba(211, 211, 211, 0);
}

::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background:  linear-gradient(30deg, #d31bb47c, #ae0ce05d);
  box-shadow: inset 0 0 6px #c41bd3,
}
</style>

