<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center">
        <tab-control
          :titles="titles"
          @tabClick="tabClick"
          :currentIndex="currentIndex"
          ref="test"
        />
      </div>
    </nav-bar>
  </div>
</template>

<script >
import NavBar from "common/navbar/NavBar";
import TabControl from "content/tabControl/TabControl";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
    TabControl,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    tabClick(index) {
      this.$emit("titleClick", index);
    },
    scrollY() {
      this.$refs.test.currntIndex = this.currentIndex;
       this.$refs.test.scrollYS();
    },
  },
};
</script>

<style scoped>
.back img {
  width: 18px;
  height: 18px;
  margin-top: 14px;
  text-align: center;
}
</style>