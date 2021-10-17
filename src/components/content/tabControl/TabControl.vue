<template>
  <div class="tab-control">
    <div v-for="item in titles">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    tutles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
   
<style>
</style>