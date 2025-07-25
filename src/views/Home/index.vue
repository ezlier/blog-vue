<script setup>
import About from './components/about.vue';
import Welcome from './components/welcome.vue';
import bostlist from './components/bostlist.vue';


</script>

<template>
<div class="header">
 <Welcome/>
</div>
<div class="row">
  <div class="leftcolumn">
    <About/>
  </div>
  
  <div class="rightcolumn">
    <bostlist/>
  </div>
</div>
</template>


<style scoped>
.row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  background-color: red;
  padding: 10px;
}

.leftcolumn {
  flex: 0 0 20%; /* 固定25%宽度 */
  background-color: #f1f1f1;
  padding: 20px;
}

.rightcolumn {
  flex: 1;       /* 剩余空间 */
  background-color: #f1f1f1;
  padding: 20px;
  min-width: 0;  /* 防止内容溢出 */
  width: 14000px;
}

.header{
  margin-bottom:300px;
  margin-top:200px;
  
}
</style>
