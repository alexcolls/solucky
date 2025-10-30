<script>
import { Connection, PublicKey, clusterApiUrl, SystemProgram, Transaction } from '@solana/web3.js';

import CountDown from '../components/CountDown.vue';

const preflightCommitment = 'processed'

const masterWallet = '6i1zfRMWVEErVPkH4JUtEBj5PFk2VZgshAENhZi1Dj1k'

export default ({
  components: {
    CountDown
  },
  setup() {
    const connection = new Connection(clusterApiUrl(cluster), preflightCommitment);

    
  },
})
</script>

<template>
  <div class="m-auto w-full max-w-md p-4 min-h-full max-h-full h-full">

    <div class="p-4 text-gray-600 bg-white rounded-xl text-center shadow-xl" :class="dark ? 'bg-gray-800' : 'bg-white'">          
      
      <div class="flex align-center justify-center">
        <div class="p-4 text-center">
          <p class="uppercase text-sm tracking-widest text-gray-400 font-semibold mt-4">Today's</p>
          <p class="uppercase text-3xl tracking-widest text-gray-400 font-semibold">Pot</p>

          <div class="flex ">
            <div class="flex justify-center mr-3 p-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
              <p class="font-bold text-2xl mt-3 mr-1"
              >◎ </p>
              <p class="font-bold text-4xl mt-2"
              > {{prize}}</p>
            </div>

            <div class=" text-4xl mt-2 mr-4 text-gray-400">/</div>

            <div class="flex justify-center pt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
              <p class="font-bold text-2xl mr-1"
              >$ </p>
              <p class="font-bold text-2xl"
              > {{ dollarPrize() }}</p>
            </div>
          </div>

          <div class="text-center uppercase text-xl tracking-widest font-semibold justify-center p-1"  :class="dark ? 'text-gray-200' : 'text-gray-800'">
            <CountDown/>
          </div>

        </div>
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
</template>
