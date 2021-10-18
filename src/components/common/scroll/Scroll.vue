<template>
  <div class="wrapper" ref="scroll">
    <div class="conter">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    proberType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.scroll, {
      mouseWheel: true,
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true,
      observeImage: true,
      probeType: this.proberType,
    });
    // 监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
      console.log("--");
    },
  },
};
</script>

<style>
</style>