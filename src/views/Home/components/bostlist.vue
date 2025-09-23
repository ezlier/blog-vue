<template>
  <div class="card-container">
    <div 
      v-for="post in visiblePosts" 
      :key="post.id"
      class="card"
      @click="goToPost(post.id)"
    >
      <h2>{{ post.title || '无标题' }}</h2>
      <h5>
        {{ formatDate(post.date) }} | 
        {{ post.wordCount }} 字
      </h5>
      <div class="fakeimg" style="height:200px;">
        <img v-if="post.image" :src="post.image" alt="封面图" loading="lazy">
        <div v-else class="default-image">
          <span>暂无图片</span>
        </div>
      </div>
    </div>
    
    <!-- 加载状态指示器 -->
    <div v-if="isLoading" class="loading-indicator">
      加载中...
    </div>
    
    <!-- 底部观察元素 - 确保在视图中 -->
    <div ref="bottomObserver" style="height: 1px;"></div>
  </div>
</template>

<script setup>
import { Buffer } from 'buffer'
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import matter from 'gray-matter'

const router = useRouter()
const posts = ref([])
const visibleCount = ref(6)
const isLoading = ref(false)
const bottomObserver = ref(null)
let observer = null

window.Buffer = Buffer

const visiblePosts = computed(() => {
  return posts.value.slice(0, visibleCount.value)
})

const hasMorePosts = computed(() => {
  return visibleCount.value < posts.value.length
})

const formatDate = (dateString) => {
  if (!dateString) return '无日期'
  try {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

const goToPost = (id) => {
  router.push({ name: 'PostDetail', params: { id } })
}

const loadMore = () => {
  if (isLoading.value || !hasMorePosts.value) return
  
  isLoading.value = true
  setTimeout(() => {
    visibleCount.value += 6
    isLoading.value = false
  }, 500)
}

const initObserver = () => {
  if (observer) return
  
  observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries
      if (entry.isIntersecting && hasMorePosts.value) {
        loadMore()
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    }
  )

  if (bottomObserver.value) {
    observer.observe(bottomObserver.value)
  }
}

onMounted(async () => {
  try {
    posts.value = [] 
    const postFiles = import.meta.glob('@/posts/*.md', { 
      query: '?raw', 
      import: 'default', 
      eager: true 
    })
    
    for (const [path, rawContent] of Object.entries(postFiles)) {
      const fileName = path.split('/').pop()
      const id = fileName.replace('.md', '')
      const { data, content } = matter(rawContent)
      
      const wordCount = content.replace(/\s/g, '').length
      let imagePath = data.image
      if (imagePath && imagePath.startsWith('@assets')) {
        imagePath = imagePath.replace('@assets', '/src/assets')
      }
      
      posts.value.push({
        id,
        title: data.title || '无标题',
        date: data.date,
        image: imagePath,
        wordCount
      })
    }
    
    posts.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    setTimeout(initObserver, 100)
    
  } catch (error) {
    console.error('加载文章失败:', error)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(300px, 1fr));
  gap: 20px;
  padding-bottom: 20px;
  position: relative;
}

.card {
  background-color: var(--bg-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.fakeimg {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f5f5f5;
  border-radius:8px;
}

.fakeimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.default-image {
  color: #999;
  font-size: 16px;
}

.loading-indicator {
  grid-column: 1 / -1;
  text-align: center;
  padding: 20px;
  color: #666;
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: 1fr;
  }
}
</style>