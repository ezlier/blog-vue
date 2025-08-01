<script setup>
import { RouterLink } from 'vue-router';
import icon from '@/assets/img/icon1.png'
</script>

<template>
  <nav class="navbar">
    <img :src="icon" width="100" />
    <ul class="nav-links">
      <li>
        <router-link to="/" exact-active-class="active">首页</router-link>
      </li>
      <li>
        <router-link to="/file" exact-active-class="active">归档</router-link>
      </li>
      
      <li>
        <router-link to="/about" exact-active-class="active">关于</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  font-family: 'ziti1';
  position: fixed;
  top: 0px; 
  left: 20px;     /* 距离左侧20px */
  right: 20px;    /* 距离右侧20px */
  padding: 5px 40px;
  background: rgba(221, 221, 221, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 0 0 8px 8px;  
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;  /* 水平居中 */
  max-width: calc(100% - 40px); /* 防止宽度溢出 */
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-links li a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-links li a:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.nav-links li a.active {
  font-weight: bold;
  background-color: rgba(142, 140, 216, 0.7);
}


</style>