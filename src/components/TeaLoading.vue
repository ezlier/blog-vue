<template>
  <transition name="fade">
    <div v-if="visible" class="loading-overlay">
      <div class="wrapper">
        <!-- 茶包 -->
        <div class="teabag">
          <div class="teabag-top"></div>
          <div class="teabag-body">
            <div class="teabag-content">
              <div class="teabag-eyes eyes">
                <div class="teabag-eye eye"></div>
                <div class="teabag-eye eye"></div>
              </div>
              <div class="teabag-mouth"></div>
            </div>
          </div>
          <div class="teabag-pores">
            <span class="teabag-pore" v-for="i in 14" :key="i"></span>
          </div>
        </div>

        <!-- 茶杯 -->
        <div class="cup">
          <div class="cup-body">
            <div class="cup-eyes eyes">
              <div class="cup-eye eye"></div>
              <div class="cup-eye eye"></div>
            </div>
            <div class="cup-mouth">
              <div class="cup-tongue"></div>
            </div>
          </div>
          <div class="cup-handle"></div>
          <div class="cup-saucer">
            <div class="cup-saucer-top"></div>
            <div class="cup-saucer-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
</script>

<style>
/* 让它全屏遮罩 */
.loading-overlay {
  position: fixed;
  inset: 0;
  background: var(--main-bg, #c9e8f7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 淡入淡出 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ---------------- 原始动画 CSS 搬运 ---------------- */
:root {
  --main-bg: #c9e8f7;
  --stroke-width: 6px;
  --stroke-color: #28354e;
  --cup-color: #ffffff;
  --cup-color-shadow: #dfded1;
  --cup-red: #c94f50;
  --cup-red-light: #fe6b68;
  --tebag-color: #f2f2f2;
  --teebag-content: #4cb5ae;
  --teabag-pores: #61616145;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 500px;
}

.eyes {
  display: flex;
  justify-content: space-between;
}

.eye {
  position: relative;
  border-radius: 150px 150px 0 0;
  border: var(--stroke-width) solid var(--stroke-color);
  border-bottom: none;
}

.eye::before,
.eye::after {
  content: "";
  position: absolute;
  bottom: calc(var(--stroke-width) / 2 * -1);
  display: block;
  width: var(--stroke-width);
  height: var(--stroke-width);
  border-radius: 50%;
  background-color: var(--stroke-color);
}

.eye:before {
  left: calc(var(--stroke-width) * -1);
}

.eye:after {
  right: calc(var(--stroke-width) * -1);
}

.teabag {
  position: relative;
  width: 130px;
  animation: teabag 6s ease-in infinite, brew 6s linear infinite;
  z-index: 1;
}

.teabag::before {
  content: "";
  position: absolute;
  bottom: calc(100% - 15px);
  left: 50%;
  transform: translatex(-50%);
  display: block;
  width: 6px;
  height: 450px;
  background-color: var(--stroke-color);
  z-index: 2;
}

.teabag-top {
  position: relative;
  width: 100%;
  height: 0;
  border-bottom: 40px solid var(--tebag-color);
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
}

.teabag-top::before {
  content: "";
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 40px;
  height: 10px;
  border-radius: 10px;
  background-color: var(--main-bg);
}

.teabag-body {
  position: relative;
  width: 100%;
  height: 130px;
  padding: 30px 15px 15px;
  background-color: var(--tebag-color);
  border-radius: 0 0 2px 2px;
}

.teabag-body::before,
.teabag-body::after {
  content: "";
  position: absolute;
  bottom: 5px;
  display: block;
  width: 20px;
  height: 20px;
  background-color: var(--teabag-brewed);
  border-radius: 0 50% 50% 50%;
  rotate: 45deg;
  z-index: -1;
}

.teabag-body::before {
  left: 35px;
  animation: drop 6s ease-in 4.5s infinite;
}

.teabag-body::after {
  right: 35px;
  width: 15px;
  height: 15px;
  animation: drop 6s ease-in 4s infinite;
}

.teabag-content {
  width: 100%;
  height: 100%;
  padding: 30px 15px;
  background-color: var(--teebag-content);
  border-radius: 2px;
  transition: all 0.5s ease-out;
}

.teabag-eye {
  width: 20px;
  height: 10px;
}

.teabag-mouth {
  width: 20px;
  height: 10px;
  margin: 10px auto 0;
  border-radius: 0 0 150px 150px;
  background-color: var(--stroke-color);
}

.teabag-pores {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(4, 12px);
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 20px;
  transition: all 0.5s ease-out;
}

.teabag-pore {
  width: 12px;
  height: 12px;
  margin: auto;
  background-color: var(--teabag-pores);
  border-radius: 50%;
}

.teabag-pore:nth-child(1),
.teabag-pore:nth-child(2),
.teabag-pore:nth-child(11),
.teabag-pore:nth-child(12),
.teabag-pore:nth-child(13),
.teabag-pore:nth-child(14) {
  grid-column-start: span 2;
}

.teabag-pore:nth-child(11),
.teabag-pore:nth-child(12) {
  margin-top: 12px;
}

.teabag-pore:nth-child(13),
.teabag-pore:nth-child(14) {
  margin-top: -8px;
}

.cup-body {
  position: relative;
  margin: 0 auto;
  width: 190px;
  height: 160px;
  padding: 40px 32px;
  border-radius: 20px 20px 50% 50%;
  background-color: var(--cup-color);
  z-index: 1;
}

.cup-eyes {
  --stroke-width: 8px;
  position: absolute;
  width: calc(100% - 64px);
}

.cup-eye {
  width: 30px;
  height: 15px;
  animation: blink 6s steps(1) infinite;
}

.cup-eye::before,
.cup-eye::after {
  animation: hidden 6s steps(1) infinite;
}

.cup-mouth {
  position: relative;
  width: 40px;
  height: 28px;
  margin: 35px auto 0;
  border-radius: 5px 5px 60% 60%;
  background-color: var(--cup-red-light);
  background-image: radial-gradient(var(--cup-red) 50%, transparent 50%);
  background-position: 0 10px;
  background-repeat: no-repeat;
}

.cup-mouth::before {
  content: "";
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translatex(-50%);
  width: 85%;
  height: 10px;
  border-radius: 0 0 180% 180% / 0 0 300% 300%;
  background-color: var(--cup-color);
}

.cup-handle {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 85px;
  height: 85px;
  margin: -135px -30px 0 auto;
  border-radius: 50%;
  background: linear-gradient(to right, var(--cup-color-shadow) 50%, var(--cup-color) 50%);
  z-index: 0;
}

.cup-handle::after {
  content: "";
  display: block;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background: var(--main-bg);
}

.cup-saucer {
  position: relative;
  margin-top: 35px;
}

.cup-saucer::before {
  content: "";
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 300px;
  height: 50px;
  border-radius: 50%;
  background-color: #91d5f1;
  z-index: -1;
}

.cup-saucer-top {
  position: relative;
  width: 250px;
  height: 25px;
  margin-inline: auto;
  background-color: var(--cup-color);
  border-radius: 20px;
  z-index: 1;
}

.cup-saucer-bottom {
  width: 210px;
  height: 25px;
  margin: -8px auto 0;
  background: linear-gradient(to bottom, var(--cup-color-shadow) 60%, var(--cup-color) 60%);
  border-radius: 20px;
}

/* 动画 */
@keyframes blink {
  20% {
    height: 30px;
    background-color: var(--stroke-color);
    border-bottom: 8px solid var(--stroke-color);
    border-radius: 50%;
  }
}

@keyframes hidden {
  20% {
    visibility: hidden;
  }
}

@keyframes teabag {
  0% { transform: translateY(-200px); }
  20% { transform: translateY(150px); }
  25% { transform: translateY(130px); }
  35% { transform: translateY(150px); }
  40% { transform: translateY(120px); }
  50% { transform: translateY(130px); }
  60%, 90% { transform: translateY(-50px); }
  100% { transform: translateY(-200px); }
}

@keyframes brew {
  to {
    --teebag-content: #c48473;
    --teabag-pores: #5f3c334f;
  }
}

@keyframes drop {
  10%, 100% {
    translate: 0 150px;
    opacity: 0;
  }
}
</style>
