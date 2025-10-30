<template>
  <teleport to="body">
    <div ref="modal-backdrop" class="fixed z-10 inset-0 overflow-y-auto bg-opacity-50" :class="!this.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'">
      <img :src="fireworks" class="fixed z-1 inset-0 m-auto opacity-30" />
      <div class="z-20 flex items-center justify-center min-h-screen text-center" >
        <div class="z-90 rounded-lg text-center overflow-hidden shadow-xl p-8 w-1/3 flex flex-col justify-center" :class="this.dark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-700'" >
          <p class="uppercase text-2xl tracking-widest text-gray-400 font-semibold">
            Congrats! Your number is commited!
          </p>
          <p class="mt-10 text-2xl tracking-widest text-gray-400 font-semibold">
            Would you like to verify your ticket?
          </p>
          
          <button  @click="login">Twitter</button>
        </div>
        
      </div>
    </div>
  </teleport>
</template>

<script>
// import LoginWithTwitter from "../services/twitter-auth";

// const tw = new LoginWithTwitter({
//   consumerKey: '0Y42EKLLt3IwyYALd8gsR01xP',
//   consumerSecret: 'fJkC4jOcTjT2OhJiNzQiiCiEM2rONOch9liXIyMZ7KRrVJ5MYF',
//   callbackUrl: 'https://localhost:8080'
// })
// import { watchEffect, ref } from 'vue';
//import { TwitterApi } from 'twitter-api-v2';

// Instantiate with desired auth type (here's Bearer v2 auth)
//const twitterClient = new TwitterApi({ appKey: '0Y42EKLLt3IwyYALd8gsR01xP', appSecret: 'fJkC4jOcTjT2OhJiNzQiiCiEM2rONOch9liXIyMZ7KRrVJ5MYF' });

//const readOnlyClient = twitterClient.readOnly;

// Play with the built in methods
// import fireworks from '../assets/fireworks.gif'


export default {
  components: {
    // fireworks
  },
  setup () {

    // const tw_user = ref();
    // watchEffect(async () => {
    //   const user = await twitterClient.appLogin();

    //   console.log(user);
      
    // });

    // return {
    //   tw_user
    // }
  },
  data() {
    return {
      fireworks: require("../assets/fireworks.gif"),
      dark: false
    }
  }
  
}
</script>
