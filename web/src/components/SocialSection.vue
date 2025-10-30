<template>
  <div class="z-20 h-min-screen py-4 opcaity-80 bg-transparent"
    :class="this.$store.state.dark ? 'bg-black/20' : 'bg-transparent'">
    <div class="z-20 text-center align-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500" >

      <h1 class="text-7xl font-extrabold shadow-white md:mt-24 mt-12 md:text-9xl lg:text-[120px]">
        JOIN US
      </h1>

      <h1 class="text-3xl font-bold shadow-white mt-12 text-white md:text-4xl lg:text-[60px] animate-pulse"
      :class="this.$store.state.dark ? 'text-gray-100' : 'text-gray-900'">
        SOLANA GAMBLING <br><br>🎲 COMMUNITY 🔞
      </h1>
    <div  :class="this.$store.state.dark ? 'hidden' : ''"  class="justify-center align-center items-center px-4 md:px-[550px] py-24">
      <a class="twitter-timeline" href="https://twitter.com/solucky__games?ref_src=twsrc%5Etfw">Tweets by solucky__games</a>
    </div>
    <div  :class="this.$store.state.dark ? '' : 'hidden'"  class="justify-center align-center items-center px-4 md:px-[550px] py-24">
      <a class="twitter-timeline" data-theme="dark" href="https://twitter.com/solucky__games?ref_src=twsrc%5Etfw">Tweets by solucky__games</a>
     </div>
  </div>



  </div>

</template>


<script>


export default {
  name: 'SocialSection',
  components: {


  },
  data() {



  },
  


 
}


</script>

<style scoped>


</style>
