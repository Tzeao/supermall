<template>
  <div class="car">
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <cart-list/>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

import CartList from './childComps/CartList'

// 可以把函数直接转为计算属性
import {mapGetters} from 'vuex'


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList
  },
  computed:{
    // 语法 写成数组表示一一对应 写成对象表示名字不一样
   ...mapGetters(['cartLength'])
  }
};
</script >

<style scoped>
.car{
  height: 100vh;
}
.nav{
 background-color: var(--color-tint); 
 color: wheat;
 font-weight: bold;
}
</style>