<template>
  <div class="table-div">
    <el-table :data="Data" border @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="id" label="序号" v-if="show"></el-table-column>
      <template v-for="(item, index) in Object.keys(tableHeader)">
        <el-table-column :prop="item" :label="tableHeader[item]" :key="index">
        </el-table-column>
      </template>

      <!--      <el-table-column prop="date" label="日期" sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable>
      </el-table-column>
      <el-table-column prop="province" label="省份" sortable>
      </el-table-column>
      <el-table-column prop="city" label="市区" sortable>
      </el-table-column>
      <el-table-column prop="address" label="地址" sortable>
      </el-table-column>
      <el-table-column prop="zip" label="邮编" sortable>
      </el-table-column> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Table",
    props: [
      "Data"
    ],
    mounted() {
      this.baseUrl = this.$route.path
    },
    methods: {
      handleEdit(index, row) {
        this.$emit("edit", row)
      },
      handleDelete(index, row) {
        let that = this;
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 请求删除
          that.$emit("deleteItem",row);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    },

    data() {
      return {
        show:false,
        tableHeader: {
          date: "日期",
          name: "姓名",
          province: "省份",
          city: "市区",
          address: "地址",
          zip: "邮编"
        },
        baseUrl: "",
        mumultipleSelection: [],
        assetTypeSearch: '',
      }
    }
  }
</script>

<style>
  .table-div {
    margin-top: 0.5px;
  }

  .el-table th.gutter {
    display: table-cell !important;
  }
</style>
