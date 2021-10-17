<template>
  <div class="wrapper" ref="scroll">
    <div class="conter">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Scroll",
  data(){
    return{
      scroll:null
    }
  },
  mounted () {
  
     this.scroll = new BScroll(this.$refs.scroll,{
       mouseWheel:true,
       pullUpLoad:true,
       click:true,
       observeDOM:true,
       observeImage:true
     })
  }
};
</script>

<style>
</style>