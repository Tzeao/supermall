<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img src="~assets/img/tabbar/Home.png" slot="item-icon" alt="" />
      <!-- 放入选中的图片 -->
      <img src="~assets/img/tabbar/Home-H.png" slot="item-icon-active" alt="" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="~assets/img/tabbar/Class.png" slot="item-icon" alt="" />
      <img
        src="~assets/img/tabbar/Class-H.png"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img src="~assets/img/tabbar/Shopping.png" slot="item-icon" alt="" />
      <img
        src="~assets/img/tabbar/Shopping-H.png"
        slot="item-icon-active"
        alt=""
      />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img src="~assets/img/tabbar/Me.png" slot="item-icon" alt="" />
      <img src="~assets/img/tabbar/Me-H.png" slot="item-icon-active" alt="" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "common/tabbar/TabBar";
import TabBarItem from "common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>