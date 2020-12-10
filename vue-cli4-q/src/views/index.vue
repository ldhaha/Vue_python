<template>
  <div>
    <el-container>
      <Menu></Menu>
      <el-container>
        <el-header style="font-size: 12px;padding-left: 0px;" class="tabs-header">
          <PageHeader></PageHeader>
          <Tabs></Tabs>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
  .el-main {
    padding-left: 0px !important;
  }
</style>

<script>
  import Tabs from '@/components/Tabs.vue'
  import Menu from '@/components/Menu.vue'
  import PageHeader from '@/components/PageHeader.vue'
  export default {
    name: 'Index',
    data() {
      return {

      }
    },
    mounted() {
      console.log("ajja")
      this.$router.push({
        path: "/index/com"
      })
    },
    components: {
      Menu,
      Tabs,
      PageHeader
    },
    methods: {}
  };
</script>
