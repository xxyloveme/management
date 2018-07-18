<template>
  <div class="home">
    <el-menu class="el-menu-vertical-demo nav" :router="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="1">
      <el-menu-item v-for="(item, n) in navLists" :key="n" :index="item.path">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="box">
      <router-view></router-view>
    </div>
    <el-button class="btn" @click="loginout" type="primary">退出登录</el-button>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      navLists: ''
    }
  },
  mounted () {
    let arr = JSON.parse(localStorage.getItem('router'))
    this.getNavlist(arr, (res) => {
      this.navLists = res
    })
  },
  methods: {
    getNavlist (data, cb) {
      let arr = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].path === '/home') {
          let childarr = data[i].children
          for (let j = 0; j < childarr.length; j++) {
            arr.push(childarr[j])
          }
        } else if (data[i].path !== '/login' && data[i].path !== '/') {
          arr.push(data[i])
        }
      }
      cb(arr)
    },
    loginout () {
      this.$router.push('login')
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  position: relative;
  height: 100%;
  .nav {
    width: 200px;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .box{
    padding-left: 200px;
  }
  .btn{
    position: fixed;
    top: 10px;
    right: 30px;
  }
}

</style>
