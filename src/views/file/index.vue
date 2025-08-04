<script setup>
import yixuanze from '@/assets/img/icon/biaoqian.png'
import weixuanze from '@/assets/img/icon/标签.png'
import About from '../Home/components/about.vue';
import { Buffer } from 'buffer';
import matter from 'gray-matter';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

window.Buffer = Buffer;
const router = useRouter();
const posts = ref([]);
const activeTag = ref('全部');

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
    
  } catch (error) {
    console.error('加载文章失败:', error);
  }
});

// 获取所有标签
const allTags = computed(() => {
  const tags = new Set();
  posts.value.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return ['全部', ...Array.from(tags).sort()];
});

// 按标签筛选文章
const filteredPosts = computed(() => {
  if (activeTag.value === '全部') {
    return posts.value;
  }
  return posts.value.filter(post => 
    post.tags?.includes(activeTag.value)
  );
});

// 按年份分组文章
const groupedPosts = computed(() => {
  const groups = {};
  
  filteredPosts.value.forEach(post => {
    const year = post.date.getFullYear();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
  });
  
  return Object.entries(groups)
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, posts]) => ({ year, posts }));
});
</script>

<template>
  <div class="pigeonhole">
    <div class="header-bg"></div>
    <div class="header">
      <h1 style="font-weight: 700;">归档</h1>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <About/>
      </div>
      <div class="rightcolumn">
        <!-- 标签筛选器 -->
        <div class="tag-filter">
          <button
            v-for="tag in allTags"
            :key="tag"
            :class="{ active: activeTag === tag }"
            @click="activeTag = tag"
          >
          <img 
            :src="activeTag === tag ? yixuanze : weixuanze" 
            class="tag-icon" 
            alt="tag"
            style="width: 13px;"
            />
            {{ tag }}
          </button>
        </div>
        
        <div v-for="group in groupedPosts" :key="group.year" class="year-group">
          <h2>{{ group.year }}</h2>
          <ul class="post-list">
            <li v-for="post in group.posts" :key="post.id" class="post-item">
              <router-link :to="`/post/${post.id}`" class="post-title">
                <span class="post-date">
                  {{ (post.date.getMonth() + 1).toString().padStart(2, '0') }}-{{ post.date.getDate().toString().padStart(2, '0') }}
                </span>
                {{ post.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
  width: 100%;
  max-width: 1280px;
  box-sizing:border-box;
}

.leftcolumn {
  flex: 0 0 20%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
  box-sizing: border-box;
}

.rightcolumn {
  flex: 1;
  padding: 20px;
  min-width: 0;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
  background-color: whitesmoke;
  box-sizing: border-box;
}

.header {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  color: #8785a2;
}

.year-group {
  margin-bottom: 30px;
}

.year-group h2 {
  position: relative;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 15px;
  overflow: hidden; 
}


.year-group h2::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 20px; /* 初始宽度 */
  height: 6px;
  background: linear-gradient(to right, #d3959b, #d3959b);
  border-radius: 3px; /* 圆角（高度的一半） */
  transition: width 2s ease; 
}


.year-group h2:hover::after {
  width: 50px;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  position: relative; 
  
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  /* padding: 8px 0; */
  border-bottom: 1px dashed #eee;
}

.post-item::before {
  content: "┇"; /* 默认显示竖线 */
  position: absolute;
  left: 0;
  color: #fcbad3;
  transition: all 2s ease; /* 添加过渡效果 */
  transform: scale(1.2); 
}

.post-item:hover::before {
  content: "◊"; /* 悬停时显示菱形 */
  color: #a8d8ea;
  transform: scale(1.2); 
}

.post-checkbox {
  margin-right: 10px;
  cursor: pointer;
}

.post-date {
  color: #666;
  font-family: monospace;
  min-width: 60px;
  margin-right: 15px;
  margin-left: 10px;
}

.post-title {
  color: #fcbad3;
  text-decoration: none;
  transition: color 0.2s;
}

.post-title:hover {
  background-color: transparent;
  color: #aa96da;
  font-weight:bold;
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.tag-filter button {
  padding: 4px 12px;
  border: 1px solid #d3959b;
  border-radius: 15px;
  background-color: transparent;
  color: #d3959b;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.tag-filter button:hover {
  background-color: rgba(211, 149, 155, 0.1);
}

.tag-filter button.active {
  background-color: #d3959b;
  color: white;
}

@media (max-width: 1024px) {
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