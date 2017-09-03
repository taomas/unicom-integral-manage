<template>
  <div class="login-wrap" id="js-login-particles">
    <div class="ms-title">积分管理系统</div>
    <div class="ms-login">
      <div class="form-body">
        <div class="form-content" :style="{transform: translateX}">
          <div class="form-wrap">
            <el-form :model="loginUser" :rules="rules" label-width="0px" class="demo-ruleForm">
              <el-form-item prop="username">
                <el-input v-model="loginUser.username" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="密码" v-model="loginUser.password"></el-input>
              </el-form-item>
              <div class="login-btn">
                <el-button type="primary" @click="evtUserLogin">登录</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'particles.js'
import config from '../../config/particles.json'
export default {
  data: function () {
    return {
      activeName: 'login',
      loginUser: {
        username: '',
        password: ''
      },
      registerUser: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    isShowLogin() {
      return this.activeName === 'login'
    },
    translateX() {
      return this.activeName === 'login' ? 'translate3d(0, 0, 0)' : 'translate3d(-50%, 0, 0)'
    }
  },
  methods: {
    evtUserLogin() {
      this.$server.login(this.loginUser.username, this.loginUser.password).then(res => {
        let user = res.result.user
        this.$storage.set('username', user.username)
        this.$storage.set('role', user.role)
        this.$storage.set('uid', user.objectId)
        this.$storage.set('IS_LOGIN', true)
        this.$message({
          message: '恭喜你，登录成功！',
          type: 'success',
          duration: '300',
          onClose: () => {
            this.$router.push({ path: '/score' })
          }
        })
      }, (error) => {
        this.$message({
          message: '用户名或密码错误！',
          type: 'error',
        })
      })
    },
    evtRegister() {
      this.$server.register(this.registerUser.username, this.registerUser.password).then(res => {
        let user = res.result.user
        this.$storage.set('username', user.username)
        this.$storage.set('role', user.role)
        this.$storage.set('IS_LOGIN', true)
        this.$message({
          message: '恭喜你，注册成功！',
          type: 'success',
          duration: '1000',
          onClose: () => {
            this.$router.push({ path: '/score' })
          }
        })
      }).catch(error => {
        this.$message({
          message: '用户名已存在！',
          type: 'error',
        })
      })
    },
    loadParticles() {
      particlesJS('js-login-particles', config)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.loadParticles()
    })
  }
}
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 340px;
  height: auto;
  padding: 40px;
  border-radius: 5px;
  background: #fff;
  transform: translate(-50%, -50%);
}

.form-body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.form-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
  height: auto;
  transition: all 0.3s;
}

.form-wrap {
  width: 100%;
  height: auto;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
}

.slide-left-enter-active {
  transition: all .3s ease;
}

.slide-left-leave-active {
  transition: all .3s ease;
}

.slide-left-enter,
.slide-left-leave-to {
  transform: translate3d(-100%, 0, 0);
  opacity: 0;
}

.slide-right-enter-active {
  transition: all .3s ease;
}

.slide-right-leave-active {
  transition: all .3s ease;
}

.slide-right-enter,
.slide-right-leave-to {
  transform: translate3d(100%, 0, 0);
  opacity: 0;
}

@media screen and (max-width: 750px) {
  .ms-login {
    width: 80%;
  }
  .form-wrap {
    width: 100%;
    height: auto;
  }
}
</style>
