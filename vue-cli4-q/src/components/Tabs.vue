<template>
  <div id="tabs">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="switchTab">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style>
  #tab-1 .el-icon-close {
    display: none;
  }
  #tabs {
    margin-top: 40px;
  }
  .el-tabs__nav {
    border-left:none!important
  }
  .el-tabs__item {
    font-size: 16px!important;
  }
</style>
<script>
  import bus from '@/utils/eventBus.js'
  export default {
    name: "Tabs",
    mounted() {
      // this.$router.push({path:this.editableTabs[0]["content"]});
      bus.$on("addTab", (res) => {
        this.addTab(res)
      })
    },
    data() {
      return {
        editableTabsValue: '1',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: '/index/com',

        }],
        tabIndex: 1
      }
    },
    methods: {

      // 增加tab
      addTab(targetName) {
        // 将路由先转化为对应的
        this.$router.push({path:targetName[1]});
        let tabsExist = false;

        // 如果该tab已经存在就将它高亮
        for (let item of this.editableTabs) {
          if (item.content === targetName[1]) {
            this.editableTabsValue = item.name;
            tabsExist = true;
            break;
          }
        }

        // 不存在就添加
        if (tabsExist === false) {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: targetName[1]
          });
          this.editableTabsValue = newTabName;
        }
      },


      //移除tab
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                 this.$router.push({path:nextTab.content});
                 bus.$emit("menuColor",nextTab.content)
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      },

      // 切换tab
      switchTab(target, event) {
        let id = event.target.getAttribute("id").split("-")[1];
        let index = 0;
        this.editableTabs.forEach((item, index) => {
          if (item.name == id) {
            this.$router.push({path:item.content});;
             bus.$emit("menuColor",item.content)
             this.editableTabsValue = id + '';
            return;
          }
        })

      }
    }
  }
</script>
