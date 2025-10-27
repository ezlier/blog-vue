<script setup>
import About from './components/about.vue';
import Welcome from './components/welcome.vue';
import bostlist from './components/bostlist.vue';


</script>

<template>
<div class="header">
 <Welcome/>
</div>
<div class="bg">
  <div class="row">
    <div class="leftcolumn">
      <About/>
    </div>
    
    <div class="rightcolumn">
      <bostlist/>
    </div>
  </div>
</div>
</template>


<style scoped>
.bg {
  width: 100%;
  background-color: var(--bg-content);;
}

.row {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  max-width: 1280px;
  padding: 10px;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}



.leftcolumn {
  flex: 0 0 20%; /* 固定25%宽度 */
  /* background-color: #f1f1f1; */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
}

.rightcolumn {
  flex: 1;       
  
  padding: 20px;
  min-width: 0; 
  width: 100%;
  border-radius: 8px;
  box-shadow: 2px 2px 5px #000;
}

.header{
  height: 100vh;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;
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

  .header{
    height: 400px;
  }
}
</style>
