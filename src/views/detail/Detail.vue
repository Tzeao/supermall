<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detail" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :topImages="topImage" />
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageload="imageload" />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommend" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top @click.native="backClick" v-show="isShow" />
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DeatilBottomBar";

import Scroll from "common/scroll/Scroll";
import GoodsList from "content/goods/GoodsList";
import Toast from "common/toast/Toast";

import { itemListenerMixin } from "commonutil/mixin";
import { debounce } from "commonutil/util";

import BackTop from "common/backTop/BackTop";
import {
  getDetail,
  GoodsInfo,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detai";

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
      commentInfo: {},
      recommend: [],
      themTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShow: false,
      // message: "",
      // show: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast,
  },
  mixins: [itemListenerMixin],
  methods: {
    imageload() {
      this.$refs.scroll.refresh();

      // 在这里可以准确获取
      this.getThemeTopY();
    },
    // 监听页面滚动
    contentScroll(position) {
      // 1. 获取Y值
      const positionY = -position.y;

      //  与页面固定内容位置进行对比
      for (let i in this.themTopYs) {
        // 要先判断currentIndex是否与i一致，这样就可以减少持续打印
        if (
          (this.currentIndex !== i &&
            i < this.themTopYs.length - 1 &&
            positionY >= this.themTopYs[parseInt(i)] &&
            positionY < this.themTopYs[parseInt(i) + 1]) ||
          (i == this.themTopYs.length - 1 &&
            positionY >= this.themTopYs[parseInt(i)])
        ) {
          this.currentIndex = i;
          // 给导航栏传递数值
          setTimeout(() => {
            this.$refs.detail.currentIndex = parseInt(this.currentIndex);
          }, 200);
        }

        // 返回顶部图标
        // 小图标显示-隐藏

        this.isShow = -position.y > 1000;
      }
    },
    titleClick(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.scroll.scrollTo(0, -this.themTopYs[0], 300);
          break;
        case 1:
          this.$refs.scroll.scroll.scrollTo(0, -this.themTopYs[1], 100);
          break;
        case 2:
          this.$refs.scroll.scroll.scrollTo(0, -this.themTopYs[2], 200);
          break;
        case 3:
          this.$refs.scroll.scroll.scrollTo(0, -this.themTopYs[3], 250);
          break;
      }
    },
    backClick() {
      // 拿到better-scroll实例，调用返回顶部方法
      this.$refs.scroll.scroll &&
        this.$refs.scroll.scroll.scrollTo &&
        this.$refs.scroll.scroll.scrollTo(0, 0, 1500);
    },

    // 添加购物车
    addToCart() {
      // 获取要在购物车展示的信息
      const product = {};
      product.image = this.topImage[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 添加到购物车
      // this.$store.commit("addCart", product);
      this.$store.dispatch("addCart", product).then((res) => {
        //  添加成功弹窗
        //  普通方法
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1500);

        // 插件
        console.log(this.$toast);
        this.$toast.Show(res, 2000);
  
      });
    },
  },

  // // 通过updated函数可以保住$el在渲染完成后才调用 ，因为渲染完成后会调用这个函数
  // updated() {
  //   this.themTopYs = [];
  //   this.themTopYs.push(0);
  //   this.themTopYs.push(this.$refs.params.$el.offsetTop);
  //   this.themTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themTopYs.push(this.$refs.recommends.$el.offsetTop);
  //   console.log(this.themTopYs);
  // },
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

      // 创建商家信息对象，
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      this.recommend = res.data.list;
    });

    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themTopYs = [];
      this.themTopYs.push(0);
      this.themTopYs.push(this.$refs.params.$el.offsetTop - 50);
      this.themTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themTopYs.push(this.$refs.recommends.$el.offsetTop - 50);
      console.log(this.themTopYs);
    }, 100);
    // 渲染完成后，进行回调，可以实时更新     但是这样获取到数据是不对的，或是根本获取不到
    // this.$nextTick(() => {
    //   this.themTopYs = [];
    //   this.themTopYs.push(0);
    //   this.themTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themTopYs.push(this.$refs.recommends.$el.offsetTop);
    //   console.log(this.$refs.params.$el);
    // });
  },
  mounted() {},
  // 取消全局监听
  destroyed() {
    this.$bus.$off("imageLoad", this.itemImageListener);
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
  height: calc(100% - 44px - 49px);
}
</style>