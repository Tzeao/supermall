<template>
  <div class="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImage"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import { getDetail } from "network/detai";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImage:[]
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    this.iid = this.$route.params.id;

    // 获取数据
    getDetail(this.iid).then(res=>{
      this.topImage = res.result.itemInfo.topImages
    })
  },
};
</script>

<style>
</style>