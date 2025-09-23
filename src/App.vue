<template>
  <TeaLoading :visible="loading" />
  <RouterView v-if="!loading" />
</template>

<script setup>
import { ref, onMounted } from "vue"
import TeaLoading from "@/components/TeaLoading.vue"

const loading = ref(true)

// 模拟首屏加载 3 秒
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 3000)
})
</script>
