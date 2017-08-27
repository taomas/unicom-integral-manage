<template>
  <div class="customer-score">
    <h1 class="score-title">
      首页
    </h1>
    <ul class="score-list ly-row-flex flex-space-between">
      <li class="score-item">
        <p class="score-number" id="score-person">
          --
        </p>
        <p class="score-label">
          推荐人数
        </p>
      </li>
      <li class="score-item">
        <p class="score-number" id="score-number">
          --
        </p>
        <p class="score-label">
          积分
        </p>
      </li>
      <li class="score-item">
        <p class="score-number" id="score-add">
          --
        </p>
        <p class="score-label">
          每日新增
        </p>
      </li>
    </ul>
    <h2 class="table-title">积分奖励</h2>
    <el-table :data="userScores" border style="width: 100%">
      <el-table-column prop="time" label="日期">
      </el-table-column>
      <el-table-column prop="score" label="消费赠送额度积分奖励">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CountUp from 'countup.js'
export default {
  data() {
    return {
      user: {
        recommendCount: '--',
        score: '--',
        addScore: '--'
      }
    }
  },
  computed: {
    userScores() {
      let userScores = []
      if (this.user) {
        userScores = [{
          time: '今日',
          score: this.user.score
        }, {
          time: '昨日',
          score: '8'
        }, {
          time: '全部',
          score: this.user.totalScore
        }]
      }
      return userScores
    }
  },
  methods: {
    evtCountup() {
      this.handleCountup('score-person', 0, this.user.recommendCount)
      this.handleCountup('score-number', 0, this.user.totalScore)
      this.handleCountup('score-add', 0, this.user.score)
    },
    handleCountup(id, start, end, fixed) {
      let count = new CountUp(id, start, end)
      count.start()
    },
    getUserDetail() {
      let uid = this.$storage.get('uid')
      this.$server.getUserDetail(uid).then(user => {
        this.user = user
        this.evtCountup()
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getUserDetail()
    })
  }
}
</script>

<style scoped>
@import '../../assets/css/layout.css';

.customer-score {}

.score-title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #324157;
}

.score-list {
  width: 100%;
  height: auto;
  list-style: none;
  margin-bottom: 50px;
}

.score-item {
  display: block;
  width: 30%;
  height: 150px;
  background: linear-gradient(to right, #DDE4EA, #DBE3E9);
  border-radius: 6px;
}

.score-number {
  font-size: 80px;
  color: #19B39C;
  text-align: center;
}

.score-label {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
}

h2 {
  padding: 15px 0;
  font-size: 18px;
  color: #324157;
  text-align: center;
}
</style>
