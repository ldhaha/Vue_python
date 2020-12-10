<template>
  <div id="menu-div" :style="{height:main_height}">
<!--    <el-radio-group v-model="isCollapse" style="margin-top: 1px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group> -->
    <el-menu :default-active="default_active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  :collapse="isCollapse"
      @select="changeRoute">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/index/test3">选项1</el-menu-item>
          <el-menu-item index="/index/test4">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    height:700px;
    max-height: 700px;
  }
  #menu-div {
    border-top:  1px solid #e6e6e6;
  }
.el-menu-item {
  font-size: 16px!important;
}
</style>

<script>
  import bus from '@/utils/eventBus.js'
  export default {
    name: "Menu",
    data() {
      return {
        isCollapse: false,
        default_active:''
      };
    },
    computed:{
      main_height() {
        return window.innerHeight;
      }
    },
    mounted(){
      bus.$on("menuColor",(res)=>{
        this.highColor(res)
      })
    },
    methods: {
      highColor(index){
        this.default_active = index

      },
      changeRoute(key, keyPath) {
        this.default_active = keyPath[1]
        bus.$emit("addTab", keyPath)
      },
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {

      }
    }
  }
</script>
