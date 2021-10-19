<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImage" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageload="imageload" />
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

import Scroll from "common/scroll/Scroll";

import { getDetail, GoodsInfo, Shop, GoodsParam } from "network/detai";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImage: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo
  },
  methods: {
    imageload() {
      this.$refs.scroll.refresh();
    },
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

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
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