<template>
  <div>
    <nav-bar class="nav">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";

// 可以把函数直接转为计算属性
import {mapGetters} from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
  },
  computed:{
    // 语法 写成数组表示一一对应 写成对象表示名字不一样
   ...mapGetters(['cartLength'])
  }
};
</script >

<style scoped>
.nav{
 background-color: var(--color-tint); 
 color: wheat;
 font-weight: bold;
}
</style>