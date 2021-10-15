<template>
  <div id="app">
    <main-tab-bar/>
    <router-view></router-view>
  </div>
</template>
<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'

export default {
  name:'APP',
  components: {
    MainTabBar
  }
}
</script>
  
<style>
@import "assets/css/baes.css";
</style>
