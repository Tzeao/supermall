<template>
  <div class="check-button" :class="{ active: isCheck }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #888;
}
.active {
  border-radius: 50%;
  background-color: red;
  border-color: red;
}
</style>