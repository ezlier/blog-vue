<script setup>
import { RouterView } from 'vue-router';
import Nav from './components/Nav.vue';
import Footer from './components/Footer.vue';
import PointerTextTrail from '@/components/PointerTextTrail.vue';
</script>

<template>
    <PointerTextTrail />
    <Nav />
    <router-view  />
    <Footer />
    
</template>

<style scoped>


</style>