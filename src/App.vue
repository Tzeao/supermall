<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar v-show="$route.meta.showNavBar"/>
  </div>
</template>
<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

export default {
  name: "APP",
  components: {
    MainTabBar,
  },
};
</script>
  
<style>
@import "assets/css/baes.css";
/* body{
  overflow:hidden
} */
</style>
