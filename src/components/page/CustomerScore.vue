<template>
  <div class="customer-score">
    <h1 class="score-title">
      首页
    </h1>
    <ul class="score-list ly-row-flex flex-space-between">
      <li class="score-item">
        <p class="score-number" id="score-person">
          5
        </p>
        <p class="score-label">
          推荐人数
        </p>
      </li>
      <li class="score-item">
        <p class="score-number" id="score-number">
          2000
        </p>
        <p class="score-label">
          积分
        </p>
      </li>
      <li class="score-item">
        <p class="score-number" id="score-add">
          10
        </p>
        <p class="score-label">
          每日新增
        </p>
      </li>
    </ul>
    <h2 class="table-title">积分奖励</h2>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期">
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
      tableData: [{
        date: '今日',
        score: '12'
      }, {
        date: '昨日',
        score: '8'
      }, {
        date: '全部',
        score: '2000'
      }]

    }
  },
  methods: {
    evtCountup() {
      this.handleCountup('score-person', 0, 5)
      this.handleCountup('score-number', 0, 2000)
      this.handleCountup('score-add', 0, 15)
    },
    handleCountup(id, start, end, fixed) {
      let count = new CountUp(id, start, end)
      count.start()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.evtCountup()
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
