<template>
  <div class="search_div">
    <el-row :gutter="20" type="flex" justify="start">
      <template>
        <slot name="input"></slot>
      </template>
      <el-button type="primary" @click="searchItem()" icon="el-icon-search">搜索</el-button>
      <el-button type="success" @click="addItem()" icon="el-icon-circle-plus-outline">添加</el-button>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
 
      }
    },
    mounted() {

    },
    methods: {
      searchItem() {
        this.$emit("search")
      },
      addItem() {
        this.$emit("add")
      }
    }
  }
</script>

<style>
  .search_div {
    margin-top: 10px;
    margin-bottom: 5px;
    margin-left: 5px;
  }
</style>
