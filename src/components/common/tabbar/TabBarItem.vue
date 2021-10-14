<template>
  <div class="tab-bar-item" @click="itemClicke">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>

    <!-- 再创建一个插槽，原来存放选中的图片 -->
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 父传子
  props: {
    path: String,
    // 动态改变颜色
    activeColor: {
      type: String,
      default: "#8fc67f",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      // 判断当前活跃的路由路径与path是否一致
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClicke() {
      // 跳转
      this.$router.replace(this.path);
    },
  },
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-style: 8px;
}
.tab-bar-item img {
  width: 22px;
  height: 22px;
  margin-top: 4px;
  vertical-align: middle;
  margin-bottom: 2px;
}
/* .active {
  color: #8fc67f;
} */
</style>