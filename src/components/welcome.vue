<template>
  <transition name="fade">
    <div class="welcome">
      <swiper :height="height + 'px'" dots-position="center" dots-class="swp-dots">
        <swiper-item>
          <div class="wel-img" :style="'background-image: url('+ require('../assets/wc0.jpg') +');'">
            <div class="wel-bt wel-bt-skip" @click="hideWelcome">跳过</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="wel-img" :style="'background-image: url('+ require('../assets/wc1.jpg') +');'">
            <div class="wel-bt wel-bt-skip" @click="hideWelcome">跳过</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="wel-img" :style="'background-image: url('+ require('../assets/wc2.jpg') +');'">
            <div class="wel-bt wel-bt-skip" @click="hideWelcome">跳过</div>
          </div>
        </swiper-item>
        <swiper-item>
          <div class="wel-img" :style="'background-image: url('+ require('../assets/wc3.jpg') +');'">
            <div class="wel-bt wel-bt-big" @click="hideWelcome">开启你的旅居时代</div>
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
  top: 60%;
  transform: translateX(-50%);
}
.wel-bt-skip{
  position: absolute;
  top: 6%;
  right: 8%;
}
.welcome .vux-slider .swp-dots{
  bottom: 50px;
}
</style>
