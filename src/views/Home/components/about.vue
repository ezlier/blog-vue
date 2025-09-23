<script setup>
import head from '@/assets/img/head.jpg' 
import Clock from './clock.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAboutStore } from '@/stores/aboutStore';

// 使用 pinia
const aboutStore = useAboutStore();

const { postCount, tagCount, posts } = storeToRefs(aboutStore)

onMounted(() => {
  // 页面挂载时调用加载文章的接口
  aboutStore.loadPosts();
});
</script>

<template>
  <div class="page-container">
    <div class="content">
      <div class="card">
        <div class="avatar-container">
          <img :src='head' width="100" class="avatar" />
        </div>
        <h1 style="color: #f77;">Ezria</h1>
        <div class="stats">
          <div class="stat-item">
            <span class="stat-label">文章</span>
            <span class="stat-number">{{ postCount }}</span>
            
          </div>
          <div class="stat-item">
            <span class="stat-label">标签</span>
            <span class="stat-number">{{ tagCount }}</span>
            
          </div>
        </div>
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
  background-color: var(--bg-color);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 8px;
}

.clock-wrapper {
  width: 100%;
  margin-top: 20px;
}

.avatar-container {
  width: 100px;
  height: 100px;
  overflow: hidden; 
  border-radius: 50%;
  box-shadow: 0 0 15px 5px rgba(255, 0, 0, 0.2);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats {
  display: flex;
  margin-top: 10px;
  gap: 20px;
  color: #f77;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.stat-label {
  font-size: 0.8rem;
  
}
</style>