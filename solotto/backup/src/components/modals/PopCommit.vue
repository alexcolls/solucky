<template>
 <div class="popup">
  <div class="popup-inner">
    <slot />
  </div>
 </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 99;
  background: rgba(109, 109, 109, 0.699);
  
  display: flex;
  align-items: center;
  justify-content: center;
  .popup-inner {
    position: relative;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.747);
    padding: 3rem;
    color: white;
    border-radius: 30px;
  }

}

</style>