<template>
      <!-- Pot Panel. -->

    <div class="m-auto w-full max-w-md p-4">

      <div class="p-4 text-gray-600 rounded-xl text-center shadow-xl" :class="this.$store.state.dark ? 'bg-gray-800 shadow-gray-700' : 'bg-white'">          
        
        <div class="flex align-center justify-center">
          <div class="p-4 text-center">
            <p class="uppercase text-sm tracking-widest text-gray-400 font-semibold mt-4">Today's</p>
            <p class="uppercase text-3xl tracking-widest text-gray-400 font-semibold">SOLPOT</p>

            <div class="flex">
              <div class="flex justify-center mr-3 p-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
                <p class="font-bold text-2xl mt-3 mr-1"
                >◎ </p>
                <p class="font-bold text-4xl mt-2"
                >{{ potSOL }}</p>
              </div>
              <div class="text-4xl mt-2 mr-4 text-gray-400">/</div>
              <div class="flex justify-center pt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
                <p class="font-bold text-2xl mr-1"
                >$ </p>
                <p class="font-bold text-2xl"
                >{{ potUSD }}</p>
              </div>
            </div>

            <!-- Countdown & Date -->
            <div class="mt-3">
              <div class="text-gray-400 text-2xl tracking-widest font-semibold text-center" >
                {{ date }}
              </div>
              <div class="text-center text-2xl tracking-widest font-semibold justify-center uppercase" :class="this.$store.state.dark ? 'text-gray-200' : 'text-gray-800'" >
                {{ countdown }}
              </div>
            </div>
  
          </div>
        </div>

        <div class="text-center uppercase tracking-widest font-semibold justify-center border-1 rounded-xl ">

          <div class="grid grid-cols-3 grid-flow-row align-center justify-center mb-3 px-4 text-center">

            <div class="p-4 text-center">
              <p class="uppercase text-[10px] tracking-widest text-gray-400 font-semibold">Total</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Numbers</p>
              <div class="flex justify-center" >
                <p class="lowercase font-bold text-xl mt-2"
                  :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ potSOL }}</p>
              </div>
            </div>

            <div class="p-4 text-center">
              <p class="uppercase text-[10px] tracking-widest text-gray-400 font-semibold">Verified</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Numbers</p>
              <div class="flex justify-center" >
                <p class="font-bold text-xl mt-2"
                  :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ nVerified }}</p>
              </div>
            </div>

            <div class="p-4 text-center">
              <p class="uppercase text-[10px] tracking-widest text-gray-400 font-semibold">Total</p>
              <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Players</p>
              <div class="flex justify-center" >
                <p class="font-bold text-xl mt-2"
                  :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
                > {{ nPlayers }}</p>
              </div>
            </div>
          </div>
        </div>
      
        <!-- <div class="flex align-center justify-center mt-4">
          <div class="p-2 mr-1 text-center">
            <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Total</p>
            <p class="uppercase text-xl tracking-widest text-gray-400 font-semibold">Numbers</p>
            <div class="flex justify-center" >
              <p class="font-bold text-2xl mt-2"
                :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
              > {{potSOL}}</p>
            </div>
          </div>

          <div class="p-2 ml-1 text-center">
            <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Total</p>
            <p class="uppercase text-xl tracking-widest text-gray-400 font-semibold">Players</p>
            <div class="flex justify-center" >
              <p class="font-bold text-2xl mt-2"
                :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
              > {{nPlayers}}</p>
            </div>
          </div>
        </div> -->

        <!-- commited numbers -->
        <div class="uppercase text-xs mb-5 tracking-widest text-gray-400 font-semibold">
          Current commited numbers
        </div>
        
        <lo class="max-h-96 min-h-96 h-96 flex flex-col-reverse align-start overflow-y-auto bg-gray-100 p-2 rounded-xl shadow-inner" :class="this.$store.state.dark ? 'bg-gray-700' : 'bg-gray-100'">
          <div v-for="x of tickets" :key="x._hour" class="py-1" :class="this.$store.state.dark ? 'text-gray-200' : 'bg-text-gray-800'">
            <div class="grid grid-cols-10 gap-3" :class="markWallet(wallet, x._owner) ? 'text-purple-400 font-bold' : 'text-grey-600'">
              <div class="hover:text-[13px] hover:font-semibold text-xs col-span-2" >{{ x._hour }}</div>
              <a class="col-span-3" :href="'https://explorer.solana.com/address/'+x._owner+'?cluster='+cluster" target="_blank" :class="markWallet(wallet, x._owner)">
                <div class="hover:text-[13px] hover:font-semibold text-xs text-left">{{ shortWallet(x._owner, 6) }}</div>
              </a>
              <a class="col-span-1" :href="'https://google.com/search?q='+x._flag" target="_blank">
                <div class="hover:text-[14px] text-xs">{{ x._flag }}</div>
              </a>
              <a class="text-right col-span-3" :href="'https://explorer.solana.com/address/'+x._owner+'?cluster='+cluster" target="_blank" :class="markWallet(wallet, x._owner)">
                <div class="hover:text-[14px] hover:font-semibold text-[13px] text-center" :class="markWallet(wallet, x._owner)"> 
                  {{ nf.format(x.__num__).replaceAll(',', ' ') }}
                </div>
              </a>
              <a class="text-right col-span-1" :href="'https://explorer.solana.com/address/'+x._owner+'?cluster='+cluster" target="_blank" :class="markWallet(wallet, x._owner)">
                <div v-if="x._verified" class="text-[10px] text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" :class="markWallet(wallet, x._owner)"> {{ '✔️' }}</div>
              </a>
            </div>
          </div>
        </lo>

      </div>
    </div>
</template>

<script>
import { shortWallet, markWallet } from './utils';

export default ({
  props: [
    'date',
    'countdown',
    'potSOL',
    'potUSD',
    'newTicket',
    'tickets',
    'nVerified',
    'nPlayers',
    'wallet'
  ],
  components: {

  },
  methods: {
    shortWallet,
    markWallet
  },
  setup() {
    const nf = Intl.NumberFormat();
    return {
      nf
    }
  }
})
</script>
