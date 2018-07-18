<template>
  <div class="permission">我是需要授权的页面</div>
</template>

<script>
export default {
  name: 'permission',
  data () {
    return {

    }
  },
  mounted () {
    let arr = [12, 3, 45, 14, 'a']
    let newArr = this.myUtils.filter(arr, 10, 20)
    console.log('newarr:' + JSON.stringify(newArr))
  }
}
</script>
