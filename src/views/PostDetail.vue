<template>
  <div class="post-detail">
    <div class="header">
      <h1 style="font-weight: 700;">{{ post.title || '无标题' }}</h1>
    </div>
    <div class="row">

      <!-- 桌面目录 -->
      <div class="leftcolumn">
        <div class="toc-container" v-if="headings.length > 0">
          <div class="toc-title">文章目录</div>
          <ul class="toc-list">
            <li v-for="(heading, index) in headings" :key="index" 
                :class="['toc-item', `toc-level-${heading.level}`]">
              <a @click="scrollToHeading(heading.id)">{{ heading.text }}</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- 文章 -->
      <div class="rightcolumn">
        <div class="meta">
          <img :src="shijianicon" style="height: 15px;;">
          <span>{{ formatDate(post.date) }}</span> | 
          <span>{{ wordCount }} 字</span>
        </div>
      <div class="content" v-html="compiledMarkdown"></div>
      </div>

      <!-- 移动端按钮 -->
    <button v-if="headings.length > 0" class="toc-fab" @click="showDrawer = true">📑</button>

    <!-- 抽屉 -->
    <transition name="slide-up">
      <div class="toc-drawer" v-if="showDrawer">
        <div class="toc-drawer-header">
          <span>文章目录</span>
          <button class="close-btn" @click="showDrawer = false">×</button>
        </div>
        <ul class="toc-list">
          <li v-for="(heading, index) in headings" :key="index"
              :class="['toc-item', `toc-level-${heading.level}`]">
            <a @click="scrollToHeading(heading.id); showDrawer = false">{{ heading.text }}</a>
          </li>
        </ul>
      </div>
    </transition>


    </div>
  </div>
</template>

<script setup>
import shijianicon from '@/assets/img/icon/shijian.png'
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'
import { Buffer } from 'buffer'
window.Buffer = Buffer
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'



const showDrawer = ref(false)
const route = useRoute()
const post = ref({ content: '', title: '', date: '' })
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const code = hljs.highlight(str, { language: lang }).value
        return `<pre data-lang="${lang}"><code class="hljs ${lang}">${code}</code></pre>`
      } catch (__) {}
    }
    return `<pre><code>${md.utils.escapeHtml(str)}</code></pre>`
  }
})


const headings = ref([])

const generateSlug = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

const extractHeadings = () => {

  const contentEl = document.querySelector('.content');
  if (!contentEl) return [];
  
  const headingElements = contentEl.querySelectorAll('h1, h2, h3');
  const result = [];
  
  headingElements.forEach((el, index) => {

    let id = el.id || generateSlug(el.textContent);
    
    let uniqueId = id;
    let counter = 1;
    while (document.getElementById(uniqueId)) {
      uniqueId = `${id}-${counter++}`;
    }
    
    el.id = uniqueId;
    
    result.push({
      id: uniqueId,
      text: el.textContent,
      level: parseInt(el.tagName.substring(1))
    });
  });
  
  return result;
};

const scrollToHeading = (id) => {
  nextTick(() => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      
      element.classList.add('highlight-scroll-target');
      setTimeout(() => {
        element.classList.remove('highlight-scroll-target');
      }, 2000);
    } else {
      console.error(`跳转失败: 未找到 #${id}`, 
        `现有标题IDs:`, [...document.querySelectorAll('[id^="heading"]')].map(el => el.id));
    }
  });
};

const wordCount = computed(() => {
  const text = post.value.content || ''
  return text.replace(/\s/g, '').length
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

const compiledMarkdown = computed(() => {
  const html = md.render(post.value.content || '');
  
  nextTick(() => {
    headings.value = extractHeadings();
  });
  
  return html;
});

onMounted(async () => {
  try {
    const postFiles = import.meta.glob('@/posts/*.md', { 
      query: '?raw', 
      import: 'default', 
      eager: true 
    })
    
    const fileName = `${route.params.id}.md`
    const filePath = `/src/posts/${fileName}`
    
    if (postFiles[filePath]) {
      const rawContent = postFiles[filePath]
      console.log(`找到文章: ${filePath}`)
      
      const { data, content } = matter(rawContent)
      
      post.value = {
        ...data,
        content
      }
      
      
    } else {
      
    }
  } catch (error) {
    
  }
})

watch(() => post.value.content, () => {
  nextTick(extractHeadings);
});
</script>

<style scoped>
.row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1280px;
  padding: 10px;
  margin: 0 auto;
}

.leftcolumn {
  flex: 0 0 20%;
  /* background-color: #f1f1f1; */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
}

.rightcolumn {
  flex: 1;
  /* background-color: #f1f1f1; */
  padding: 20px;
  min-width: 0;
  /* width: 14000px; */
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
}

.header{
  height: 300px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  color: #8785a2;
  
}

.post-detail {
  /* padding-top: 100px; */
  /* max-width: 900px; */
  margin: 0 auto;
  /* padding: 20px; */
  
}

.meta {
  color: black;
  margin-bottom: 20px;
  font-size: 0.9em;
  display: inline-block; 
  background-color: #fcbad3; 
  padding: 4px 8px; 
  border-radius: 14px;
  font-weight:bold;
}

.content {
  line-height: 1.8;
  /* margin-top: 20px; */
  background-color: var(--bg-color);
  padding: 40px;
  border-radius: 8px;
  min-height: 400px;
}

.content >>> h1,
.content >>> h2,
.content >>> h3,
.content >>> h4,
.content >>> h5,
.content >>> h6 {
  position: relative;
  scroll-margin-top: 80px;
}


.content >>> p {
  margin-bottom: 1em;
}

.content >>> img {
  max-width: 100%;
  border-radius: 4px;
  margin: 20px 0;
}

/* 代码块整体容器 */
.content >>> pre {
  position: relative;
  background-color: var(--bg-color);
  color: #d4d4d4;
  border-radius: 8px;
  padding-top: 32px; /* 预留顶部空间放语言标签和圆点 */
  padding: 16px;
  overflow-x: auto;
  margin: 20px 0;
  font-size: 0.9em;
  line-height: 1.6;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* 顶部工具栏（语言+圆点） */
.content >>> pre::before {
  content: attr(data-lang); /* 用 attr(data-lang) 显示语言 */
  position: absolute;
  top: 3px;
  left: 100px;
  font-size: 1em;
  color: #aaa;
  font-family: sans-serif;
}

/* 左上角三个圆点 */
.content >>> pre::after {
  content: "● ● ●";
  position: absolute;
  top: 6px;
  left: 10px;
  font-size: 1em;
  letter-spacing: 2px;
  color: #ff5f56; /* 红黄绿组合 */
}
.content >>> pre::after {
  background: linear-gradient(90deg, #FFCCCC 0, #FFFF99 33%, #CCCCFF 66%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 内部代码 */
.content >>> pre code {
  background: none !important;
  padding-top: 10px;
  font-family: "Fira Code", Consolas, monospace;
  font-size: 1em;
  display: block;
  white-space: pre;
}

.content >>> pre code .hljs-comment {
  font-family: "LXGW WenKai Mono", "Source Han Serif SC", "SimSun", monospace;
  color: #7d7d7d;        
  font-size: 1em;      
  opacity: 0.9;           
  font-style: normal !important;
}

.toc-container {
  position: sticky;
  top: 20px;
  background: var(--bg-color);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.toc-title {
  font-weight: bold;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  padding: 5px 0;
  line-height: 1.4;
}

.toc-item a {
  /* color: #333; */
  text-decoration: none;
  cursor: pointer;
  display: block;
  transition: all 0.2s;
  padding: 4px 8px;
  border-radius: 4px;
}

.toc-item a:hover {
  color: rgba(142, 140, 216, 0.7);
  background-color: #f5f5f5;
}

.toc-item a:active {
  transform: translateY(1px);
}

.toc-level-2 { padding-left: 15px; }
.toc-level-3 { padding-left: 30px; }
.toc-level-4 { padding-left: 45px; }
.toc-level-5 { padding-left: 60px; }
.toc-level-6 { padding-left: 75px; }

.content >>> .highlight-scroll-target {
  animation: highlight 2s ease;
}

/* 表格整体样式 */
.content >>> table {
  display: block;
  width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 0.95em;
  background-color: var(--bg-color);
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* 表头 */
.content >>> thead {
  background-color: #fcbad3;
  color: #333;
  text-align: left;
  font-weight: bold;
}

.content >>> th,
.content >>> td {
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  line-height: 1.6;
}

/* 隔行换色 */
.content >>> tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* hover 高亮 */
.content >>> tbody tr:hover {
  background-color: rgba(142, 140, 216, 0.1);
  transition: background 0.2s ease;
}

/* 单元格内代码 */
.content >>> td code {
  background: rgba(175, 184, 193, 0.15);
  padding: 2px 4px;
  border-radius: 3px;
  color: #e83e8c;
  font-size: 0.85em;
}

.dark .content >>> table {
  background-color: #1e1e1e; /* 整体深色背景 */
  box-shadow: 0 2px 6px rgba(0,0,0,0.4);
}

.dark .content >>> thead {
  background-color: #333; /* 表头深灰 */
  color: #fcbad3;         /* 保留粉色文字 */
}

.dark .content >>> th,
.dark .content >>> td {
  border: 1px solid #444; /* 边框深色 */
  color: #ddd;            /* 字体浅灰 */
}

.dark .content >>> tbody tr:nth-child(even) {
  background-color: #2a2a2a; /* 偶数行深灰 */
}

.dark .content >>> tbody tr:hover {
  background-color: rgba(142, 140, 216, 0.2); /* hover 颜色更明显 */
}

.dark .content >>> td code {
  background: rgba(255, 255, 255, 0.1);
  color: #ff99cc; /* 夜间代码高亮粉色 */
}


.desktop-toc {
  display: block;
}

.toc-fab {
  display: none;
}

/* 抽屉容器 */
.toc-drawer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 60vh;
  background: var(--bg-color);
  border-radius: 12px 12px 0 0;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
  padding: 16px;
  z-index: 1001;
  overflow-y: auto;
}

/* 抽屉头部 */
.toc-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

/* 动画 */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}



@keyframes highlight {
  0% { background-color: rgba(255, 235, 59, 0.5); }
  100% { background-color: transparent; }
}

.content {
  position: relative;
}

@media (max-width: 768px) {

  /* 悬浮按钮 */
.toc-fab {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 100px;
  right: 40px;
  background-color: #8e8cd8;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 1000;
  transition: background 0.3s;
}

.toc-fab:hover {
  background-color: #6c69c7;
}

  .desktop-toc {
    display: none;
  }

  .content >>> table {
    font-size: 0.85em;
  }

  .row {
    flex-direction: column;
  }
  
  .leftcolumn {
    display: none;  
  }

  .rightcolumn {
    width: 100%;    
  }

}
</style>