<template>
  <div class="post-container">
    <article class="post-content">
      <h1>{{ post?.frontmatter.title }}</h1>
      <div class="post-meta">
        <span>{{ formatDate(post?.frontmatter.date) }}</span>
        <span>{{ countWords(post?.content) }}字</span>
      </div>
      <img 
        v-if="post?.frontmatter.cover" 
        :src="post.frontmatter.cover" 
        class="post-cover"
      >
      <div class="markdown-body" v-html="post?.content"></div>
    </article>
    <router-link to="/" class="back-button">← 返回列表</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const post = ref(null)

onMounted(async () => {
  try {
    const module = await import(`../posts/${route.params.slug}.md`)
    post.value = {
      content: module.default.render().html,
      frontmatter: module.default.frontmatter
    }
  } catch (e) {
    console.error('加载文章失败:', e)
  }
})

const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString('zh-CN') : ''
const countWords = (content) => content ? Math.ceil(content.replace(/<[^>]*>/g, '').length / 300) : 0
</script>

<style scoped>
.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

.post-content {
  background: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.post-meta {
  color: #666;
  margin: 10px 0 20px;
  display: flex;
  gap: 15px;
}

.post-cover {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 4px;
}

.back-button {
  display: inline-block;
  margin-top: 30px;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
}

.markdown-body {
  line-height: 1.8;
}
</style>

<style>
/* 全局Markdown样式 */
.markdown-body h1 {
  font-size: 1.8em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin: 1em 0 0.8em;
}

.markdown-body img {
  max-width: 100%;
}
</style>