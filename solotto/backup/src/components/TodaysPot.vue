<script>
import CountDown from './CountDown.vue';
import { ref, watchEffect } from 'vue';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import coinTicker from 'coin-ticker';


export default ({
  setup() {

    const preflightCommitment = 'processed';
    const connection = new Connection(clusterApiUrl('devnet'), preflightCommitment);
    const masterPubKey = new PublicKey('6i1zfRMWVEErVPkH4JUtEBj5PFk2VZgshAENhZi1Dj1k');
    const lamports = 1000000000;
    const nf = Intl.NumberFormat();

    const potSOL = ref(0);
    const potUSD = ref(0);
    
    watchEffect(async () => {
      potSOL.value = await connection.getBalance(masterPubKey)/lamports;
      potSOL.value = Math.floor(potSOL.value*100)/100;

      console.log('process',process.env.VUE_APP_EXCHANGE)
      coinTicker(process.env.VUE_APP_EXCHANGE, 'SOL_USD').then( (price) => { 
        potUSD.value = nf.format(potSOL.value*price.last).split('.')[0];
      });
    });

    const dark = false;

    return {
      potSOL,
      potUSD,
      dark
    } 
  },
  components: {
    CountDown
  },
})
</script>

<template>
        
  <div class="align-center justify-center p-4 text-center">
    <div class="uppercase tracking-widest font-semibold text-gray-400">
      <div class=" text-sm mt-4">Today's</div>
      <div class="text-3xl">Pot</div>
    </div>
    <div class="flex">
      <div class="flex justify-center mr-3 p-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
        <div class="font-bold text-2xl mt-3 mr-1">◎ </div>
        <div class="font-bold text-4xl mt-2">{{ potSOL }}</div>
      </div>
      <div class=" text-4xl mt-2 mr-4 text-gray-400">/</div>
      <div class="flex justify-center pt-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
        <div class="font-bold text-2xl mr-1">$ </div>
        <div class="font-bold text-2xl">{{ potUSD }}</div>
      </div>
    </div>
    <CountDown class="text-center uppercase text-xl tracking-widest font-semibold justify-center p-1"  :class="dark ? 'text-gray-200' : 'text-gray-800'"/>
  </div>

</template>
