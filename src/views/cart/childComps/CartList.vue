<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :itemInfo="item"
        :key="index"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "common/scroll/Scroll";

import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  // 因为添加完数据scroll不知道我们添加数据了，所以要人为重新计算
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>