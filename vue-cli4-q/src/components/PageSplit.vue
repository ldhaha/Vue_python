<template>
  <div class="page-split">
    <el-pagination background :page-size="5" layout="prev, pager, next" :total="total" :curren-page="current_page" @current-change="currentChange" @prev-click="prevClick"
      @next-click="nextClick">
    </el-pagination>
  </div>
</template>
<style>
</style>
<script>
  export default {
    name: "PageSplit",
    props:["total","current_page"],
    methods: {
      prevClick(val) {
        this.$emit("pageData", val)
      },
      nextClick(val) {
        this.$emit("pageData", val)
      },
      currentChange(val) {
        this.$emit("pageData", val)
      }
    }
  }
</script>

<style>
</style>
