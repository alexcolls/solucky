<script>
import CountDown from './components/CountDown.vue';

import { ref, watchEffect } from 'vue'
import { Connection, PublicKey, clusterApiUrl, SystemProgram, Transaction } from '@solana/web3.js'
import { WalletMultiButton, useAnchorWallet, useWallet } from 'solana-wallets-vue'

import { Buffer } from 'buffer'
import coinTicker from 'coin-ticker'
//import {sendTicket} from './controller/sendTicket'
import {deleteTicket} from './controller/deleteTicket'

import PopCommit from './components/modals/PopCommit.vue'

import TodaysPot from './components/TodaysPot.vue';





let tomorrow = new Date();
tomorrow.setDate(tomorrow.getUTCDate() + 1);
const year = tomorrow.getUTCFullYear()
const month = tomorrow.getUTCMonth()
const day = tomorrow.getUTCDate()
const expires = new Date(Date.UTC(year, month, day));
const now = new Date().getTime()
const time = (expires.getTime()-now);


// @ts-ignore
window.Buffer = Buffer;

//const programID = new PublicKey(idl.metadata.address)
const preflightCommitment = 'processed'

const masterWallet = '6i1zfRMWVEErVPkH4JUtEBj5PFk2VZgshAENhZi1Dj1k'
const cluster = 'devnet'
const commitSOL = 1;
const maxNumber = 1000000000;
const db_url = 'http://localhost:5000/'

export default {
  components: {
    WalletMultiButton,
    CountDown,
    PopCommit,
    TodaysPot
  },
  setup () {
    
    const wallet = useAnchorWallet()
    
    const connection = new Connection(clusterApiUrl(cluster), preflightCommitment)
    //const provider = computed(() => new AnchorProvider(connection, wallet.value, { preflightCommitment }))
    //const program = computed(() => new Program(idl, programID, provider.value))

    const prize = ref(0);
    const SOL_USD = ref();
    const balance = ref();

    watchEffect(async () => {
      const pri = await connection.getBalance(new PublicKey(masterWallet))/1000000000;
      prize.value = Math.floor(pri*100)/100;
      coinTicker('bitstamp', 'SOL_USD').then((tick) => { SOL_USD.value = tick.last })
    })

    watchEffect(async () => {
      const bal = await connection.getBalance(wallet.value.publicKey)/1000000000;
      balance.value = Math.floor(bal*100)/100;
    })

    const location = ref()
    const flag = ref('');
    fetch('https://api.ipregistry.co/?key=0nxj6f90k9nup0j3')
    .then(function (response) {
      return response.json();
    })
    .then(function (payload) {
      console.log(payload);
      flag.value = payload.location.country.flag.emoji
      location.value =  payload.location.city;
    });

    const { sendTransaction } = useWallet();

    async function commitNumber () {

      if (! wallet.value) {
        return alert('Connect your wallet first!')
      } 

      if ( tickets.value[number.value] && chechNumber(number.value) )
        return alert('This number is already commited! Try another one.')

      const connection = new Connection(clusterApiUrl(cluster), preflightCommitment)

      const bal = await connection.getBalance(wallet.value.publicKey)/1000000000;

      if (bal < commitSOL) 
        return alert('Not enough SOL in your wallet. Minimum funds needed: 1 SOL')

      const transaction = new Transaction().add(
          SystemProgram.transfer({
              fromPubkey: wallet.value.publicKey,
              toPubkey: new PublicKey(masterWallet),
              lamports: commitSOL*1000000000,
              message: number.value})
      )

      const signature = await sendTransaction(transaction, connection);

      console.log(signature);
      

      await connection.confirmTransaction(signature, number.value);// processed');

      const pri = await connection.getBalance(new PublicKey(masterWallet))/1000000000;
      prize.value = Math.floor(pri);

      await postNumber();

      commitPop.value = true;

      tickets.value = await getTickets();

      updateYourNumbers();
      updateYourProbability();
      updateYourROI();
    }

    // async function verifyNumber() {
    //   sendTicket(number.value, flag.value)
    // }

    async function postNumber () {
      const now = new Date();
      let hour = now.getUTCHours();
      let minutes = now.getMinutes();
      const post = {  "id": number.value, 
                      "wallet": wallet.value.publicKey.toBase58(), 
                      "country": flag.value,
                      "hour": `${hour} : ${minutes}`,
                      "verified": false
                    }
      const res = await fetch(db_url+'tickets/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      })
      console.log(res.status)
      // if (res.status==304)
      //   return alert(`${number.value} commited succesfully!`)
      // else
      //   return alert('Number commitment failed! Please try again.')
    }

    // async function verifyNumber () {
    //   const post = {  "id": number.value, 
    //                   "wallet": wallet.value.publicKey.toBase58(), 
    //                   "country": flag.value,
    //                   "hour": `${hour} : ${minutes}`,
    //                   "verified": true
    //                 }
    //   const res = await fetch(db_url+'tickets/', {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(post)
    //   });
    //   console.log(res);
      // if (res.status==201)
      //   return cons(`${number.value} verified succesfully!`)
      // else
      //   return alert('Number verfication failed! Please try again.')
    //}

    async function chechNumber (id) {
      const res = await fetch(db_url+'tickets/'+id)
      if (res.status==200) 
        return false
      return true
    }

    const number = ref('0')
    const nf = Intl.NumberFormat();

    function clickNum (n) {
      if (number.value[0] === '0')
        return number.value = String(n)
      
      if ( number.value+n <= maxNumber )
        number.value += n
      else
        return alert(`Number must be between 0 and ${nf.format(maxNumber)}, including both.`)     
    }

    function deleteNum () {
      if (number.value.length > 1)
        number.value = number.value.slice(0, -1);
      else resetNum();
    }

    function resetNum () {
      number.value = '0';
    }

    async function getWinners () {
      const res = await fetch(db_url+'winners')
      const data = await res.json()
      return data;
    }
    const winners = ref({});
    watchEffect(async () => {
      winners.value = await getWinners()
    });

    async function getTickets () {
      const res = await fetch(db_url+'tickets')
      const data = await res.json()
      return data
    }
    const tickets = ref([]);
    const nNumbers = ref(0);
    const nPlayers = ref(0);
    watchEffect(async () => {
      tickets.value = await getTickets()
      console.log(tickets.value)
      const uniqueWallets = [];
      for (const ticket of tickets) {
        if ( !uniqueWallets.includes(ticket.wallet) )
          uniqueWallets.push(ticket.wallet);
      }
      nNumbers.value = Object.keys(tickets.value).length;
      nPlayers.value = uniqueWallets.length;
    });

    function shortWallet (addrs, n) {
      return addrs.slice(0, n)+'...'+addrs.slice(-n)
    }

    // const players = ref(0);
    // function countPlayers () {
    //   for ( const [key, value] of Object.entries(tickets.value)) {
    //     if (value === address)
    //       arr.push(key);
    //   }
    // }

    const commitPop = ref(false);
    
    const yourNumbers = ref(0);
    function updateYourNumbers () {
      const address = wallet.value.publicKey.toBase58();
      const arr = [];
      for (const [key, value] of Object.entries(tickets.value)) {
        if (value === address)
          arr.push(key);
      }
      yourNumbers.value = arr.length;
    }

    const yourProbability = ref(0);
    function updateYourProbability () {
      yourProbability.value = Math.floor((yourNumbers.value/tickets.value.length)*10000)/100;
    }

    const yourROI = ref(0);
    function updateYourROI () {
      yourROI.value = Math.floor((prize.value/yourNumbers.value-1)*10000)/100;
    }

    watchEffect(async () => {
      updateYourNumbers();
      updateYourProbability();
      updateYourROI();
    });

    function markWallet(address){
      if( wallet.value.publicKey.toBase58() == address ) 
        return 'font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600';
    }

    function dollarPrize () {
      const ret = nf.format(prize.value*SOL_USD.value).split('.')[0];
      if ( !ret )
        dollarPrize();
      else return ret;
    }
    
    return { 
      balance,
      prize,
      SOL_USD,
      commitNumber,
      masterWallet,
      time, 
      clickNum,
      deleteNum,
      resetNum,
      number,
      nf,
      tickets,
      shortWallet,
      yourNumbers,
      yourProbability,
      markWallet,
      cluster,
      dollarPrize,
      location,
      flag,
      winners,
      deleteTicket,
      getTickets,
      yourROI,
      nNumbers,
      nPlayers,
      commitPop,
    }
  },
  data() {
    return {
      dark: false,
      commitHover: false,
      commiting: false,
    }
  }
}
</script>

<template>
  <div class="h-screen w-screen m-0 " :class="dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">

    <!-- Navar -->
    <div class="absolute top-0 right-0 pt-8 pr-8 flex space-x-8 justify-center ">
      <!-- Solana Wallets Vue. -->
      <div > <wallet-multi-button class="wallet-button" :dark="dark"></wallet-multi-button></div>
     
      <p :class="dark ? 'text-white' : 'text-gray-600'" class="text-sm font-semibold mt-3" v-if="balance">{{`${balance} SOL`}}</p>
      <!-- <button @click="deleteTicket" class="font-bold rounded-full p-2 align-center justify-center relative" 
      :class="dark ? 'bg-black/10 hover:bg-black/20 text-gray-600' : 'bg-black/10 hover:bg-black/20 text-gray-600'">
        <img src="./assets/i.png" alt="Information" width="30" height="30" style="z-index:100; padding:-2px" />
      </button> -->
      <!-- <button class="font-bold rounded-full p-2 align-center justify-center relative" 
      :class="dark ? 'bg-black/10 hover:bg-black/20 text-gray-600' : 'bg-black/10 hover:bg-black/20 text-gray-600'">
        <a href="https://twitter.com/SOLuckyLotto?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false" ></a>
      </button> -->

      <!-- Dark Button. -->
      <button class="rounded-full p-3" @click="dark = !dark" :class="dark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-black/10 hover:bg-black/20 text-gray-600'">
        <svg v-if="dark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      </button>
    </div>

    <div class="flex flex-wrap top-24 left-0 right-0 absolute" :class="dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">

      <!-- Left Panel. -->

      <div class="m-auto w-full max-w-md p-4 min-h-full max-h-full h-full">

        <div class="p-4 text-gray-600 bg-white rounded-xl text-center shadow-xl" :class="dark ? 'bg-gray-800' : 'bg-white'">          
          
          <div class="flex align-center justify-center">
            <TodaysPot/>
          </div>
          <div class="flex align-center justify-center">
            <div class="p-2 mr-1 text-center">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Total</p>
              <p class="uppercase text-xl tracking-widest text-gray-400 font-semibold">Numbers</p>
              <div class="flex justify-center" >
                <p class="font-bold text-2xl mt-2"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                > {{nNumbers}}</p>
              </div>
            </div>

            <div class="p-2 ml-1 text-center">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Total</p>
              <p class="uppercase text-xl tracking-widest text-gray-400 font-semibold">Players</p>
              <div class="flex justify-center" >
                <p class="font-bold text-2xl mt-2"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${nPlayers}`}}</p>
              </div>
            </div>
          </div>

          <!-- commited numbers -->
          <div class="uppercase text-xs mt-3 mb-5 tracking-widest text-gray-400 font-semibold">Current commited numbers</div>
            
            <lo class="max-h-96 min-h-96 h-96 flex flex-col-reverse align-start overflow-y-auto bg-gray-100 p-2 rounded-xl shadow-inner" :class="dark ? 'bg-gray-700' : 'bg-gray-100'">
              <div v-for="x of tickets" :key="x.id" class="py-1" :class="dark ? 'text-gray-200' : 'bg-text-gray-800'">
                <div class="hover:font-semib old grid grid-cols-10 gap-3 flex flex-col">
                  <div class="text-xs col-span-2"  :class="markWallet(x.wallet) ? 'text-purple-400 font-bold' : 'text-grey-600'">{{ x.hour }}</div>
                  
                  <a class="col-span-3" :href="'https://explorer.solana.com/address/'+x.wallet+'?cluster='+cluster" target="_blank" :class="markWallet(x.wallet)">
                    <div class="text-xs text-left">{{ shortWallet(x.wallet, 4) }}</div>
                  </a>
                  <a class="col-span-1" :href="'https://google.com/search?q='+x.country" target="_blank">
                    <div class="text-xs">{{ x.country }}</div>
                  </a>
                  <a class="text-right col-span-3" :href="'https://explorer.solana.com/address/'+x.wallet+'?cluster='+cluster" target="_blank" :class="markWallet(x.wallet)">
                    <div class="text-[13px] text-center" :class="markWallet(x.wallet)"> {{ nf.format(x.id).replaceAll(',', ' ') }}</div>
                  </a>
                  <a class="text-right col-span-1" :href="'https://explorer.solana.com/address/'+x.wallet+'?cluster='+cluster" target="_blank" :class="markWallet(x.wallet)">
                    <div v-if="x.verified" class="text-[10px] text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" :class="markWallet(x.wallet)"> {{ '✔️' }}</div>
                  </a>
                </div>
              </div>
            </lo>

          </div>

          <div class="flex">
            <div class="text-xl"></div>
          </div>
      </div>

      <!-- Centered. -->

      <div class="m-auto w-full max-w-md p-2 min-h-full max-h-full h-full">

        <div class="shadow-xl rounded-xl pt-2 pb-2 " :class="dark ? 'bg-gray-800' : 'bg-white'">

          <div class="px-4 text-center mt-8">
            <p class="uppercase text-sm tracking-widest text-gray-400 font-semibold">Commit a</p>
            <p class="uppercase text-3xl tracking-widest text-gray-400 font-semibold">Number</p>

            <div class="text-center uppercase text-sm tracking-widest font-semibold justify-center">
                <div class="flex justify-center mr-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
                  <div class="uppercase text-xl text-gray-400 font-semibold m-4">Win</div>
                  <div class="font-bold text-4xl mt-2" :class="dark ? 'text-gray-200' : 'text-gray-800'"> {{prize}}<span  class="font-bold text-xl mt-4">SOL</span></div>
                  <div class="uppercase text-xl text-gray-400 font-semibold m-4">in</div>
                </div>
              <CountDown class="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" :time=time :transform="transformSlotProps" v-slot="{ hours, minutes, seconds }">
                {{ hours }} h {{ minutes }} m {{ seconds }} s
              </CountDown>
            </div>

            <div class="text-center uppercase tracking-widest font-semibold justify-center border-1 rounded-xl pt-4">
              <div class="flex align-center justify-center mb-4">

                <div class="p-4 text-center">
                  <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Commited</p>
                  <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Numbers</p>
                  <div class="flex justify-center" >
                    <p class="lowercase font-bold text-xl mt-2"
                      :class="dark ? 'text-gray-300' : 'text-gray-600'"
                    > {{ `x${yourNumbers}`}}</p>
                  </div>
                </div>

                <div class="p-4 text-center">
                  <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Your</p>
                  <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Probability</p>
                  <div class="flex justify-center" >
                    <p class="font-bold text-xl mt-2"
                      :class="dark ? 'text-gray-300' : 'text-gray-600'"
                    > {{ `${yourProbability}%`}}</p>
                  </div>
                </div>

                <div class="p-4 text-center">
                  <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Your</p>
                  <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">ROI</p>
                  <div class="flex justify-center" >
                    <p class="font-bold text-xl mt-2"
                      :class="dark ? 'text-gray-300' : 'text-gray-600'"
                    > {{ `${nf.format(yourROI)}%`}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="uppercase text-s mb-5 tracking-widest text-gray-400 font-semibold text-center">Pick your number</div>

          <div class="font-bold text-4xl text-center p-7 rounded-xl m-4 cursor-pointer"
          :class="dark ? 'bg-gray-600 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-200'"
          @click="commitNumber"
          @mouseover="commitHover=true"
          @mouseleave="commitHover=false">
            <div class="text-2xl py-2 mr-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" v-if="commitHover">
              <a class="text-xl mr-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Commit 🚀 </a>
              {{nf.format(number)}}
            </div>
            <div v-else>{{ nf.format(number).replaceAll(',', ' ') }}</div>
          </div>
          
          <div class="grid grid-cols-3 gap-1 text-s font-semibold text-center py-4 px-4 rounded-xl">
            <button @click="clickNum(1)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-tl-xl align-middle relative">1</button>
            <button @click="clickNum(2)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">2</button>
            <button @click="clickNum(3)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-tr-xl align-middle relative">3</button>
            <button @click="clickNum(4)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">4</button>
            <button @click="clickNum(5)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">5</button>
            <button @click="clickNum(6)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">6</button>
            <button @click="clickNum(7)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-bl-xl align-middle relative">7</button>
            <button @click="clickNum(8)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 align-middle relative">8</button>
            <button @click="clickNum(9)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-br-xl align-middle relative">9</button>
            <button @click="resetNum()"  :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-3 px-2 rounded-3xl m-3 align-middle relative">↻</button>
            <button @click="clickNum(0)" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-6 px-2 rounded-b-xl align-middle relative">0</button>
            <button @click="deleteNum()" :class="dark ? 'bg-gray-600 hover:bg-gray-400' : 'bg-gray-50 hover:bg-gray-200'" class="py-3 px-2 rounded-3xl m-3 align-middle relative">⇐</button>          <div/>
          </div>

        </div>

        
        <!-- <div class="text-sm mt-8">
          <p class="text-xs font-semibold text-gray-400">Your wallet:</p>
          <p>{{ $wallet.publicKey.value?.toBase58() ?? 'Not connected' }}</p>
          <p class="text-xs font-semibold text-gray-400 mt-4">Master wallet:</p>
          <p>{{ masterWallet ?º? 'Not created' }}</p>
        </div> -->
      </div>

      <PopCommit v-if="commiting" :class="dark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-black/10 hover:bg-black/20 text-gray-600'">
        <div class="font-semibold flex text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Commiting... 🚀
        </div>
        <div class="rounded-full p-4" @click="dark = !dark" :class="dark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-black/10 hover:bg-black/20 text-gray-600'">
          {{ number }}
        </div>
      </PopCommit>

      <!-- Right Panel -->

      <div class="m-auto w-full max-w-md p-4">
        <div class="p-4 text-gray-600 rounded-xl text-center shadow-xl" :class="dark ? 'bg-gray-800' : 'bg-white'">

          <div class="uppercase text-sm tracking-widest text-gray-400 font-semibold mt-8">SOLucky</div>
          <div class="uppercase text-3xl tracking-widest text-gray-400 font-semibold">History</div>
          
          <div class="text-center uppercase text-sm tracking-widest font-semibold justify-center">
            <div class="flex justify-center mr-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
              <div class="uppercase text-xl font-semibold m-4">&nbsp;&nbsp; Total</div>
              <div class="font-bold text-4xl mt-2" :class="dark ? 'text-gray-200' : 'text-gray-800'"> {{'11'}}</div>
              <div class="uppercase text-xl font-semibold m-4">Games</div>
            </div>
          </div>

          <div class="flex align-center justify-center mt-2">

            <div class="p-4 text-center">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Total</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Countries</p>
              <div class="flex justify-center" >
                <p class="font-bold text-xl mt-2"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                >{{ ` ${12}` }}</p>
              </div>
            </div>

            <div class="p-4 text-center mr-2">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Greatest</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Prize</p>
              <div class="flex justify-center" >
                <p class="font-bold text-xl mt-2 mr-4"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                > <span class="text-sm text-gray-400">◎ </span>{{ ` ${323}` }}</p>
              </div>
            </div>

            <div class="p-4 text-center">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Average</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Number</p>
              <div class="flex justify-center" >
                <p class="font-bold text-md pt-2 mt-1"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ nf.format(9044309).replaceAll(',', ' ') }}</p>
              </div>
            </div>
          </div>

          <!-- <div class="flex align-center justify-center">
            <div class="p-2 text-center">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Highest</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Number</p>
              <div class="flex justify-center" >
                <p class="font-bold text-md mt-2"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${nf.format('78439834').replaceAll(',', ' ')}`}}</p>
              </div>
            </div>
            <div class="p-2 text-center mr-4 ml-4">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Average</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Number</p>
              <div class="flex justify-center" >
                <p class="font-bold text-md mt-2"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${nf.format('332983').replaceAll(',', ' ')}`}}</p>
              </div>
            </div>
            <div class="p-2 text-center">
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Lowest</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Number</p>
              <div class="flex justify-center" >
                <p class="font-bold text-md mt-2"
                  :class="dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ `${nf.format('46373').replaceAll(',', ' ')}`}}</p>
              </div>
            </div>
          </div> -->

          <div class="uppercase text-xs mb-4 mt-4 tracking-widest text-gray-400 font-semibold">Historical winners</div>

          <lo class=" max-h-96 min-h-96 h-96 flex flex-col flex-grow overflow-y-auto bg-gray-100 p-2 rounded-xl shadow-inner" :class="dark ? 'bg-gray-700' : 'bg-text-gray-200'">
            <div v-for="x of winners" :key="x.id" >
              <div class="hover:font-semibold grid grid-cols-12 flex justify-center align-center align-middle"  :class="dark ? 'text-gray-200' : 'bg-text-gray-800'">
                <div class="text-xs text.left   col-span-3">{{ x.date }}</div>
                <div class="text-xs text-right col-span-2 font-semibold flex text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"><div class="text-xs mb-3 pl-1 pr-1"> ◎ </div>{{ x.prize }}</div>
                <div class="text-xs text-left col-span-3">{{ shortWallet(x.wallet, 4) }}</div>
                <div class="text-xs text-center col-span-1">{{ x.country }}</div>
                <div class="text-xs text-center col-span-3"> {{ nf.format(x.id).replaceAll(',', ' ') }}</div>
              </div>
            </div>
          </lo>
        </div>
      </div>

    </div>

    <PopCommit v-if="commitPop" @click="commitPop = false">
      <div class="font-semibold flex text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Commit 🚀 completed!
      </div>
      <div class="rounded-full p-3" @click="dark = !dark" :class="dark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-black/10 hover:bg-black/20 text-gray-600'">
        {{ number }}
      </div>
      <button class="rounded-full p-3" :class="dark ? 'bg-white/10 hover:bg-white/20 text-gray-200' : 'bg-black/10 hover:bg-black/20 text-gray-600'">
      <div class="font-semibold flex text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Verify Number</div>
      </button>
    </PopCommit>


  </div>
</template>

<style scoped>

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background-color: rgba(187, 187, 187, 0);
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
