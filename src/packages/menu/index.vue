<template>
  <div class="side_menu">
    <el-menu
      :default-active="onRoutes"
      text-color="#ffffff"
      active-text-color="#ffffff"
      background-color="#343f51"
      router
      :default-openeds="opens"
    >
      <mysubmenu :menuList="menuList"></mysubmenu>
    </el-menu>
  </div>
</template>
<script>
import mysubmenu from "./subMenu.vue";

export default {
  name: "ElmeMenu",
  components: {
    mysubmenu
  },
  data() {
    return {
      collapse: false,
      opens: []
    };
  },
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [
          {
            // icon: require('../../assets/images/workbench.png'),
            index: "workbench",
            show: true,
            title: "工作台"
          },
          {
            // icon: require('../../assets/images/shoper.png'),
            index: "shoper",
            show: true,
            title: "商家管理"
          }
        ];
      }
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {},
  methods: {
    openKey(e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
/* // /deep/ .el-menu {
//   border-right: 0;
//   background-color: transparent;
// } */
.side_menu {
  display: block;
  overflow-y: scroll;
}
.side_menu::-webkit-scrollbar {
  width: 0;
}
/* // /deep/ .el-submenu__title i {
//   color: #fff;
//   text-indent: 0;
// } */
.el-menu-item.is-active {
  background-color: #b86600 !important;
}
.el-menu--inline li {
  /* 二级菜单颜色 */
  background-color: #b87700 !important;
  text-indent: 10px;
}
</style>