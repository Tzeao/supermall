<template>
  <div class="nav-bar">
    <div class="left">
      <solt name="left"></solt>
    </div>
    <div class="center">
      <solt name="center"></solt>
    </div>
    <div class="right">
      <solt name="right"></solt>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
.nav-bar {
  display: flex;
  line-height: 44px;
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>