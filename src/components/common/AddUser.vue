<template>
  <div class="add-user">
    <el-button type="primary" @click="dialogFormVisible = true">新增用户</el-button>
    <el-dialog title="新增用户" v-model="dialogFormVisible">
      <el-form :model="user">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" auto-complete="off"></el-input>
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
      user: {
        username: '',
        password: '',
        role: 'user'
      },
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
      this.evtRegister()
    },
    evtRegister() {
      return this.$server.register(this.user).then(res => {
        let user = res.result.user
        this.$message({
          message: `创建用户成功！`,
          type: 'success',
          duration: '500',
          onClose: () => {
            this.dialogFormVisible = false
            this.$emit('on-register-success', true)
          }
        })
      }).catch(error => {
        this.$message({
          message: '用户名已存在！',
          type: 'error',
        })
      })
    },
  }
}
</script>


<style scoped>
</style>

