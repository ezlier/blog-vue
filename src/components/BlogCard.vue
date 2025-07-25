<template>
  <router-link :to="`/blog/${post.id}`" class="blog-card">
    <div class="card-content">
      <h2>{{ post.title }}</h2>
      <div class="meta">
        <span class="date">{{ formatDate(post.date) }}</span>
        <span class="word-count">{{ post.wordCount }}字</span>
      </div>
      <div v-if="post.excerpt" class="excerpt">{{ post.excerpt }}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
  }
}
</script>

<style scoped>
.blog-card {
  display: block;
  text-decoration: none;
  color: inherit;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.card-content {
  padding: 20px;
}

h2 {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
}

.meta {
  display: flex;
  gap: 10px;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.excerpt {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>