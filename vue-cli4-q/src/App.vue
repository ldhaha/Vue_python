<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
import Index from '@/views/index.vue'
import http from '@/utils/requests.js'
export default {
  data(){
    return{

    }
  }
}
</script>
<style>
 body,html {
   margin: 0;
   padding: 0;
   height: 100%;
 }
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
