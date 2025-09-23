<script setup>
import { RouterView } from 'vue-router';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import PointerTextTrail from '@/components/PointerTextTrail.vue';
import Returntop from '@/components/returntop.vue';
</script>

<template>
    <div class="bg"/>
    <PointerTextTrail class="texiao "/>
    
    <Nav />
    <main class="main-content">
        <router-view  />
    </main>
    <Footer />
    <Returntop/>
  
</template>

<style scoped>

.bg {
  position: fixed;         /* 固定在视口 */
  top: 0;
  left: 0;
  width: 100vw;            /* 拉伸占满全屏 */
  height: 100vh;
  background-image: url('@/assets/img/background.png');
  background-size: cover;  /* 拉伸裁剪为最大，保持比例 */
  background-repeat: no-repeat;
  background-position: center;
  z-index: -1;             /* 放到内容后面 */
}

.dark .bg{
  background-color: #222831;
  background-image: none;
}


@media (max-width: 1024px) {
  .texiao{
    display: none;
  }
}
</style>