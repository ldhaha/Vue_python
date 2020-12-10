<template>
  <div id="content">
    <Search @search="search" @add="add">
      <template v-slot:input>
        <el-col :span="4">
          <el-input v-model="name" placeholder="请输入用户名"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="address" placeholder="请输入地址"></el-input>
        </el-col>
      </template>
    </Search>
    <Dialog :editAble="editAble" @control="control" @control_sub="control_sub">
      <template v-slot:form>
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="序号" v-if="false">
                <el-input v-model="editForm.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期">
                <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="editForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="省份">
                <el-input v-model="editForm.province"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="市区">
                <el-input v-model="editForm.city"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址">
                <el-input v-model="editForm.address"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮编">
                <el-input v-model="editForm.zip"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </template>
    </Dialog>
    <Table @deleteItem="deleteItem" @edit="edit" :Data="tableData"></Table>
    <PageSplit @pageData="pageData" :total="total" ref="page" :current_page="current_page"></PageSplit>
  </div>
</template>

<script>
  import Table from '@/components/Table.vue'
  import Search from '@/components/Search.vue'
  import PageSplit from '@/components/PageSplit.vue'
  import Dialog from '@/components/Dialog.vue'
  import $http from '@/utils/requests.js'
  export default {
    name: "Com",
    data() {
      return {
        name: "",
        address: "",
        tableData: [],
        total: null,
        current_page: "1",
        editAble: false,
        editForm: {
          id: "",
          date: "",
          name: '',
          address: '',
          city: '',
          province: '',
          zip: ''
        }
      }
    },
    components: {
      Table,
      Search,
      PageSplit,
      Dialog
    },
    mounted() {
      this.getTableData();
    },
    methods: {
      getTableData(params = {
        "page": '1',
        'name': this.name
      }) {
        $http.get('/api/get_Data', params).then(res => {
          console.log(res.data.count)
          this.tableData = res.data.data
          console.log(this.tableData)
          this.total = Number(res.data.count)
        })
      },
      search() {
        this.getTableData({
          'name': this.name,
          'page': "1"
        })
        this.current_page = 1;
        console.log(this.$refs.page)
      },
      add() {
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        })
      },
      deleteItem(row) {
        console.log(row)
        $http.get('/api/del_Data', {
          "id": row.id
        }).then((res) => {
          if (res.data.code == 200) {
            for (let i = 0; i < this.tableData.length; i++) {
              if (row.id == this.tableData[i]["id"]) {
                this.tableData.splice(i, 1)
              }
            }
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }
        })
      },

      // 编辑有关
      edit(row) {
        this.editAble = true
        this.editForm = Object.assign(row, {})

      },
      control_sub(){
        this.editAble = false,
        console.log(this.editForm)
        $http.get("/api/edit_Data",this.editForm).then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: 'success',
              message: '更新成功!'
            });
          } else {
            this.$message({
              type: 'warning',
              message: '更新失败!'
            });
          }
        })
      },
      control() {
        this.editAble = false
      },
      //  分页有关
      pageData(pNum) {
        this.getTableData({
          "page": pNum,
          "name": this.name
        });
        this.current_page = pNum
      }
    }
  }
</script>

<style scoped>
  .page-split {
    margin-top: 50px;
  }
  .el-input {
    width: 100%;
  }
  .el-date-editor.el-input__inner{
      width: 270px;
  }
</style>
