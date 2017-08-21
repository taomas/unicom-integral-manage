<template>
  <div class="customer-score" id="particles-js">

  </div>
</template>

<script>
import particlesJS from 'particles.js'
export default {
  mounted () {
    this.$nextTick(() => {
      particlesJS.load('particles-js', '../../assets/config/particles.json', function() {
        console.log('callback - particles-js config loaded');
      })
    })
  }
}
</script>

<style scoped>
.customer-score {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
