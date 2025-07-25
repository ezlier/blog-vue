<template>
  <div class="clock-container">
    <div id="clock">
      <div v-for="(digits, groupIndex) in digitStructure" :key="groupIndex" class="digit-group">
        <div v-for="(digitList, digitIndex) in digits" :key="digitIndex" class="digit">
          <div 
            v-for="n in digitList" 
            :key="n"
            class="digit-number"
            :class="{ bright: isActiveDigit(groupIndex, digitIndex, n) }"
          >
            {{ n }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'Clock',
  setup() {
    const digitStructure = [
      [[0,1,2], [0,1,2,3,4,5,6,7,8,9]], // 小时
      [[0,1,2,3,4,5], [0,1,2,3,4,5,6,7,8,9]], // 分钟
      [[0,1,2,3,4,5], [0,1,2,3,4,5,6,7,8,9]]  // 秒
    ];
    
    const currentTime = ref([0, 0, 0, 0, 0, 0]); // 存储时分秒的每一位数字
    let animationFrameId = null;

    const updateTime = () => {
      const date = new Date();
      const timeString = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      ].map(n => `0${n}`.slice(-2)).join('');
      
      currentTime.value = timeString.split('').map(Number);
      animationFrameId = requestAnimationFrame(updateTime);
    };

    const isActiveDigit = (groupIndex, digitIndex, n) => {
      const timeIndex = groupIndex * 2 + digitIndex;
      return currentTime.value[timeIndex] === n;
    };

    onMounted(() => {
      updateTime();
    });

    onBeforeUnmount(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    return {
      digitStructure,
      currentTime,
      isActiveDigit
    };
  }
};
</script>

<style scoped>
.clock-container {
  font: 100%/1.5 sans-serif;
  color: white;
  text-align: center;
  overflow: hidden;
  background-image: linear-gradient(
    to right,
    #b8cbb8 0%,
    #b8cbb8 0%,
    #b465da 0%,
    #cf6cc9 33%,
    #ee609c 66%,
    #ee609c 100%
  );
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

#clock {
  font-size: 16px;
  width: 100%;
  height: 100%;
}

.digit-group {
  display: inline-block;
  height: 100%;
}

.digit-group:not(:last-child):after {
  content: ":";
  font-size: 36px;
}

.digit {
  display: inline-block;
  width: 25px;
  height: 160px;
}

.digit .digit-number {
  color: rgba(255, 255, 255, 0.5);
  transform: rotate(-90deg);
  transition: font-size 200ms, transform 350ms, color 150ms;
}

.digit .digit-number.bright {
  color: inherit;
  font-size: 36px;
  transform: rotate(0deg);
}
</style>