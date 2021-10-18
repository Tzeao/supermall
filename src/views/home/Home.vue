<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- 拿到组件对象 -->
    <scroll
      class="conter"
      ref="scroll"
      :prober-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="contenPullingUp"
    >
      <home-swiper :banner="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import Scroll from "common/scroll/Scroll";
import NavBar from "common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList";
import BackTop from "common/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      isShow: false,
      currentType: "pop",
    };
  },
  created() {
    // 抽取出来，防止业务代码太多
    // 1. 请求多个数据
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 500);
    // 监听事件总线发过来的是否图片加载的方法
    this.$bus.$on("imageLoad", () => {
      refresh();
      // 重新计算可滚动区域，防止出现卡顿
    });
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      // 拿到better-scroll实例，调用返回顶部方法
      this.$refs.scroll.scroll &&
        this.$refs.scroll.scroll.scrollTo &&
        this.$refs.scroll.scroll.scrollTo(0, 0, 1500);
    },
    // 小图标显示-隐藏
    contentScroll(position) {
      this.isShow = -position.y > 1000;
    },

    // 上拉加载
    contenPullingUp() {
      this.getHomeGoods(this.currentType);
    },

    // 防抖动
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    /*
    网络请求的方法
    */ getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // 把的到的数据加到数组里面
        this.goods[type].list.push(...res.data.list);
        // 每调用一次这个方法就给页数加一
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: wheat;
  font-weight: bold;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.tab-control {
  /* position: relative;
  z-index: 9; */
  position: sticky;
  top: 44px;
  z-index: 10;
}
.conter {
  /*height: calc(100% - 50px);*/
  /*overflow: hidden;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>