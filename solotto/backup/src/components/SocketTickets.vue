<template>
  
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

</template>

<script>
import { watchEffect } from 'vue'
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const webSocketClient = new W3CWebSocket('ws://127.0.0.1:8000');

export default {
  setup () {


    watchEffect(async (tickets) => {
      webSocketClient.onopen = () => {
        console.log('Websocket Client Connected!');
        const dataFromServer = JSON.parser(tickets.data);
        console.log(dataFromServer);
      };
     
    })


    return { 

    }
  },
  data() {
    return {
      dark: false
    }
  }
}

</script>
