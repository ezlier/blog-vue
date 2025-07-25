<script setup>
import { RouterView } from 'vue-router';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  
    <Nav />
    <router-view  />
    <Footer />
  
</template>

<style scoped>


</style>