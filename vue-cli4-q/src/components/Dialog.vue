<template>
  <div class="dialog_div">
    <el-dialog title="编辑" top="10vh" :visible.sync="editAble" width="50%" :before-close="handleClose">
      <slot name="form"></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disappear">取 消</el-button>
        <el-button type="primary" @click="disappear_sub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Dialog",
    props: ['editAble'],
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      disappear() {
        this.$emit("control")
      },
      disappear_sub(){
        console.log("哈哈哈")
        this.$emit("control_sub")
      },
      handleClose(done) {
        var that = this;
        this.$confirm('确认关闭？')
          .then(_ => {
            that.$emit("control")
          })
          .catch(_ => {});
      }
    }
  }
</script>

<style>
</style>
