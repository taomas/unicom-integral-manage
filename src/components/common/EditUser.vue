<template>
  <div class="edit-user">
    <el-button type="text" @click="dialogFormVisible = true" size="small">编辑</el-button>
    <el-dialog title="编辑用户" v-model="dialogFormVisible">
      <el-form class="form-edit" :model="user">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="user.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="user.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="推荐人数" :label-width="formLabelWidth">
          <el-input v-model="user.recommendCount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="购买次数" :label-width="formLabelWidth">
          <el-input v-model="user.buyTimes" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昨日新增" :label-width="formLabelWidth">
          <el-input v-model="user.yesterdayScore" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="今日新增" :label-width="formLabelWidth">
          <el-input v-model="user.todayScore" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="可用积分" :label-width="formLabelWidth">
          <el-input v-model="user.actualScore" auto-complete="off"></el-input>
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
        <el-form-item label="真实姓名" :label-width="formLabelWidth">
          <el-input v-model="user.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="user.gender" placeholder="请选择性别">
            <el-option label="男" value="male"></el-option>
            <el-option label="女" value="female"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="user.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-input v-model="user.birth" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth">
          <el-input v-model="user.idcard" auto-complete="off"></el-input>
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
        ...this.user
        // username: this.user.username,
        // password: this.user.password,
        // recommendCount: this.user.recommendCount,
        // yesterdayScore: this.user.yesterdayScore,
        // todayScore: this.user.todayScore,
        // totalScore: this.user.totalScore,
        // role: this.user.role
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


<style>
.form-edit {
  width: 100%;
  height: 450px;
  overflow: scroll;
}
.el-dialog__wrapper {
  background: rgba(0, 0, 0, 0.5);
}
.v-modal {
  display: none;
}
/*.el-dialog__wrapper {
  background: rgba(0, 0, 0, 0.5);
}
.v-modal {
  display: none;
}*/
</style>

