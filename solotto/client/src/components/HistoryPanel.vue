<template>
  <!-- Right Panel -->

  <div class="m-auto w-full max-w-md p-4">
    <div class="p-4 text-gray-600 rounded-xl text-center shadow-xl" :class="this.$store.state.dark ? 'bg-gray-800 shadow-gray-700' : 'bg-white'">

      <div class="uppercase text-sm tracking-widest text-gray-400 font-semibold mt-8">SOLotto</div>
      <div class="uppercase text-3xl tracking-widest text-gray-400 font-semibold">History</div>
      
      <div class="text-center uppercase text-sm tracking-widest font-semibold justify-center">
        <div class="flex justify-center mr-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600" >
          <div class="uppercase text-xl font-semibold m-4">&nbsp;&nbsp; Total</div>
          <div class="font-bold text-4xl mt-2" :class="this.$store.state.dark ? 'text-gray-200' : 'text-gray-800'"> 
            {{ 12 }}
          </div>
          <div class="uppercase text-xl font-semibold m-4">Games</div>
        </div>
      </div>

      <div class="grid grid-cols-4 grid-flow-row gap-4 align-center justify-center text-center">

        <div class="p-2 text-center">
          <p class="uppercase text-[10px] tracking-widest text-gray-400 font-semibold">Total</p>
          <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Countries</p>
          <div class="flex justify-center" >
            <p class="font-bold text-lg mt-2"
              :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
            >{{ 12 }}</p>
          </div>
        </div>

        <div class="p-2 text-center">
          <p class="uppercase text-[10px] tracking-widest text-gray-400 font-semibold">Total</p>
          <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">Players</p>
          <div class="flex justify-center" >
            <p class="font-bold text-lg mt-2"
              :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
            >{{ 34 }}</p>
          </div>
        </div>

        <div class="p-2 text-center">
          <p class="uppercase text-[10px] tracking-widest text-gray-400 font-semibold">Average</p>
          <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">SOLPOT</p>
          <div class="flex justify-center" >
            <p class="font-bold text-lg mt-2" :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'" > 
              <span class="text-sm text-gray-400">
                ◎ </span>
              {{ avgPot }}</p>
          </div>
        </div>

        <div class="p-2 text-center mr-2">
          <p class="uppercase text-[10px] tracking-widest text-gray-400 font-semibold">Greatest</p>
          <p class="uppercase text-xs tracking-widest text-gray-400 font-semibold">SOLPOT</p>
          <div class="flex justify-center" >
            <p class="font-bold text-lg mt-2"
              :class="this.$store.state.dark ? 'text-gray-300' : 'text-gray-600'"
            > <span class="text-sm text-gray-400">
              ◎ </span>
              {{ maxPot }}</p>
          </div>
        </div>

      </div>

      <div >
        <!-- <Bar class="m-h-24 h-24" /> -->
        <div class="uppercase text-xs mt-3 tracking-widest text-gray-400 font-semibold">
          Cumulative SOLPOT
          <LineChart class="m-h-52 h-52" :chartData="chartData" :chartLabels="chartLabels" />
        </div>

        <!-- <div class="uppercase text-xs mt-2 tracking-widest text-gray-400 font-semibold">
          POT country distribution
          <PolarChart class="m-h-24 h-24"/>
        </div> -->
      </div>

      <div class="uppercase text-xs mb-4 mt-4 tracking-widest text-gray-400 font-semibold">
        Historical winners
      </div>
      <lo class=" max-h-64 min-h-64 h-64 flex flex-col flex-grow overflow-y-auto bg-gray-100 p-2 rounded-xl shadow-inner" :class="this.$store.state.dark ? 'bg-gray-700' : 'bg-text-gray-200'">
        <div v-for="x of history" :key="x.__date__" >
          <div class="hover:font-semibold grid grid-cols-12 justify-center align-center align-middle"  :class="this.$store.state.dark ? 'text-gray-200' : 'bg-text-gray-800'">
            <div class="text-xs text.left   col-span-3"  :class="markWallet(wallet, x._owner) ? 'text-purple-400 font-bold' : 'text-grey-600'">
              {{ x.__date__ }}
            </div>
            <div class="text-xs text-right col-span-2 font-semibold flex text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              <div class="text-xs mb-3 pl-1 pr-1"> ◎ </div>{{ x._pot }}
            </div>
            <div class="text-xs text-left col-span-3"  :class="markWallet(wallet, x._owner) ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold' : 'text-grey-600'" >
              {{ shortWallet(x._owner, 4) }}
            </div>
            <div class="text-xs text-center col-span-1" >
              {{ x._flag }}
            </div>
            <div class="text-xs text-center col-span-3"  :class="markWallet(wallet, x._owner) ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold' : 'text-grey-600'" > 
              {{ nf.format(x._num).replaceAll(',', ' ') }}
            </div>
          </div>
        </div>
      </lo>
    </div>
  </div>

</template>

<script>
import LineChart from './charts/lineChart.ts';
import { shortWallet, markWallet } from './utils';

export default {
  props: [
    'history',
    'totalCountries',
    'totalPlayers',
    'maxPot',
    'avgPot',
    'chartData',
    'chartLabels',
    'wallet'
  ],
  methods: {
    shortWallet,
    markWallet
  },
  components: {
    LineChart,
  },
  setup () {
    const nf = Intl.NumberFormat();    
    return { 
      nf
    }
  }
}
</script>
