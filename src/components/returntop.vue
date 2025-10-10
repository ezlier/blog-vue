<template>
  <transition name="fade">
    <div 
      v-show="visible" 
      class="back-to-top" 
      @click="scrollToTop"
      :style="{ bottom: bottom + 'px', right: right + 'px' }"
    >
      <slot>
        <div class="default-btn"><img :src="icon" alt=""></div>
      </slot>
    </div>
  </transition>
</template>

<script>
import icon from '@/assets/img/icon/huidaodingbu.png'
export default {
  name: 'BackToTop',
  props: {
    // 滚动多少距离后显示按钮
    visibilityHeight: {
      type: Number,
      default: 400
    },
    // 距离底部距离
    bottom: {
      type: Number,
      default: 40
    },
    // 距离右侧距离
    right: {
      type: Number,
      default: 40
    },
    
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      visible: false,
      interval: null
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {
      this.visible = window.pageYOffset > this.visibilityHeight
    },
    scrollToTop() {
      const start = window.pageYOffset
      const startTime = Date.now()
      
      const animateScroll = () => {
        const now = Date.now()
        const time = Math.min(1, (now - startTime) / this.duration)
        const easing = time * (2 - time) // 缓动函数
        
        window.scrollTo(0, start * (1 - easing))
        
        if (window.pageYOffset > 0) {
          requestAnimationFrame(animateScroll)
        }
      }
      
      animateScroll()
    }
  }
}
</script>

<style scoped>
.back-to-top {
  position: fixed;
  cursor: pointer;
  z-index: 1000;
}

.default-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #aa96da;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.default-btn:hover {
  background-color: #a8d8ea;
  transform: scale(1.1);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>