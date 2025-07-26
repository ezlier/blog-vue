<template>
  <div class="post-detail">
    <div class="header">
      <h1>{{ post.title || '无标题' }}</h1>
    </div>
    <div class="row">
      <div class="leftcolumn">

      </div>
      <div class="rightcolumn">
        <div class="meta">
        <span>{{ formatDate(post.date) }}</span> | 
        <span>{{ wordCount }} 字</span>
      </div>
      <div class="content" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { Buffer } from 'buffer'
window.Buffer = Buffer
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'


const route = useRoute()
const post = ref({ content: '', title: '', date: '' })
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (__) {}
    }
    return '' // 使用默认的转义
  }
})

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
.row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  
  padding: 10px;
}

.leftcolumn {
  flex: 0 0 20%; /* 固定25%宽度 */
  /* background-color: #f1f1f1; */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
}

.rightcolumn {
  flex: 1;       /* 剩余空间 */
  /* background-color: #f1f1f1; */
  padding: 20px;
  min-width: 0;  /* 防止内容溢出 */
  width: 14000px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
}

.header{
  height: 300px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.post-detail {
  padding-top: 100px;
  /* max-width: 900px; */
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
  margin-top: 20px;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
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

.content >>> pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow: auto;
  margin: 20px 0;
  line-height: 1.45;
  position: relative;
}

.content >>> code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 0.9em;
}

.content >>> pre code {
  background-color: transparent;
  padding: 0;
  border-radius: 0;
  display: block;
}

/* 行内代码样式 */
.content >>> :not(pre) > code {
  background-color: rgba(175, 184, 193, 0.2);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  color: #e83e8c;
}

</style>