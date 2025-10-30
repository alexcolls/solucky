<template>
  <CountDown :time=time :transform="transformSlotProps" v-slot="{ hours, minutes, seconds }">
    {{ hours }} h {{ minutes }} m {{ seconds }} s
  </CountDown>
</template>

<script>
import CountDown from '@chenfengyuan/vue-countdown';

function getTime() {
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getUTCDate() + 1);
  const year = tomorrow.getUTCFullYear();
  const month = tomorrow.getUTCMonth();
  const day = tomorrow.getUTCDate();
  const expires = new Date(Date.UTC(year, month, day));
  const now = new Date().getTime();
  return expires.getTime()-now;
}
const time = getTime();

export default ({ 
  components: {
    CountDown
  },
  setup() { 
    return { time } 
  } 
})
</script>
