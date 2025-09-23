<script setup>
import { useThemeStore } from "@/stores/theme";

// 引入图标
import sunIcon from "@/assets/img/icon/sun.png";
import moonIcon from "@/assets/img/icon/moon.png";

const themeStore = useThemeStore();
</script>

<template>
  <button @click="themeStore.toggleTheme" class="theme-toggle">
    <img 
      :src="themeStore.isDark ? moonIcon : sunIcon" 
      alt="theme icon" 
      class="theme-icon"
    />
  </button>
</template>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.theme-icon {
  width: 24px;
  height: 24px;
}


</style>
