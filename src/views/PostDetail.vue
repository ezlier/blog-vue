<template>
  <div class="post-detail">
    <div class="header">
      <h1>{{ post.title || '无标题' }}</h1>
    </div>
    <div class="row">
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
import { ref, computed, onMounted, nextTick, watch } from 'vue'
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

const headings = ref([])

const generateSlug = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')  // 替换非字母数字字符为-
    .replace(/^-+|-+$/g, '')              // 去除首尾-
    .substring(0, 50);                    // 限制长度
}

const extractHeadings = () => {
  // 直接操作真实DOM而不是解析字符串
  const contentEl = document.querySelector('.content');
  if (!contentEl) return [];
  
  const headingElements = contentEl.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const result = [];
  
  headingElements.forEach((el, index) => {
    // 生成更可靠的ID
    let id = el.id || generateSlug(el.textContent);
    
    // 确保ID唯一
    let uniqueId = id;
    let counter = 1;
    while (document.getElementById(uniqueId)) {
      uniqueId = `${id}-${counter++}`;
    }
    
    // 实际设置元素的ID
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
      
      // 临时添加高亮效果
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
  const html = md.render(post.value.content || '');
  
  // 在下一次DOM更新后提取标题
  nextTick(() => {
    headings.value = extractHeadings();
  });
  
  return html;
});

// 加载文章内容
onMounted(async () => {
  try {
    
    
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
  background-color: white;
  padding: 40px;
  border-radius: 8px;
}

.content >>> h1,
.content >>> h2,
.content >>> h3,
.content >>> h4,
.content >>> h5,
.content >>> h6 {
  position: relative;
  scroll-margin-top: 80px; /* 与滚动偏移量匹配 */
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

.toc-container {
  position: sticky;
  top: 20px;
  background: white;
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
  color: #333;
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

/* 不同级别标题缩进 */
.toc-level-2 { padding-left: 15px; }
.toc-level-3 { padding-left: 30px; }
.toc-level-4 { padding-left: 45px; }
.toc-level-5 { padding-left: 60px; }
.toc-level-6 { padding-left: 75px; }

/* 添加高亮样式 */
.content >>> .highlight-scroll-target {
  animation: highlight 2s ease;
}

@keyframes highlight {
  0% { background-color: rgba(255, 235, 59, 0.5); }
  100% { background-color: transparent; }
}

/* 确保内容区域有相对定位 */
.content {
  position: relative;
}

@media (max-width: 768px) {
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