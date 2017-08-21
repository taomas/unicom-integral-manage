<template>
  <div class="customer-score" id="particles-js">
    <div class="score-pannel">
      <div class="title">您的个人积分</div>
      <p class="score-number" id="count-up">1,0000</p>
    </div>
  </div>
</template>

<script>
import 'particles.js'
import CountUp from 'countup.js'
import config from './assets/particles.json'
export default {
  methods: {
    loadParticles() {
      particlesJS('particles-js', config)
    },
    evtCountup() {
      let count = new CountUp("count-up", 0, 100, 2)
      count.start()
    },
    queryUserScore() {
      this.$server.queryUserScore().then(res => {
        console.log(res)
      })
    },
    initUserScore() {
      this.$server.initUserScore()
      // .then(res => {
      //   console.log(res)
      // })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.loadParticles()
      this.evtCountup()
      this.initUserScore()
      // this.queryUserScore()
    })
  }
}
</script>

<style scoped>
.customer-score {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #252525;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

.score-pannel {
  position: absolute;
  left: 50%;
  top: 40%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.title {
  font-size: 24px;
  color: #fff;
  text-align: left;
}

.score-number {
  font-family: 'Righteous', monospace, sans-serif;
  font-size: 56px;
  color: #8B8C8D;
  text-align: center;
}
</style>
