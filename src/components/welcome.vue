<template>
  <transition name="fade">
    <div class="welcome">
      <swiper :height="height + 'px'" dots-position="center" dots-class="swp-dots">
        <swiper-item>
          <div class="wel-img" :style="'background-image: url('+ require('../assets/wc0.png') +');'">
            <div class="wel-bt wel-bt-skip" @click="hideWelcome">跳过</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="wel-img" :style="'background-image: url('+ require('../assets/wc1.png') +');'">
            <div class="wel-bt wel-bt-skip" @click="hideWelcome">跳过</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="wel-img" :style="'background-image: url('+ require('../assets/wc2.png') +');'">
            <div class="wel-bt wel-bt-big" @click="hideWelcome">开启全新体验</div>
          </div>
        </swiper-item>
      </swiper>
    </div>
  </transition>
</template>
<script>
import {SwiperItem} from 'vux'
export default {
  data() {
    return {
      height: screen.availHeight
    }
  },
  components: {SwiperItem},
  methods: {
    hideWelcome() {
      localStorage.setItem('welcomeflag', 1)
      this.$emit('hideWelcome')
    }
  }
}
</script>
<style>
.welcome{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 501;
  top: 0;
}
.wel-img{
  height: 100%;
  width: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
}
.wel-bt {
  color: #007F42;
  font-size: 13px;
  border: 1px solid;
  display: inline-block;
  border-radius: .3em;
  padding: 5px 1em;
  white-space: nowrap;
}
.wel-bt-big {
  font-size: 18px;
  font-weight: 500;
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translateX(-50%);
  background: #FBD43A;
  color: #fff;
  border-radius: 50px;
  padding: 10px 30px;
}
.wel-bt-skip{
  position: absolute;
  top: 6%;
  right: 8%;
}
.welcome .vux-slider .swp-dots{
  bottom: 30px;
}
.welcome .vux-slider > .vux-indicator > a > .vux-icon-dot.active{
  background-color: #fff;
}
.welcome .vux-slider > .vux-indicator > a > .vux-icon-dot{
  background: transparent;
  border: 1px solid #fff;
  border-radius: 50%;
}
</style>
