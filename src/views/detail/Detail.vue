<template>
  <h1>详情</h1>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
    };
  },
  created() {
    this.iid = this.$route.params.id;
  },
};
</script>

<style>
</style>