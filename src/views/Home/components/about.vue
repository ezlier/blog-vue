<script setup>
import head from '@/assets/img/head.jpg' 
import Clock from './clock.vue';
</script>

<template>
  <div class="page-container">
    <div class="content">
      <div class="card">
        <div class="avatar-container">
          <img :src='head' width="100" class="avatar" />
        </div>
        <h1>name</h1>
        <p>11111</p>
      </div>
      <div class="clock-wrapper">
        <Clock />
      </div>
    </div>
    
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  
}

.content {
  flex: 1;
}

.card {
  background-color: white;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.clock-wrapper {
  width: 100%;
  margin-top: 20px; /* 仅通过 margin 控制与 card 的间距 */
}
.avatar-container {
  width: 100px;
  height: 100px;
  overflow: hidden; 
  border-radius: 50%;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>