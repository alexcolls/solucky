<template>
  <div class="z-50 bg-white h-min-screen opcaity-100 "
    :class="this.$store.state.dark ? 'bg-black' : 'bg-white'" >
    <div class="grid-cols-2 flex flex-wrap justify-center align-center items-center">
      <div class="z-20 text-center align-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500" >


        <h1 class="text-2xl font-bold shadow-white text-white md:text-2xl lg:text-[40px] animate-pulse mt-48"
        :class="this.$store.state.dark ? 'text-gray-100' : 'text-gray-900'">
          BLOCKCHAIN SOCIAL GAMES
        </h1>
        <h1 class="text-3xl font-extrabold shadow-white md:mt-8 mt-4 md:text-5xl lg:text-[60px]">
          WEB3 VEGAS IS HERE
        </h1>
        <p class="mt-12 px-4 text-gray-400 text-bold">
          SOLUCKY IS THE BEST GAMBLING PLATFORM IN THE SOLANA BLOCKCHAIN. 
        </p>
        <p class="mt-6 px-4 text-gray-400 text-bold">
          WE AIM TO BE THE FIRST WEB3 CASINO WITH SOLANA'S FAST & CHEAP TRANSACTIONS.
        </p>
        <p class="mt-6 px-4 text-gray-400 text-bold">
          MAKE YOUR DREAMS REALITY. JOIN OUR REVOLUTION.
        </p>

      
        <div class="flex flex-wrap justify-center md:mt-14 mt-8">
        <a class="border bg-gradient-to-tr from-pink-400 to-purple-600 text-white hover:border-white p-4 rounded-xl m-4 px-8 font-bold border-purple-500 hover:animate-bounce transition-colors"
  href="https://twitter.com/intent/tweet?text=HELLO%20FAM! 👋 I'M%20JOINING%20@SOLUCKY__GAMES WHITELIST 10,000 SPOTS FOR OG's! 🥳">
  WHITELIST NOW +18</a>
      </div>
      </div>

      <div class="z-20 text-center align-center justify-center animate-bounce mt-44 hover:animate-none" >


       <img src="../assets/img/web3.png" alt="" class="w-full md:w-[600px] lg:w-[800px] mt-24" />
   
      </div>
    
    </div>
    
    <div class="mt-48 ">

      <h1 class="text-xl text-center font-extrabold  md:mt-8 md:text-3xl lg:text-[30px] text-transparent bg-clip-text bg-gradient-to-r from-pink-100 to-purple-500"
     >
        MORE THAN 20 WALLETS SUPPORTED
      </h1>
        <div class="grid-cols-6 flex flex-wrap justify-center align-center items-center rounded-full py-16 "
        :class="this.$store.state.dark ? 'text-white' : 'text-black'">
    
        <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 hover:px-14 hover:animate-bounce text-center">
          <a href="https://twitter.com/fxmozart_sol" target="_blank" class="cursor-pointer text-center"
          :class="this.$store.state.dark ? 'text-white' : 'text-black'">
            <img src="../assets/img/brave-lion.png" alt="" class="rounded-full w-24 hover:w-42" />
            BRAVE
          </a>
          </div>


        <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 hover:px-14 hover:animate-bounce text-center">
          <a href="https://twitter.com/fxmozart_sol" target="_blank" class="cursor-pointer text-center"
          :class="this.$store.state.dark ? 'text-white' : 'text.black'">
            <img src="../assets/img/coinbase.png" alt="" class="rounded-full w-28 opacity-50 hover:w-42" />
            PHANTOM
          </a>
          </div>

          <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 hover:px-14 hover:animate-bounce text-center">
            <a href="https://twitter.com/fxmozart_sol" target="_blank" class="cursor-pointer text-center"
            :class="this.$store.state.dark ? 'text-white' : 'text.black'">
              <img src="../assets/img/coinbase.png" alt="" class="rounded-full w-28 opacity-50 hover:w-42" />
              COINBASE
            </a>
            </div>
      
            <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 hover:px-14 hover:animate-bounce text-center">
              <a href="https://twitter.com/fxmozart_sol" target="_blank" class="cursor-pointer text-center"
              :class="this.$store.state.dark ? 'text-white' : 'text.black'">
                <img src="../assets/img/coinbase.png" alt="" class="rounded-full w-28 opacity-50 hover:w-42" />
                COINBASE
              </a>
              </div>
      
              <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 hover:px-14 hover:animate-bounce text-center">
                <a href="https://twitter.com/fxmozart_sol" target="_blank" class="cursor-pointer text-center"
                :class="this.$store.state.dark ? 'text-white' : 'text.black'">
                  <img src="../assets/img/coinbase.png" alt="" class="rounded-full w-28 opacity-50 hover:w-42" />
                  COINBASE
                </a>
                </div>
      
                <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 hover:px-14 hover:animate-bounce text-center">
                  <a href="https://twitter.com/fxmozart_sol" target="_blank" class="cursor-pointer text-center"
                  :class="this.$store.state.dark ? 'text-white' : 'text.black'">
                    <img src="../assets/img/coinbase.png" alt="" class="rounded-full w-28 opacity-50 hover:w-42" />
                    COINBASE
                  </a>
                  </div>
              
      
          </div>
    
   
  


    </div>
</div>





</template>


<script>


export default {
  name: 'AboutSection',
  components: {


  },
  
  setup () {



    return {

    }

  }

 
}


</script>

<style scoped>


</style>
