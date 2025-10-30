<template>
  <div>
    <div class="scene scene--card">
      <div
        class="card"
        @click="cardOne == 'start' ? (cardOne = 'flipped' ) : (cardOne = 'start' )"
        v-bind:class="{ flipme: cardOne == 'flipped' }"
      >
        <div class="card__face card__face--front">front</div>
        <div class="card__face card__face--back">back</div>
      </div>
    </div>
    <p>Click card to flip.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardOne: "start"
    };
  }
};
</script>

<style scoped>
body {
  font-family: sans-serif;
}

.scene {
  width: 200px;
  height: 260px;
  border: 1px solid #ccc;
  margin: 40px 0;
  perspective: 600px;
}

.card {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 260px;
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 40px;
  backface-visibility: hidden;
}

.card__face--front {
  background: red;
}

.card__face--back {
  background: blue;
  transform: rotateY(180deg);
}

/* this style is applied when the card is clicked */
.flipme {
  transform: rotateY(180deg);
}
</style>