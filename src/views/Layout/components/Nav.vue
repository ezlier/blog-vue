<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAboutStore } from '@/stores/aboutStore'
import { storeToRefs } from 'pinia'
import darklight from '@/components/darklight.vue'

import icon from '@/assets/img/icon1.png'
import zhuye from '@/assets/img/icon/zhuye.png'
import guidang from '@/assets/img/icon/wenzhang.png'
import guanyu from '@/assets/img/icon/guanyuwomen.png'
import menuIcon from '@/assets/img/icon/hangbuju.png' 
import head from '@/assets/img/head.jpg' 

const showSidebar = ref(false)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}
const closeSidebar = () => {
  showSidebar.value = false
}

const aboutStore = useAboutStore()
const { postCount, tagCount } = storeToRefs(aboutStore)

// 滚动相关逻辑
const isNavbarVisible = ref(true)
const lastScrollPosition = ref(0)
const navbarTransparent = ref(true)

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  
  // 控制透明度
  navbarTransparent.value = currentScrollPosition < 1
  
  // 控制显示/隐藏
  if (currentScrollPosition <= 10) {
    isNavbarVisible.value = true
  } else if (currentScrollPosition > lastScrollPosition.value && currentScrollPosition > 100) {
    isNavbarVisible.value = false
  } else if (currentScrollPosition < lastScrollPosition.value) {
    isNavbarVisible.value = true
  }
  
  lastScrollPosition.value = currentScrollPosition
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

onMounted(async () => {
  await aboutStore.loadPosts()
  window.addEventListener('scroll', handleScroll, { passive: true })
})
</script>


<template>
  <nav class="navbar" :class="{ 'navbar-hidden': !isNavbarVisible, 'navbar-transparent': navbarTransparent }">
    <img :src="icon" height="50" class="logo" />
    
    <!-- 桌面导航 -->
    <ul class="nav-links desktop-nav">
      <li class="darklight-wrapper">
        <darklight/>
      </li>
      <li>
        <router-link to="/" exact-active-class="active">
          <img :src="zhuye" class="icon" /> 首页
        </router-link>
      </li>
      <li>
        <router-link to="/file" exact-active-class="active">
          <img :src="guidang" class="icon" /> 归档
        </router-link>
      </li>
      <li>
        <router-link to="/about" exact-active-class="active">
          <img :src="guanyu" class="icon" /> 关于
        </router-link>
      </li>
    </ul>

    <div class="menu-actions">
      <darklight />
      <img :src="menuIcon" class="menu-icon" @click="toggleSidebar" />
    </div>

    <!-- 移动端 -->
    <teleport to="body">
      <transition name="fade">
      <div v-show="showSidebar" class="overlay" @click="closeSidebar"></div>
      </transition>
      <transition name="slide">
        <div class="sidebar" v-show="showSidebar">
          <div class="card">
            <div class="avatar-container">
              <img :src='head' width="100" class="avatar" />
            </div>
            <h1 style="color: #f77;">Ezria</h1>
            <div class="stats">
              <div class="stat-item">
                <span class="stat-label">文章</span>
                <span class="stat-number">{{ postCount }}</span>
            
              </div>
              <div class="stat-item">
                <span class="stat-label">标签</span>
                <span class="stat-number">{{ tagCount }}</span>
            
              </div>
           </div>
          </div>
          <ul class="nav-links mobile-nav">
          <li @click="closeSidebar">
            <router-link to="/" exact-active-class="active">
              <img :src="zhuye" class="icon" /> 首页
            </router-link>
          </li>
          <li @click="closeSidebar">
            <router-link to="/file" exact-active-class="active">
              <img :src="guidang" class="icon" /> 归档
            </router-link>
          </li>
          <li @click="closeSidebar">
            <router-link to="/about" exact-active-class="active">
              <img :src="guanyu" class="icon" /> 关于
            </router-link>
          </li>
          </ul>
        </div>
      </transition>
    </teleport>
  </nav>
</template>



<style scoped>
.avatar-container {
  width: 100px;
  height: 100px;
  overflow: hidden; 
  border-radius: 50%;
  box-shadow: 0 0 15px 5px rgba(255, 0, 0, 0.2);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats {
  display: flex;
  margin-top: 10px;
  gap: 20px;
  color: #f77;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.2rem;
  font-weight: bold;
}

.stat-label {
  font-size: 0.8rem;
  
}

.card {
  /* background-color: white; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; 
  border-radius: 8px;
}

.icon {
  height: 20px;
  margin-right: 5px;
}

.navbar {
  font-family: 'ziti1';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 5px 20px;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.5s ease;
}

.navbar-hidden {
  transform: translateY(-100%);
}



.navbar:not(.navbar-transparent) {
  background: rgba(221, 221, 221, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li a {
  display: flex;
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
  align-items: center;
}

.nav-links li a:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.nav-links li a.active {
  font-weight: bold;
  background-color: rgba(142, 140, 216, 0.7);
}

.desktop-nav {
  display: flex;
  gap: 20px;
}

.menu-icon {
  
  height: 30px;
  cursor: pointer;
  z-index: 1101;
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 200px;
  height: 100vh;
  background-color: var(--bg-color);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1101;
  padding: 10px; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  overflow-y: auto; 
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'ziti1';
}

.mobile-nav li a {
  padding: 6px 20px;
  border: 2px solid rgba(247, 119, 119, 0.6);
  border-radius: 8px;
  transition: all 0.3s ease;
  color: #f77;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  position: relative;
  background-color: transparent;
  font-size: 1rem;
}

.mobile-nav li a:hover {
  background-color: rgba(247, 119, 119, 0.1);
}

.mobile-nav li a.active {
  background-color: #aa96da;
  border: 2px solid #fff;
  color: #fff;
  transform: scale(1.05);
  box-shadow:
    0 0 0 2px #fff,
    0 0 10px 4px #fcbad3,
    0 0 20px 8px #a8d8ea;
  font-weight: bold;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1100;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.darklight-wrapper {
  align-items: center;
}

.menu-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  display: none;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .menu-actions {
    display: block;
  }
}

</style>