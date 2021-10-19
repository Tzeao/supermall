<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content">
      <detail-swiper :topImages="topImage" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

import Scroll from "common/scroll/Scroll";

import { getDetail, GoodsInfo, Shop } from "network/detai";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
  created() {
    this.iid = this.$route.params.id;

    // 获取商品数据
    getDetail(this.iid).then((res) => {
      this.topImage = res.result.itemInfo.topImages;
      const data = res.result;
      // 获取商品信息
      this.goods = new GoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      console.log(this.goods);
      // 创建商家信息对象，
      this.shop = new Shop(data.shopInfo);
    });
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>