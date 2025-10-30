<template>
  <div class="z-50 bg-white h-min-screen opcaity-100 py-32 "
    :class="this.$store.state.dark ? 'bg-black' : 'bg-white'" >
    
    <div class="mt-32 ">

  <h1 class="text-3xl text-center font-extrabold shadow-white md:mt-8 md:text-5xl lg:text-[60px] "
  :class="this.$store.state.dark ? 'text-white' : 'text-black'">
    OUR TEAM
  </h1>
    <div class="grid-cols-6 flex flex-wrap justify-center align-center items-center rounded-full py-32 "
    :class="this.$store.state.dark ? 'text-white' : 'text-black'">

    <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 py-24 px-4 hover:px-14 hover:animate-bounce">
      <a href="https://twitter.com/fxmozart_sol" target="_blank" class="cursor-pointer text-white ">
        <img src="../assets/img/27.png" alt="" class="rounded-full w-32 opacity-50 hover:w-42" />
        FX<br> MOZART
      </a>
      </div>
  
      <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 py-24 px-4 hover:px-14 hover:animate-bounce">
        <a href="https://twitter.com/solanaqueen420" target="_blank" class="cursor-pointer text-white ">
        <img src="../assets/img/solanaqueen420.jpg" alt="" class="rounded-full w-32 opacity-50" />
        SOLANA <br>QUEEN
      </a>
      </div>
      <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 py-24 px-4 hover:px-14 hover:animate-bounce">
        <a href="https://twitter.com/ellissa_art" target="_blank" class="cursor-pointer text-white ">
        
        <img src="../assets/img/elissa.jpg" alt="" class="rounded-full w-32 opacity-50" />
        ELISSA <br>ART
        </a>
      </div>
      <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 py-24 px-4 hover:px-14 hover:animate-bounce">
        <a href="https://twitter.com/maxriderbmx" target="_blank" class="cursor-pointer text-white ">
        
        <img src="../assets/img/doxy.png" alt="" class="rounded-full w-32 opacity-50" />
        DOXXIS <br> GM
        </a>
      </div>
      <div class="rounded-full  bg-gradient-to-tr from-pink-400 to-purple-600 font-bold text-2xl mx-12 opacity-75 py-24 px-4 hover:px-14 hover:animate-bounce">
        <a href="https://twitter.com/maxriderbmx" target="_blank" class="cursor-pointer text-white ">
        
        <img src="../assets/img/metamax.jpg" alt="" class="rounded-full w-32 opacity-50" />
        META <br> MAX
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
