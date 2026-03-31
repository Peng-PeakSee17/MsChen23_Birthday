<script setup>
import { ref, onMounted } from 'vue'
import { showToast } from 'vant'
import 'vant/lib/index.css'

const showMain = ref(false)
const showTimeline = ref(false)
const showWishes = ref(false)
const currentYear = new Date().getFullYear()

const timeline = [
  { year: '2022', title: '第一次遇见', desc: '命运让我们相遇' },
  { year: '2023', title: '一起的时光', desc: '那些难忘的瞬间' },
  { year: '2024', title: '成长', desc: '各自成为更好的自己' }
]

const wishes = [
  '愿你每天都像生日一样快乐',
  '愿你的笑容永远灿烂',
  '愿你想要的都能实现'
]

const enterMuseum = () => {
  showMain.value = true
}

const showTimelinePage = () => {
  showTimeline.value = true
}

const showWishesPage = () => {
  showWishes.value = true
}

const goBack = () => {
  showTimeline.value = false
  showWishes.value = false
}
</script>

<template>
  <div class="app">
    <!-- 封面 -->
    <div v-if="!showMain" class="cover">
      <div class="cover-content">
        <div class="title">时间博物馆</div>
        <div class="subtitle">MEMORY MUSEUM</div>
        <div class="year">{{ currentYear }}</div>
        <div class="enter-btn" @click="enterMuseum">进入展览</div>
        <div class="hint">点击开启时光之旅</div>
      </div>
      <div class="particles">
        <span v-for="n in 20" :key="n" class="particle"></span>
      </div>
    </div>

    <!-- 主展馆 -->
    <div v-else-if="showMain && !showTimeline && !showWishes" class="main-hall">
      <div class="hall-header">
        <h1>时间博物馆</h1>
        <p>珍视回忆，各自向前</p>
      </div>
      
      <div class="exhibition-list">
        <div class="exhibition-card" @click="showTimelinePage">
          <div class="card-icon">📅</div>
          <div class="card-title">我们的时间轴</div>
          <div class="card-desc">一起走过的点点滴滴</div>
        </div>
        
        <div class="exhibition-card" @click="showWishesPage">
          <div class="card-icon">🎁</div>
          <div class="card-title">成长礼物</div>
          <div class="card-desc">你教会我的那些事</div>
        </div>
      </div>

      <div class="secret-btn" @click="showToast('生日快乐 🎂')">
        🎂 隐藏彩蛋
      </div>
    </div>

    <!-- 时间轴页面 -->
    <div v-if="showTimeline" class="timeline-page">
      <div class="page-header">
        <span class="back-btn" @click="goBack">← 返回</span>
        <h2>我们的时间轴</h2>
      </div>
      
      <div class="timeline">
        <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-title">{{ item.title }}</div>
            <div class="timeline-desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 祝福页面 -->
    <div v-if="showWishes" class="wishes-page">
      <div class="page-header">
        <span class="back-btn" @click="goBack">← 返回</span>
        <h2>成长礼物</h2>
      </div>
      
      <div class="wishes-list">
        <div v-for="(wish, index) in wishes" :key="index" class="wish-card">
          {{ wish }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: #0a0a0a;
  color: #fff;
  min-height: 100vh;
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
  position: relative;
}

/* 封面 */
.cover {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  position: relative;
  overflow: hidden;
}

.cover-content {
  text-align: center;
  z-index: 10;
}

.title {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { filter: drop-shadow(0 0 10px rgba(255,107,107,0.5)); }
  to { filter: drop-shadow(0 0 30px rgba(255,107,107,0.8)); }
}

.subtitle {
  font-size: 14px;
  letter-spacing: 8px;
  color: #888;
  margin-top: 10px;
}

.year {
  font-size: 120px;
  font-weight: 900;
  color: rgba(255,255,255,0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.enter-btn {
  margin-top: 60px;
  padding: 20px 60px;
  font-size: 24px;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.enter-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(255,107,107,0.5);
}

.hint {
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

/* 粒子效果 */
.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255,255,255,0.6);
  border-radius: 50%;
  animation: float 15s infinite;
}

.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; animation-delay: 2s; }
.particle:nth-child(3) { left: 30%; animation-delay: 4s; }
.particle:nth-child(4) { left: 40%; animation-delay: 1s; }
.particle:nth-child(5) { left: 50%; animation-delay: 3s; }
.particle:nth-child(6) { left: 60%; animation-delay: 5s; }
.particle:nth-child(7) { left: 70%; animation-delay: 2s; }
.particle:nth-child(8) { left: 80%; animation-delay: 4s; }
.particle:nth-child(9) { left: 90%; animation-delay: 1s; }
.particle:nth-child(10) { left: 15%; animation-delay: 3s; }
.particle:nth-child(11) { left: 25%; animation-delay: 5s; }
.particle:nth-child(12) { left: 35%; animation-delay: 2s; }
.particle:nth-child(13) { left: 45%; animation-delay: 4s; }
.particle:nth-child(14) { left: 55%; animation-delay: 1s; }
.particle:nth-child(15) { left: 65%; animation-delay: 3s; }
.particle:nth-child(16) { left: 75%; animation-delay: 5s; }
.particle:nth-child(17) { left: 85%; animation-delay: 2s; }
.particle:nth-child(18) { left: 95%; animation-delay: 4s; }
.particle:nth-child(19) { left: 5%; animation-delay: 1s; }
.particle:nth-child(20) { left: 50%; animation-delay: 3s; }

@keyframes float {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
}

/* 主展馆 */
.main-hall {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
}

.hall-header {
  text-align: center;
  margin-bottom: 60px;
}

.hall-header h1 {
  font-size: 36px;
  background: linear-gradient(90deg, #48dbfb, #ff9ff3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hall-header p {
  color: #666;
  margin-top: 10px;
  font-size: 14px;
}

.exhibition-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  margin: 0 auto;
}

.exhibition-card {
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 20px;
  padding: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.exhibition-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255,107,107,0.5);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.card-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-desc {
  color: #888;
  font-size: 14px;
}

.secret-btn {
  display: block;
  width: 200px;
  margin: 60px auto 0;
  padding: 15px;
  text-align: center;
  color: #444;
  font-size: 14px;
  cursor: pointer;
  border-radius: 10px;
}

.secret-btn:hover {
  color: #ff6b6b;
}

/* 通用页面样式 */
.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.back-btn {
  color: #48dbfb;
  cursor: pointer;
  font-size: 16px;
}

.page-header h2 {
  flex: 1;
  text-align: center;
  margin-right: 50px;
  font-size: 24px;
}

/* 时间轴 */
.timeline-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
  padding: 20px;
}

.timeline {
  max-width: 400px;
  margin: 40px auto;
}

.timeline-item {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 20px;
  bottom: -20px;
  width: 2px;
  background: linear-gradient(180deg, #48dbfb, transparent);
}

.timeline-item:last-child::before {
  display: none;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  background: #48dbfb;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(72,219,251,0.5);
  flex-shrink: 0;
}

.timeline-content {
  flex: 1;
  padding-top: 0;
}

.timeline-year {
  color: #48dbfb;
  font-size: 14px;
  font-weight: bold;
}

.timeline-title {
  font-size: 20px;
  margin: 10px 0;
}

.timeline-desc {
  color: #888;
  font-size: 14px;
}

/* 祝福页 */
.wishes-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%);
  padding: 20px;
}

.wishes-list {
  max-width: 400px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wish-card {
  background: linear-gradient(135deg, rgba(255,107,107,0.2) 0%, rgba(254,202,87,0.2) 100%);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  border: 1px solid rgba(255,107,107,0.3);
}
</style>
