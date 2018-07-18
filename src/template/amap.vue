<template>
  <div class="amap">
    <div id="container" :style="{width: '100%', height: '800px'}"></div>
  </div>
</template>

<script>
import AMap from 'AMap'

export default {
  name: 'amap',
  data () {
    return {

    }
  },
  mounted () {
    let map = new AMap.Map('container', {
      zoom: 15,
      center: [116.397428, 39.90923],
      resizeEnable: true
    })
    let lineArr = [
      [116.368904, 39.913423],
      [116.382122, 39.901176],
      [116.387271, 39.912501],
      [116.398258, 39.904600]
    ]
    let polyline = new AMap.Polyline({
      path: lineArr,
      strokeColor: '3366FF',
      strokeWeight: 5,
      strokeStyle: 'solid'
    })
    map.add(polyline)
  }
}
</script>
