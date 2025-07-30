<template>
  <div class="header">
    <div class="blog-container">
      <div class="blog-content">
        Blog
      </div>
      <div class="sub-content" ref="subContent">
        {{ displayedText }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const subContent = ref(null);
    const texts = [
      '不必匆忙。不必火花四溅。不必成为别人，只需做自己。',
      "如果你能在浪费时间中获得乐趣，就不算浪费时间。",
      "给我点赞喵！为什么没人给我点赞喵！是我喵的不够好吗喵！不给我点赞就捅似你们喵！捅似你们喵！",
      "钱没有，工作也没有，自由也没有，几把人生",
      "立春天,风渐暖,伊人一去不复返",
    ];
    const displayedText = ref('');
    const currentText = ref('');
    let typingInterval = null;

    const getRandomText = () => {
      const randomIndex = Math.floor(Math.random() * texts.length);
      return texts[randomIndex];
    };

    const typeWriter = () => {
      // 先清除现有内容
      displayedText.value = ' ';
      
      // 获取新随机文本
      currentText.value = getRandomText();
      let i = 0;
      
      // 清除之前的定时器
      if (typingInterval) clearInterval(typingInterval);
      
      typingInterval = setInterval(() => {
        if (i < currentText.value.length) {
          displayedText.value += currentText.value.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
          // 3秒后开始新的打字效果
          setTimeout(() => {
            typeWriter();
          }, 3000);
        }
      }, 150); // 调整这个值可以改变打字速度
    };

    onMounted(() => {
      typeWriter();
    });

    return {
      subContent,
      displayedText
    };
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  padding: 20px;
  
}

.blog-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.blog-content {
  font-size: 2rem;
  font-weight: bold;
  color: #8785a2;
}

.sub-content {
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  min-height: 20px;  /* 改为固定高度 */
  height: 44px;      /* 根据你的设计调整这个值 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: #3f72af;
  /* white-space: nowrap; */
  position: relative;
  box-sizing: border-box; /* 确保padding包含在高度内 */
}

/* 新增光标动画 */
.sub-content::after {
  content: "|";
  position: absolute;
  right: 8px;
  animation: blink 0.5s infinite;
  color: rgb(142, 140, 216);
  font-weight: bold;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>