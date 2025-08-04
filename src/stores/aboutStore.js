// stores/aboutStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import matter from 'gray-matter'

export const useAboutStore = defineStore('about', () => {
  const postCount = ref(0)
  const tagCount = ref(0)
  const posts = ref([])
  
  const loadPosts = async () => {
    try {
      const postFiles = import.meta.glob('@/posts/*.md', { 
        query: '?raw', 
        import: 'default', 
        eager: true 
      })
      
      for (const [path, rawContent] of Object.entries(postFiles)) {
        const fileName = path.split('/').pop()
        const id = fileName.replace('.md', '')
        const { data } = matter(rawContent)
        
        let tags = []
        if (data.tags) {
          tags = Array.isArray(data.tags) ? data.tags : [data.tags]
        }
        
        posts.value.push({
          id,
          title: data.title || '无标题',
          date: data.date ? new Date(data.date) : new Date(),
          tags: tags.filter(Boolean)
        })
      }
      
      // 按日期排序
      posts.value.sort((a, b) => b.date - a.date)
      postCount.value = posts.value.length
      
      // 计算不重复的标签数量
      const uniqueTags = new Set()
      posts.value.forEach(post => {
        post.tags?.forEach(tag => uniqueTags.add(tag))
      })
      tagCount.value = uniqueTags.size
      
    } catch (error) {
      console.error('加载文章失败:', error)
    }
  }

  return { postCount, tagCount, posts, loadPosts }
})