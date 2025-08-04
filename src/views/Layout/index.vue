<script setup>
import { RouterView } from 'vue-router';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import PointerTextTrail from '@/components/PointerTextTrail.vue';
import Returntop from '@/components/returntop.vue';
</script>

<template>
  
    <PointerTextTrail class="texiao"/>
    <Nav />
    <main class="main-content">
        <router-view  />
    </main>
    <Footer />
    <Returntop/>
  
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.main-content {
  flex: 1 ; 
  
}

@media (max-width: 1024px) {
  .texiao{
    display: none;
  }
}
</style>