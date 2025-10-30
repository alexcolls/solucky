<template>
  <div>
    <div v-if="_date" class="text-gray-400 text-xl">
      {{ date }}
    </div>
    <CountDown :time=time :transform="transformSlotProps" v-slot="{ hours, minutes, seconds }">
      {{ hours }}h {{ minutes }}m {{ seconds }}s
    </CountDown>
  </div>
</template>

<script>
  import CountDown from '@chenfengyuan/vue-countdown';
  
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getUTCDate() + 1);
  const year = tomorrow.getUTCFullYear();
  const month = tomorrow.getUTCMonth();
  const day = tomorrow.getUTCDate();
  const dd = String(day).length == 1 ? '0'+String(day) : String(day)
  const expires = new Date(Date.UTC(year, month, day));
  const now = new Date().getTime();
  const date = `${year}-${month}-${dd}`;
  const time = expires.getTime()-now; 

  export default ({
    props: ['_date'],
    components: {
      CountDown
    },
    setup() { 
      return { 
        date,
        time 
      } 
    } 
  })
</script>
