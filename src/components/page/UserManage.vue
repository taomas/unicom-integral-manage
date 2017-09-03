<template>
  <div class="user-manage">
    <h1 class="manage-title">
      用户管理
    </h1>
    <el-row>
      <el-col :span="24">
        <div class="row ly-row-flex flex-space-between">
          <div class="btn-wrap row ly-row-flex flex-start">
            <add-score @on-add-score="getUsers"></add-score>
            <add-user @on-register-success="getUsers"></add-user>
          </div>
          <el-input placeholder="请输入账号" v-model="username" class="btn-search" @keyup.enter.native="handleSearch">
            <el-button type="primary" slot="append" icon="search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-table class="table-user-list" :data="formatUsers" border style="width: 100%">
      <el-table-column prop="username" label="账号" width="150" fixed>
      </el-table-column>
      <el-table-column prop="recommendCount" label="推荐人数" width="120">
      </el-table-column>
      <el-table-column prop="yesterdayScore" label="昨日新增" width="120">
      </el-table-column>
      <el-table-column prop="todayScore" label="今日新增" width="120">
      </el-table-column>
      <el-table-column prop="totalScore" label="总积分" width="120">
      </el-table-column>
      <el-table-column prop="roleTxt" label="角色" width="120">
      </el-table-column>
      <el-table-column prop="name" label="真实姓名" width="120">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="150">
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="120">
      </el-table-column>
      <el-table-column prop="idcard" label="身份证号" width="120">
      </el-table-column>
      <el-table-column label="操作" width="100" fixed="right">
        <template scope="scope">
          <div class="ly-row-flex flex-start flex-space-between">
            <edit-user :userdata="scope.row" @on-save-user="getUsers"></edit-user>
            <el-button @click="handleDeleteUser(scope.row.objectId)" type="text" size="small">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AddScore from '../common/AddScore'
import AddUser from '../common/AddUser'
import EditUser from '../common/EditUser'

export default {
  data() {
    return {
      users: [],
      username: '',
      isShowSearch: false
    }
  },
  computed: {
    formatUsers() {
      return this.users.map(user => {
        user.roleTxt = user.role === 'admin' ? '管理员' : '普通用户'
        return user
      })
    }
  },
  methods: {
    addUserScore() {
      this.users.forEach((user) => {
        let addRecord = user.addRecord
        if (addRecord) {
        }
      })
    },
    getUsers() {
      this.$server.getAllUser().then(users => {
        this.users = users
      })
    },
    handleCancel() {
      this.isShowSearch = false
    },
    handleSearch() {
      if (!this.username) {
        this.getUsers()
      } else {
        this.$server.searchUser(this.username).then(res => {
          this.isShowSearch = false
          this.users = res
        })
      }
    },
    handleDeleteUser(id) {
      this.$server.deleteUser(id).then(res => {
        this.$message({
          message: '删除用户成功',
          type: 'success',
          duration: '500',
          onClose: () => {
            this.getUsers()
          }
        })
      })
    },
    verifyRole() {
      let role = this.$storage.get('role')
      if (role !== 'admin') {
        this.$message({
          message: '您暂无访问该页面权限',
          type: 'error',
          onClose: () => {
            this.$router.push('/score')
          }
        })
      } else {
        this.getUsers()
      }
    }
  },
  components: {
    'add-score': AddScore,
    'add-user': AddUser,
    'edit-user': EditUser
  },
  created() {
    this.verifyRole()
  }
}
</script>

<style scoped>
.btn-add-user {
  float: right;
}

.table-user-list {
  margin-top: 15px;
}

.btn-search {
  margin-left: 15px;
}

.el-input {
  width: 210px;
}
</style>
