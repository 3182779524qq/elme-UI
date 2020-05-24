<template>
  <div class="sub_menu">
    <template v-for="item in menuList">
      <template v-if="item.children">
        <el-submenu :index="item.index" :key="item.index" v-if="item.show">
          <!-- <img :src="item.icon" alt=""> -->
          <span slot="title"><i v-if="item.icon" :class="item.icon" class="iconfont"></i><img v-if="item.img" :src="item.img" alt="">{{ item.title }}</span>
          <tree-menu :menuList="item.children"></tree-menu>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :key="item.index" v-if="item.show">
          <img v-if="item.img" :src="item.img" alt="">
          <i v-if="item.icon" :class="item.icon" class="iconfont"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  name: "treeMenu",
  data() {
    return {
    };
  },
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  computed: {
  },
  created() {},
  methods: {
  }
};
</script>
<style scoped>
.sub_menu {
  display: block;
  overflow-y: scroll;
}
img{
  width: 16px;
  height: 16px;
  margin-right: 8px;
  display: inline-block;
}
.sub_menu::-webkit-scrollbar {
  width: 0;
}
</style>