<template>
  <div class="side_menu">
    <el-menu
      :default-active="onRoutes"
      :text-color="textColor"
      :active-text-color="activeColor"
      :background-color="backgroundColor"
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
    // 菜单层级数组
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
    },
    // 菜单的文字颜色（仅支持 hex 格式）
    textColor: {
      type: String,
      default: function() {
        return '#303133'
      }
    },
    // 菜单的背景色（仅支持 hex 格式）
    backgroundColor: {
      type: String,
      default: function() {
        return '#ffffff'
      }
    },
    // 当前激活菜单的文字颜色（仅支持 hex 格式）
    activeColor: {
      type: String,
      default: function() {
        return '#409EFF'
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
.side_menu {
  display: block;
  overflow-y: scroll;
}
.side_menu::-webkit-scrollbar {
  width: 0;
}
/* .el-menu-item.is-active {
  background-color: #b86600 !important;
} */
  /* 二级菜单颜色 */
/* .el-menu--inline li {
  background-color: #b87700 !important;
  text-indent: 10px;
} */
</style>