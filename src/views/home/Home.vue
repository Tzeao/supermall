<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行', '新款', '精选']" />
    <goods-list :goods="goods['pop'].list"/>
    <ul>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
      <li>sss</li>
    </ul>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import TabControl from "content/tabControl/TabControl";
import GoodsList from "content/goods/GoodsList"

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
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
  methods: {
    getHomeMultidata() {
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
      });
    },
  },
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: wheat;
  font-weight: bold;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 7;
}
</style>