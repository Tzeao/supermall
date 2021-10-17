<template>
  <div class="wrapper">
    <ul class="conter">
      <li>1*50</li>
      <li>2*50</li>
      <li>3*50</li>
      <li>4*50</li>
      <li>5*50</li>
      <li>6*50</li>
      <li>7*50</li>
      <li>8*50</li>
      <li>9*50</li>
      <li>10*50</li>
      <li>11*50</li>
      <li>12*50</li>
      <li>13*50</li>
      <li>14*50</li>
      <li>15*50</li>
      <li>16*50</li>
      <li>17*50</li>
      <li>18*50</li>
      <li>19*50</li>
      <li>20*50</li>
      <li>21*50</li>
      <li>22*50</li>
      <li>23*50</li>
      <li>24*50</li>
      <li>25*50</li>
      <li>26*50</li>
      <li>27*50</li>
      <li>28*50</li>
      <li>29*50</li>
      <li>30*50</li>
      <li>31*50</li>
      <li>32*50</li>
      <li>33*50</li>
      <li>34*50</li>
      <li>35*50</li>
      <li>36*50</li>
      <li>37*50</li>
      <li>38*50</li>
      <li>39*50</li>
      <li>40*50</li>
      <li>41*50</li>
      <li>42*50</li>
      <li>43*50</li>
      <li>44*50</li>
      <li>45*50</li>
      <li>46*50</li>
      <li>47*50</li>
      <li>48*50</li>
      <li>49*50</li>
      <li>50*50</li>
    </ul>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Cart",
  mounted() {
    // 需要传入一个滚动区域的父标签，也可以写个类名
    // new BScroll(".conter");
   const bscroll =  new BScroll(document.querySelector(".wrapper"), {
      mouseWheel: true,
      // 是否实时侦测 默认0不，1表示绝对不  2在滚动过程侦测，离开后的滚动不管 3就是全部侦测
      probeType: 3,
      click: true,
      pullUpLoad: true,
    }).on("pullingUp", (position) => {
      console.log("已经是最低了");
      // 调用这个函数 表示这次的上拉事件已经完成 解决只能调用一次的问题
      bscroll.finishPullUp()
    });
  },
};
</script>

<style>
.wrapper {
  height: 150px;
  background-color: red;
  overflow: hidden;
}
</style>