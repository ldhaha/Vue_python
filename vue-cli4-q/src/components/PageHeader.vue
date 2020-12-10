<template>
  <div class="page-header">
    <el-page-header @back="goBack" title="退出">
    </el-page-header>
  </div>
</template>

<script>
  export default {
    name: "PageHeader",
    mounted(){

    },
    methods: {
      goBack() {
        this.$router.push({path:"/"})
      }
    }
  }
</script>

<style>
    .page-header {
      float: right;
    }
    .el-page-header {
      line-height: 40px!important;
    }
    .el-page-header__content{
      display: none!important;
    }
</style>
