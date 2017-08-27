<template>
  <div class="add-user">
    <el-button type="text" @click="dialogFormVisible = true" size="small">编辑</el-button>
    <el-dialog title="编辑用户" v-model="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="推荐人数" :label-width="formLabelWidth">
          <el-input v-model="user.recommendCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" :label-width="formLabelWidth">
          <el-input v-model="user.score" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="总积分" :label-width="formLabelWidth">
          <el-input v-model="user.totalScore" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="user.role" placeholder="请选择账户类型">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="普通用户" value="user"></el-option>
          </el-select>
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
      user: {},
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
  },
  props: ['userdata'],
  methods: {
    showFormDialog() {
      this.dialogFormVisible = true
    },
    handleCancel() {
      this.dialogFormVisible = false
    },
    handleConfirm() {
      let params = {
        id: this.user.objectId,
        username: this.user.username,
        password: this.user.password,
        recommendCount: this.user.recommendCount,
        score: this.user.score,
        totalScore: this.user.totalScore,
        role: this.user.role
      }
      Object.keys(params).forEach(key => {
        if (!isNaN(+params[key]) && ['username', 'password'].indexOf(key) === -1) {
          params[key] = +params[key]
        }
      })
      this.$server.saveUserDetail(params).then(res => {
        this.$message({
          message: `更新账户信息成功！`,
          type: 'success',
          duration: '500',
          onClose: () => {
            this.dialogFormVisible = false
            this.$emit('on-save-user', true)
          }
        })
      })
    }
  },
  created () {
    this.user = JSON.parse(JSON.stringify(this.userdata))
  }
}
</script>


<style scoped>
</style>

