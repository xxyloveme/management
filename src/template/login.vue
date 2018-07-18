<template>
  <div class="login">
    <div class="form-group">
      <h3>登录</h3>
      <el-form ref="form" :model="form" label-width="80px" status-icon :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button type="primary" @click="onSubmit()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Api from '@/api/api'
import Cookies from 'js-cookie'
import Auth from '@/api/auth'

export default {
  name: 'login',
  data () {
    var validateName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      if (this.form.name && this.form.password) {
        Api.login({
          name: this.form.name,
          password: this.form.password
        }).then(res => {
          if (res.data.login) {
            Cookies.set('roles', res.data.name)
            Auth.setToken(res.data.token)
            Auth.setLoginStatus()
            this.$router.push('home')
          } else {
            this.$message.error('登录失败请重试')
          }
        })
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login{
  height: 100%;
  background: url(./../assets/bg.jpg) no-repeat;
  position: relative;
  .form-group{
    width: 390px;
    position: absolute;
    top: 20%;
    left: 50%;
    margin-left: -175px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: #fff;
    padding: 30px 40px 40px 30px;
    box-sizing: border-box;
    .btn-group{
      margin-left: -80px;
    }
  }
}
</style>
