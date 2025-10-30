<template>
  <div class="p-4 pt-8 text-center text-xs text-gray-400 align-center justify-center items-center" :class="this.$store.state.dark ? 'bg-gray-900' : 'bg-gray-100'" > 
    
    <div class="flex flex-wrap justify-center items-center rounded-xl m-4">
    
    <div class="align-center justify-center items-center my-12">
      <iframe src="https://discord.com/widget?id=1043119388057935913&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
    </div>
    </div>

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
        {{ 0 }}
      </div>
    </div>
    Made with 💓 by Solucky Games © All rights reserved. <br>Built in <a href="https://solana.com/" target="_blank" class="underline">Solana</a> in 2022. Good luck all!
  </div>
</template>

<script>

export default {
  props: [
    'time',
    'users'
  ],
  setup() {
    
  },
}
</script>
