<script setup>
import head from '@/assets/img/head.jpg' 
import Clock from './clock.vue';
import { ref, onMounted, computed } from 'vue';
import matter from 'gray-matter';

const posts = ref([]);
const postCount = ref(0);
const tagCount = ref(0);

onMounted(async () => {
  try {
    const postFiles = import.meta.glob('@/posts/*.md', { 
      query: '?raw', 
      import: 'default', 
      eager: true 
    });
    
    for (const [path, rawContent] of Object.entries(postFiles)) {
      const fileName = path.split('/').pop();
      const id = fileName.replace('.md', '');
      const { data, content } = matter(rawContent);
      
      // 确保tags始终是数组
      let tags = [];
      if (data.tags) {
        tags = Array.isArray(data.tags) ? data.tags : [data.tags];
      }
      
      posts.value.push({
        id,
        title: data.title || '无标题',
        date: data.date ? new Date(data.date) : new Date(),
        tags: tags.filter(Boolean), // 过滤掉空值
      });
    }
    
    posts.value.sort((a, b) => b.date - a.date);
    postCount.value = posts.value.length;
    
    // 计算标签数量
    const allTags = computed(() => {
      const tags = new Set();
      posts.value.forEach(post => {
        post.tags?.forEach(tag => tags.add(tag));
      });
      return Array.from(tags);
    });
    
    tagCount.value = allTags.value.length;
    
  } catch (error) {
    console.error('加载文章失败:', error);
  }
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
  background-color: white;
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