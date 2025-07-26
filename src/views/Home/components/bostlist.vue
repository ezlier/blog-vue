<template>
  <div class="card-container">
    <div 
      v-for="post in posts" 
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
        <img v-if="post.image" :src="post.image" alt="封面图">
        <div v-else class="default-image">
          <span>暂无图片</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Buffer } from 'buffer'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import matter from 'gray-matter'

const router = useRouter()
const posts = ref([])

window.Buffer = Buffer
// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '无日期'
  try {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString // 返回原始字符串
  }
}

// 跳转到文章详情页
const goToPost = (id) => {
  router.push({ name: 'PostDetail', params: { id } })
}

// 加载并解析所有 Markdown 文件
onMounted(async () => {
  try {
    console.log('开始加载文章...')
    
    // 使用绝对路径 - 从项目根目录开始
    const postFiles = import.meta.glob('@/posts/*.md', { 
      query: '?raw', 
      import: 'default', 
      eager: true 
    })
    
    console.log('找到的Markdown文件:', Object.keys(postFiles))
    
    for (const [path, rawContent] of Object.entries(postFiles)) {
      console.log('处理文件:', path)
      
      // 解析文件名作为 ID
      const fileName = path.split('/').pop()
      const id = fileName.replace('.md', '')
      
      console.log('文件内容预览:', rawContent.substring(0, 100) + '...')
      
      // 使用 gray-matter 解析 Front Matter 和内容
      const { data, content } = matter(rawContent)
      
      console.log('解析的Front Matter:', data)
      
      // 计算字数
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
    
    // 按日期排序（最新在前）
    posts.value.sort((a, b) => new Date(b.date) - new Date(a.date))
    
    console.log('加载完成，文章列表:', posts.value)
  } catch (error) {
    console.error('加载文章列表出错:', error)
  }
})
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.card {
  background-color: white;
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
  /* padding: 20px; */
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

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>