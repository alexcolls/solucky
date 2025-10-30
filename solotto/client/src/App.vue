<template>
  <div :class="this.$store.state.dark ? 'bg-gray-900' : 'bg-gray-100'">
    <div class="h-screen w-screen m-0 -mb-12" :class="this.$store.state.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">
      <NavbarWallet :users="users" :balance="balance" :time="time" />
      <div class="flex flex-wrap top-24 left-0 right-0" :class="this.$store.state.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">
        <PotPanel :date="date" :countdown="countdown" :potSOL="potSOL" :potUSD="potUSD" :tickets="tickets" :nVerified="nVerified" :nPlayers="nPlayers" :wallet="user_wallet" />
        <PlayPanel @commit="(number) => commitNumber(number)" v-on="newTicket" :balance="balance" :potSOL="potSOL" :tickets="tickets" :countdown="countdown" :yourNumbers="yourNumbers" :yourProbability="yourProbability" :yourROI="yourROI" />
        <HistoryPanel :history="history" :totalCountries="totalCountries" :totalPlayers="totalPlayers" :maxPot="maxPot" :avgPot="avgPot" :chartData="chartData" :chartLabels="chartLabels" :wallet="user_wallet" />
      </div>
      <div class="p-4 pt-8 text-center text-xs text-gray-400" :class="this.$store.state.dark ? 'bg-gray-900' : 'bg-gray-100'" > 
        <div class="flex justify-center items-center rounded-xl m-4">
          <!-- Server time -->
          <div class="text-center text-md tracking-widest font-semibold justify-center mr-8 text-gray-400">
            {{ time }}<span class="text-xs"> UTC</span>
          </div>
          <!-- Users connected -->
          <div class="text-center text-md tracking-widest font-semibold justify-center mr-8 text-gray-400">
            <span class="text-xs">
              CONNECTED: 
            </span>
            {{ users }}
          </div>
          <!-- Users flag -->
          <div class="text-center text-md tracking-widest font-semibold justify-center mr-8 text-gray-400">
            {{ location.flag }}
          </div>
        </div>
        Made with 💓 by Solucky Games © All rights reserved. <br>Built in <a href="https://solana.com/" target="_blank" class="underline">Solana</a> in 2022. Good luck all!
      </div>
    </div>
    <!-- <CommitModal class="invisible hidden"/> -->
  </div>
</template>

<script>
import NavbarWallet from './components/NavbarWallet.vue';
import PotPanel from './components/PotPanel.vue';
import PlayPanel from './components/PlayPanel.vue';
import HistoryPanel from './components/HistoryPanel.vue';
import { ref, watchEffect } from 'vue';
import { useAnchorWallet, useWallet } from 'solana-wallets-vue';
import { Connection, PublicKey, clusterApiUrl, SystemProgram, Transaction } from '@solana/web3.js';
import io from 'socket.io-client';
import commit_sound from './assets/sounds/3.wav';
import commited_sound from './assets/sounds/2.wav';
import wrong_sound from './assets/sounds/wrong.mp3';
import pot_sound from './assets/sounds/pot.mp3'
import store from './store';

const preflightCommitment = 'processed'
const cluster = 'devnet'
const commitSOL = 1;


export default {
  name: 'App',
  components: {
    NavbarWallet,
    PotPanel,
    PlayPanel,
    HistoryPanel,
    
    // CommitModal
  },
  data() {

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

    const countdown = ref('');
    countdown.value = countDown();
    function countDown () {
      const time = getTime().split(':');
      const hours = formatTime(23-time[0]);
      const minutes = formatTime(59-time[1]);
      const seconds = formatTime(59-time[2]);
      return `${hours}h ${minutes}m ${seconds}s`;
    }

    // Pot sound 00:00:00 UTC
    const pot_audio = new Audio(pot_sound);
    setInterval( () => {
      time.value = getTime();
      countdown.value = countDown();
      if ( time.value === '00:00:00' ) {
        date.value = getDate();
        if ( store.state.sound )
          pot_audio.play();
      }
    }, 1000);

    // Pot 
    const potSOL = ref(0);
    const potUSD = ref(0);
    socket.on('getPOT', (data) => {
      //console.log(data);
      potSOL.value = data.potSOL || 0;
      potUSD.value = data.potUSD || 0;
    });

    // history []
    const history = ref([]);
    const chartData = ref([]);
    const chartLabels = ref([]);
    const maxPot = ref(0);
    const avgPot = ref(0);
    socket.on('getHistory', (data, error) => {
      if (error) console.log('Error on socket:', error);
      let cumPot = 0;
      let sumPot = 0;
      let i = 0;
      for ( const x of data ) {
        if( x._pot > maxPot.value ) maxPot.value = Math.floor(x._pot);
        sumPot += x._pot;
        cumPot += Number(x._pot);
        chartData.value = [...chartData.value, cumPot ];
        chartLabels.value = [...chartLabels.value, x.__date__.substring(5,10) ];
        i++;
      }
      avgPot.value = Math.floor((sumPot / i)) || 0;
      history.value = data.reverse();
    });

    // total historical countries & players
    const totalCountries = ref(0);
    socket.on('totalCountries', (data, error) => {
      if (error) console.log('Error on socket:', error);
      totalCountries.value = data
    });
    const totalPlayers = ref(0);
    socket.on('totalPlayers', (data, error) => {
      if (error) console.log('Error on socket:', error);
      totalPlayers.value = data
    });


    // tickets []
    const tickets = ref([]);
    socket.on('getTickets', (data, error) => {
      if (error) console.log('Error on socket:', error);
      tickets.value = data;
    });

    // nVerified
    const nVerified = ref(0);
    socket.on('nVerified', (data, error) => {
      if (error) console.log('Error on socket:', error);
      nVerified.value = data;
    });

    // nPlayers
    const nPlayers = ref(0);
    socket.on('nPlayers', (data, error) => {
      if (error) console.log('Error on socket:', error);
      nPlayers.value = data;
    });

    // User location
    async function userLocation () {
      const ip = ref('');
      const flag = ref('');
      const country = ref('');
      const city = ref('');
      fetch('https://api.ipregistry.co/?key=0nxj6f90k9nup0j3')
      .then(function (response) {
        return response.json();
      })
      .then(function (payload) {
        console.log(payload);
        ip.value = payload.ip
        flag.value = payload.location.country.flag.emoji;
        country.value =  payload.location.country.code;
        city.value =  payload.location.city;
      });
      return { ip, flag, country, city };
    }
    const location = ref('');
    watchEffect(async () => {
      location.value = await userLocation()
    });

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

    const ticket = ref('')
    // Commit Number
    async function commitNumber (number) {

      const audio1 = new Audio(commit_sound);
      const audio2 = new Audio(commited_sound);
      const audio3 = new Audio(wrong_sound)

      if (! wallet.value) {
        return alert('Connect your wallet first!')
      } 

      for ( const num of tickets.value ) {
        if ( num.__num__ == number ) {
          audio3.play();
          if ( store.state.sound )
            audio3.play();
          return 'This number is already commited! Try another one' //alert('This number is already commited! Try another one.')
        }
      }

      if ( store.state.sound )
        audio1.play();
      
      const connection = new Connection(clusterApiUrl(cluster), preflightCommitment)
      const bal = await connection.getBalance(user_wallet.value)/1000000000;
      if (bal < commitSOL) 
        return alert('Not enough SOL in your wallet. Minimum funds needed: 1 SOL')

      const { sendTransaction } = useWallet();
      const masterPubKey = new PublicKey(process.env.VUE_APP_MASTER_WALLET);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: user_wallet.value,
          toPubkey: new PublicKey(masterPubKey),
          lamports: commitSOL*1000000000,
          message: number.value})
      )

      const signature = await sendTransaction(transaction, connection);
      console.log('Transaction confirmed! Signature:', signature);
      
      await connection.confirmTransaction(signature, number.value);// processed');

      emitPlayer();

      if ( store.state.sound )
        audio2.play();

      ticket.value = emitTicket(number);

      updateYourNumbers();
      updateYourProbability();
      updateYourROI();

    }

    // socket send ticket
    function emitTicket(number) {
      let flag = '🏴‍☠️'
      if ( location.value.flag )
        flag = location.value.flag;
      const ticket = `, ${number}, false, '${user_wallet.value}', '${flag}', ${potSOL.value+1}, ${Date.now()}`;
      socket.emit('newTicket', ticket);
      // console.log(socket.on('postTicket'))
    }

    // socket send player
    function emitPlayer() {
      let flag = '🏴‍☠️'
      if ( location.value.flag )
        flag = location.value.flag;
      const player = `${'hsa'}, ${flag}, ${location.value.country}, ${location.value.city}, ${'djkd'}, ${Date.now()}`;
      console.log(player);
      socket.emit('newPlayer', player);
    }

    // Play panel stats
    const yourNumbers = ref(0);
    function updateYourNumbers () {
      let nums = 0;
      try {
        for (const i of tickets.value) {
          if (i._owner == user_wallet.value) {
            nums++;
          }
        }
        yourNumbers.value = nums;
      } catch {
        return
      }
    }
    const yourProbability = ref(0);
    function updateYourProbability () {
      if ( yourNumbers.value > 0 )
        yourProbability.value = Math.floor((yourNumbers.value/potSOL.value)*1000)/10;
    }
    const yourROI = ref(0);
    function updateYourROI () {
      if ( yourProbability.value > 0 )
        yourROI.value = Math.floor((potSOL.value/yourNumbers.value-1)*1000)/10;
    }
    setInterval( () => {
      watchEffect( () => {
        updateYourNumbers();
        updateYourProbability();
        updateYourROI();
      });
    }, 1000);
    
    return {
      user_wallet,
      socket,
      users,
      balance,
      date,
      time,
      countdown,
      potSOL,
      potUSD,
      history,
      totalCountries,
      totalPlayers,
      maxPot,
      avgPot,
      chartData,
      chartLabels,
      tickets,
      nVerified,
      nPlayers,
      location,
      commitNumber,
      yourNumbers,
      yourProbability,
      yourROI
    }
  }
}
</script>

<style>

html {
  overflow-x: hidden;
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


