<template>
  <div class="z-50 bg-white h-min-screen opcaity-100 "
    :class="this.$store.state.dark ? 'bg-black' : 'bg-white'">
    <h1></h1>
    <collection-panel></collection-panel>
  </div>

</template>


<script>

import CollectionPanel from './CollectionPanel.vue';

export default {
  name: 'AboutSection',
  components: {


    CollectionPanel
  },
  
  setup () {



    return {

    }

  }

 
}


</script>

<style scoped>


</style>
