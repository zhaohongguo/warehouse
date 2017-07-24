<template>
  <!-- 页面主体开始 -->
  <div>
  <div class="swiper-container lunbo" id="slide1">
      <div class="swiper-wrapper">
          <div class="swiper-slide slide2"></div>
          <div class="swiper-slide slide3"></div>
          <div class="swiper-slide slide4"></div>
      </div>
      <div class="swiper-pagination"></div>
  </div>

  <div id=main>
    <div class="nav-center">
      <div class="cake">
        <img src="static/images/tuijian.jpg">
        <p>推荐</p>
      </div>
      <div class="cake">
        <img src="static/images/birthday.jpg">
        <p>生日专区</p>
      </div>
      <div class="cake">
        <a href="#/list"><img src="static/images/cake.png"></a>
        <p>蛋糕</p>
      </div>
      <div class="cake">
        <img src="static/images/ice.png">
        <p>下午茶</p>
      </div>
      <div class="cake">
        <img src="static/images/gift.png">
        <p>设计师礼物</p>
      </div>
    </div>
    <!-- 广告部分开始 -->
    <div direc></div> 
    <div class="swiper-container banner">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img class="ani" swiper-animate-effect="fadeInLeft" swiper-animate-duration="0.8s" swiper-animate-delay="0.8s" src="static/images/banner1.jpg">
          <img  class="ani tu2" swiper-animate-effect="fadeInRight" swiper-animate-duration="0.8s" swiper-animate-delay="1.3s" src="static/images/banner2.jpg">
          <img  class="ani tu3" swiper-animate-effect="fadeInLeft" swiper-animate-duration="0.8s" swiper-animate-delay="2.1s" src="static/images/banner3.jpg">
          <img  class="ani tu4" swiper-animate-effect="fadeInRight" swiper-animate-duration="0.8s" swiper-animate-delay="2.9s" src="static/images/banner4.jpg">
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import "../../static/js/swiper.min.js"
import "../../static/js/swiper.animate1.0.2.min.js"
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    var mySwiper = new Swiper ('.lunbo', {
              loop: true,
            pagination:'.swiper-pagination',
            speed:2000,
            autoplay:2000,
            autoplayDisableOnInteraction:false 
          });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*加分号*/
@import "../../static/css/swiper.min.css";
@import "../../static/css/animate.min.css";

</style>
