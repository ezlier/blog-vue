<script setup>
    import head from '@/assets/img/head.jpg' 
</script>

<template>   
<div class="container">
  <div class="row">
    <div class="leftcolumn">
      <div class="name">
        <img :src='head' width="90" class="avatar" />
        <h1>Ezria</h1>
      </div>
      <div class="hellotext">
        <div class="quote-top">“</div>
        <p style="padding-left: 15px;">hi,你来了</p>
        <p style="padding-left: 15px;">真的会有人看吗</p>
        <div class="quote-bottom">”</div>
      </div>
    </div>
    
    <div class="rightcolumn">
      <!-- 右侧内容 -->
       <div class="aboutme">
        <span><h1 class="aaa">关于</h1></span>
        <p style="margin-top: 10px;">欢迎来到我的小站</p>
        <ul>
          <li>普通在校大学生，主要学习后端</li>
          <li>爱玩FPS，是卡拉比丘量产猫娘喵（？）</li>
          <li>喵喵喵</li>
        </ul>
       </div>
       <div class="aboutweb">
          <span><h1 class="aaa">关于本站</h1></span>
          <p>自学了一个月vue，捣鼓了一个月弄的喵。</p>
          <p>目前是一个纯前端页面，后续会把后端做出来。</p>
          <p>真的会有人看吗(ー_ー)!!</p>
       </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.aaa{
  background-image: linear-gradient(to  right, #d3959b, #bfe6ba);
  background-repeat: no-repeat;
  background-size: 0px 2px;
  background-position: left bottom;
  transition:  2s;
}

.aaa:hover {
  background-size: 100% 2px;
  
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.row {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 20px;
  max-width: 1280px;
  width: 100%;
  padding: 20px;
  box-shadow: 2px 2px 5px #000;
  border-radius: 8px;
  background-color: rgba(200, 200, 200, 0.7);
}

.leftcolumn {
  flex: 0 0 30%; 
  padding: 20px;
  border-radius: 8px;
  /* box-shadow: 2px 2px 5px #000; */
}

.rightcolumn {
  flex: 1;       
  padding: 20px;
  min-width: 0; 
  border-radius: 8px;
  /* box-shadow: 2px 2px 5px #000; */
}

.name {
  display: flex;          /* 启用 Flex 布局 */
  align-items: center;    /* 垂直居中 */
  gap: 20px;              /* 图片和文字之间的间距 */
  margin-bottom: 20px;
}

.avatar {
  border-radius: 50%;  /* 使图片变成圆形 */
  object-fit: cover;   
  box-shadow: 0 0 15px 5px rgba(255, 0, 0, 0.2);
}

.hellotext {
  border-radius: 8px;
  background-image: linear-gradient(to  right, #d3959b, #bfe6ba);
  padding: 0px 10px 0px 10px;
  color: whitesmoke;
}

.quote-top {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  
  text-align: left;
}

.quote-bottom {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.8);
  
  text-align: right; /* 右对齐 */
}

.aboutweb{
  margin-top: 10px
}

@media (max-width: 768px) {
  .row {
    flex-direction: column; /* 改为纵向排列 */
  }
  
  .leftcolumn, .rightcolumn {
    flex: 1 1 100%; /* 占满整行 */
    width: 100%;
  }

  .name{
    justify-content: center;
  }
}
</style>