<template>
  <div class="reset-password">
    <h1 class="score-title">
      重置密码
    </h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <el-form-item label="原登陆密码" prop="oldPassword">
        <el-input placeholder="原登陆密码" v-model="ruleForm.oldPassword"></el-input>
      </el-form-item>
      <el-form-item label="新登陆密码" prop="newPassword">
        <el-input placeholder="新登陆密码" v-model="ruleForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="repeatPassword">
        <el-input placeholder="再次输入新密码" v-model="ruleForm.repeatPassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="evtResetPassword">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原登录密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        repeatPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    evtResetPassword() {
      if (this.ruleForm.newPassword !== this.ruleForm.repeatPassword) {
        this.$message('两次密码输入不一致')
      } else {
        let id = this.$storage.get('uid')
        console.log(id)
        this.$server.resetPassword({
          id: id,
          oldPassword: this.ruleForm.oldPassword,
          newPassword: this.ruleForm.newPassword
        }).then(res => {
          this.$message({
            message: '密码修改成功，请重新登录！',
            onClose: () => {
              this.$storage.clearAll()
              this.$router.push('/login')
            }
          })
        }).catch(res => {
          this.$message('原登录密码有误')
        })
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/layout.css';

h1 {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #324157;
  margin-bottom: 15px;
}

.reset-list {
  margin-top: 15px;
}

.reset-item {
  width: 400px;
  height: 40px;
  margin-top: 10px;
}

.item-label {
  width: 110px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #48576a;
  text-align: right;
  margin-right: 15px;
}

.el-input {
  width: 250px;
}

.btn-wrap {
  margin-left: 218px;
  margin-top: 15px;
}
</style>
