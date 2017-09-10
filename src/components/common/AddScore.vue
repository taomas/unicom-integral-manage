<template>
  <div class="add-user">
    <el-button type="primary" @click="dialogFormVisible = true">新增积分</el-button>
    <el-dialog title="新增积分" v-model="dialogFormVisible">
      <el-form>
        <el-form-item label="消费基数" :label-width="formLabelWidth">
          <el-input v-model="score" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="推荐基数" :label-width="formLabelWidth">
          <el-input v-model="baseScore" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: 10,
      baseScore: 10,
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  methods: {
    showFormDialog() {
      this.dialogFormVisible = true
    },
    handleCancel() {
      this.dialogFormVisible = false
    },
    handleConfirm() {
      if (isNaN(+this.score) || this.score > 20 || this.score < 0) {
        return this.$message('购买基数范围为0到20')
      }
      if (isNaN(+this.baseScore) || this.baseScore > 20 || this.baseScore <= 0) {
        return this.$message('推荐基数范围为0到20')
      }
      // this.evtAddParams()
      this.$server.addScore(this.score, this.baseScore).then(res => {
        this.dialogFormVisible = false
        this.$emit('on-add-score', true)
      }).catch(res => {
        if (!res.success) {
          this.$message(res.message)
        }
      })
    },
    evtAddParams() {
      this.$server.addParams().then(res => {
        this.dialogFormVisible = false
      })
    }
  }
}
</script>


<style scoped>
.add-user {
  margin-right: 15px;
}
</style>

