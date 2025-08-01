<template>
  <footer class="kratos-footer ">
    <div class="footer-content">
      <div class="copyright">
        <p> {{ currentYear }} by Ezria. blog. | 这坨屎山运行了 {{ daysRunning }}天</p>
        <p class="theme-credit">咕咕咕</p>
      </div>
      
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
const daysRunning = ref(0);


onMounted(() => {
  const startDate = new Date('2025-07-18'); //博客运行天数
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  daysRunning.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  
});
</script>

<style scoped>

.kratos-footer {
  margin-top:10px;
  background: linear-gradient(
    to right,
    #d3959b,
    #bfe6ba
  );
  color: whitesmoke;
  font-size: 14px;
  padding: 20px 0;
  text-align: center;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  /* border-top: 1px solid #eaeaea; */
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px 8px 0px 0px;
  left: 0px;
  right: 0px;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.copyright {
  margin-bottom: 1px;
  line-height: 1.6;
}

.theme-credit {
  font-size: 13px;
  color: white;
  margin-top: 5px;
}
</style>
