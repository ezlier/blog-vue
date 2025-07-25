<template>
  <div class="post-detail">
    <div class="header">
      <h1>{{ post.title || '无标题' }}</h1>
    </div>
    <div class="meta">
      <span>{{ formatDate(post.date) }}</span> | 
      <span>{{ wordCount }} 字</span>
    </div>
    <div class="content" v-html="compiledMarkdown"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { Buffer } from 'buffer'
window.Buffer = Buffer

const route = useRoute()
const post = ref({ content: '', title: '', date: '' })
const md = new MarkdownIt()

// 计算字数
const wordCount = computed(() => {
  const text = post.value.content || ''
  return text.replace(/\s/g, '').length
})

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

// 编译 Markdown
const compiledMarkdown = computed(() => {
  return md.render(post.value.content || '')
})

// 加载文章内容
onMounted(async () => {
  try {
    console.log(`加载文章: ${route.params.id}.md`)
    
    // 使用绝对路径
    const postFiles = import.meta.glob('@/posts/*.md', { 
      query: '?raw', 
      import: 'default', 
      eager: true 
    })
    
    const fileName = `${route.params.id}.md`
    const filePath = `/src/posts/${fileName}` // 匹配完整路径
    
    if (postFiles[filePath]) {
      const rawContent = postFiles[filePath]
      console.log(`找到文章: ${filePath}`)
      
      // 使用 gray-matter 解析
      const { data, content } = matter(rawContent)
      
      post.value = {
        ...data,
        content
      }
      
      console.log('文章内容加载完成')
    } else {
      console.error(`文章未找到: ${fileName}`)
      console.log('可用文章:', Object.keys(postFiles))
    }
  } catch (error) {
    console.error('加载文章出错:', error)
  }
})
</script>

<style scoped>
.header{
  height: 300px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.post-detail {
  padding-top: 100px;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  
}

.meta {
  color: #666;
  margin-bottom: 20px;
  font-size: 0.9em;
  
}

.content {
  line-height: 1.8;
  margin-top: 30px;
  background-color: white;
  padding: 40px;
}

.content >>> h1, 
.content >>> h2, 
.content >>> h3 {
  margin-top: 1.5em;
  margin-bottom: 0.8em;
}

.content >>> p {
  margin-bottom: 1em;
}

.content >>> img {
  max-width: 100%;
  border-radius: 4px;
  margin: 20px 0;
}


</style>