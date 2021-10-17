<template>
  <div id="app">
    <router-view></router-view>
    <main-tab-bar />
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
