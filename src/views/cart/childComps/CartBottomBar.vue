<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-check="isSelectAll"
        class="check-button"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>

    <div class="calculate">去计算:({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "content/checkButton/CheckButton";
export default {
  name: "CartBottimBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.count * item.price;
          }, 0)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { //全部选中时，改为全部不选中
        this.$store.state.cartList.forEach((item) => (item.checked = false));
        console.log("4444");
      }else{
           this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #ccc;
  position: relative;
  line-height: 40px;
  display: flex;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  color: palevioletred;
  font-weight: bold;
  flex: 1;
}
.calculate {
  width: 90px;
  color: burlywood;
  background-color: brown;
  text-align: center;
}
</style>