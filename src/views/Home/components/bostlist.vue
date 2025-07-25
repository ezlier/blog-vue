<template>
  <div class="card-container">
    <div class="card">
      <h2>文章标题</h2>
      <h5>2019 年 4 月 17日   字数</h5>
      <div class="fakeimg" style="height:200px;">图片</div>
    </div>
    <div class="card">
      <h2>文章标题</h2>
      <h5>2019 年 4 月 17日   字数</h5>
      <div class="fakeimg" style="height:200px;">图片</div>
    </div><div class="card">
      <h2>文章标题</h2>
      <h5>2019 年 4 月 17日   字数</h5>
      <div class="fakeimg" style="height:200px;">图片</div>
    </div><div class="card">
      <h2>文章标题</h2>
      <h5>2019 年 4 月 17日   字数</h5>
      <div class="fakeimg" style="height:200px;">图片</div>
    </div><div class="card">
      <h2>文章标题</h2>
      <h5>2019 年 4 月 17日   字数</h5>
      <div class="fakeimg" style="height:200px;">图片</div>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 两列 */
  gap: 20px; /* 卡片间距 */
}

.card {
  background-color: white;
  padding: 20px;
}

.fakeimg {
  background-color: #aaa;
  width: 100%;
  padding: 20px;
}
</style>