<script setup>
import About from '../Home/components/about.vue';
import { Buffer } from 'buffer';
import matter from 'gray-matter';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

window.Buffer = Buffer;
const router = useRouter();
const posts = ref([]);

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
      
      posts.value.push({
        id,
        title: data.title || '无标题',
        date: data.date ? new Date(data.date) : new Date(),
      });
    }
    
    // 按日期排序（最新在前）
    posts.value.sort((a, b) => b.date - a.date);
    
  } catch (error) {
    console.error('加载文章失败:', error);
  }
});

// 按年份分组文章
const groupedPosts = (posts) => {
  const groups = {};
  
  posts.forEach(post => {
    const year = post.date.getFullYear();
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
  });
  
  // 按年份降序排列
  return Object.entries(groups)
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([year, posts]) => ({ year, posts }));
};
</script>

<template>
  <div class="pigeonhole">
    <div class="header">
      <h1>归档</h1>
    </div>
    <div class="row">
      <div class="leftcolumn">
        <About/>
      </div>
      <div class="rightcolumn">
        <div v-for="group in groupedPosts(posts)" :key="group.year" class="year-group">
          <h2>{{ group.year }}</h2>
          <ul class="post-list">
            <li v-for="post in group.posts" :key="post.id" class="post-item">
              <!-- <input type="checkbox" class="post-checkbox"> -->
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
}

.leftcolumn {
  flex: 0 0 20%;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
}

.rightcolumn {
  flex: 1;
  padding: 20px;
  min-width: 0;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
  background-color: whitesmoke;
  width: 10000px;
}

.header {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.year-group {
  margin-bottom: 30px;
}

.year-group h2 {
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
  margin-bottom: 15px;
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