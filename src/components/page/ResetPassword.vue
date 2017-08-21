<template>
  <div class="reset-password">
    <h1 class="score-title">
      重置密码
    </h1>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
      <el-form-item label="原登陆密码" prop="name">
        <el-input placeholder="原登陆密码"></el-input>
      </el-form-item>
      <el-form-item label="新登陆密码" prop="region">
        <el-input placeholder="新登陆密码"></el-input>
      </el-form-item>
      <el-form-item label="再次输入新密码" prop="region">
        <el-input placeholder="再次输入新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {

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
