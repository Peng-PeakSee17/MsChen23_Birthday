<script setup>
import { ref } from 'vue'

const showMain = ref(false)
const showGallery = ref(false)
const showCollection = ref(false)
const showGift = ref(false)
const showSurprise = ref(false)
const videoEnded = ref(false)
const candleLit = ref(true)
const showCandleSection = ref(false)
const showFinal = ref(false)

const currentYear = new Date().getFullYear()

// 星光展廊数据
const galleryItems = [
  { image: '/images/photo0.jpg' },
  { image: '/images/photo1.jpg' },
  { image: '/images/photo2.jpg' },
  { image: '/images/photo3.jpg' },
  { image: '/images/photo4.jpg' },
  { image: '/images/photo5.jpg' },
  { image: '/images/photo6.jpg' }
]

// 3D 画廊
const currentIndex = ref(0)
const isAnimating = ref(false)

const nextPhoto = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value + 1) % galleryItems.length
  setTimeout(() => isAnimating.value = false, 600)
}

const prevPhoto = () => {
  if (isAnimating.value) return
  isAnimating.value = true
  currentIndex.value = (currentIndex.value - 1 + galleryItems.length) % galleryItems.length
  setTimeout(() => isAnimating.value = false, 600)
}

const getItemStyle = (index) => {
  const total = galleryItems.length
  let diff = index - currentIndex.value
  if (diff > total / 2) diff -= total
  if (diff < -total / 2) diff += total
  
  const absDiff = Math.abs(diff)
  const maxVisible = 3
  
  if (absDiff > maxVisible) {
    return { opacity: 0, transform: `translateX(0px) translateZ(-1000px) rotateY(0deg)`, pointerEvents: 'none' }
  }
  
  const rotateY = diff * 50
  const translateX = diff * 120
  const translateZ = -absDiff * 100
  const scale = 1 - absDiff * 0.25
  const opacity = 1 - absDiff * 0.3
  const zIndex = maxVisible - absDiff
  
  return { opacity, transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`, zIndex, pointerEvents: absDiff === 0 ? 'auto' : 'none' }
}

const collections = [
  { type: 'quote', content: '追光的人，终会光芒万丈', source: '蒲熠星' },
  { type: 'quote', content: '热爱可抵岁月漫长', source: '蒲熠星' },
  { type: 'quote', content: '发光不是特权，是本能', source: '蒲熠星' },
  { type: 'ticket', title: '演唱会兑换券', content: '无论什么时候，你 想去看演唱会，都可以找我兑换。', hint: '请截图保存哦～' }
]

const gifts = [
  { title: '2024年8月1日', content: '那天我问你为什么喜欢蒲熠星，你说因为他做什么都有所成就。也正是这个让我在很多时候都坚持了下来，因为我觉得我可以，不过现实告诉我不可以哈哈哈。' }
]

const wishes = ['生日快乐', '愿你永远自在明亮', '所愿皆所得', '岁岁常欢愉', '继续闪闪发光']
const finalMessage = '新的一岁，继续发光吧！✨'

const enterMuseum = () => {
  showMain.value = true
}

const goBack = () => {
  showGallery.value = false
  showCollection.value = false
  showGift.value = false
  showSurprise.value = false
  videoEnded.value = false
  candleLit.value = true
  showCandleSection.value = false
  showFinal.value = false
}

let videoRef = null

const onVideoEnd = () => {
  videoEnded.value = true
  showCandleSection.value = true
}

const blowCandle = () => {
  candleLit.value = false
  setTimeout(() => {
    showCandleSection.value = false
    showFinal.value = true
  }, 1000)
}

const closeSurprise = () => {
  showSurprise.value = false
  videoEnded.value = false
  candleLit.value = true
  showCandleSection.value = false
  showFinal.value = false
}

const playSurprise = () => {
  showSurprise.value = true
  videoEnded.value = false
  candleLit.value = true
  showCandleSection.value = false
  showFinal.value = false
  setTimeout(() => {
    if (videoRef) {
      videoRef.play().catch(e => console.log('播放失败:', e))
    }
  }, 100)
}
</script>

<template>
  <div class="app">
    <!-- 欢迎门 -->
    <div v-if="!showMain" class="welcome">
      <div class="welcome-content">
        <h1 class="main-title">时间博物馆</h1>
        <p class="subtitle">为你而建 · 收藏所有属于你的光亮</p>
        <button class="enter-btn" @click="enterMuseum">进入博物馆</button>
        <p class="footer-text">祝你生日快乐 · 愿你永远明亮</p>
      </div>
    </div>

    <!-- 主展馆 -->
    <div v-else-if="!showGallery && !showCollection && !showGift && !showSurprise" class="main-hall">
      <div class="hall-header">
        <h1>时间博物馆</h1>
        <p>致闪闪发光的你</p>
      </div>

      <div class="menu-list">
        <div class="menu-item" @click="showGallery = true">
          <span class="menu-icon">✨</span>
          <div class="menu-text">
            <h3>星光展廊</h3>
            <p>你走过的日子，都值得被珍藏</p>
          </div>
        </div>

        <div class="menu-item" @click="showCollection = true">
          <span class="menu-icon">🌟</span>
          <div class="menu-text">
            <h3>时光藏品</h3>
            <p>你喜欢的世界，我也认真去了解</p>
          </div>
        </div>

        <div class="menu-item" @click="showGift = true">
          <span class="menu-icon">🎁</span>
          <div class="menu-text">
            <h3>成长礼物</h3>
            <p>因为你，我变成了更好的人</p>
          </div>
        </div>
      </div>

      <div class="surprise-btn" @click="playSurprise">✨</div>
    </div>

    <!-- 星光展廊 -->
    <div v-if="showGallery" class="gallery-page">
      <div class="page-header">
        <span class="back-btn" @click="goBack">← 返回</span>
        <h2>星光展廊</h2>
      </div>

      <div class="gallery-3d">
        <div class="gallery-track">
          <div v-for="(item, index) in galleryItems" :key="index" class="gallery-card" :class="{ active: index === currentIndex }" :style="getItemStyle(index)">
            <img :src="item.image" alt="" />
          </div>
        </div>
        
        <div class="gallery-controls">
          <span class="control-btn prev" @click="prevPhoto">‹</span>
          <span class="control-btn next" @click="nextPhoto">›</span>
        </div>
        
        <div class="gallery-indicators">
          <span v-for="(item, index) in galleryItems" :key="index" class="indicator" :class="{ active: index === currentIndex }"></span>
        </div>
      </div>
    </div>

    <!-- 时光藏品 -->
    <div v-if="showCollection" class="collection-page">
      <div class="page-header">
        <span class="back-btn" @click="goBack">← 返回</span>
        <h2>时光藏品</h2>
      </div>
      <div class="collection-list">
        <div v-for="(item, index) in collections" :key="index" class="collection-item" :class="item.type">
          <template v-if="item.type === 'quote'">
            <p class="quote-text">"{{ item.content }}"</p>
            <span class="quote-source">—— {{ item.source }}</span>
          </template>
          <template v-else-if="item.type === 'story'">
            <div class="story-date">{{ item.title }}</div>
            <p class="story-text">{{ item.content }}</p>
          </template>
          <template v-else-if="item.type === 'ticket'">
            <div class="ticket">
              <div class="ticket-top">
                <span class="ticket-icon">🎫</span>
                <span class="ticket-title">{{ item.title }}</span>
              </div>
              <div class="ticket-content">
                <p>{{ item.content }}</p>
                <span v-if="item.hint" class="ticket-hint">{{ item.hint }}</span>
              </div>
              <div class="ticket-bottom">
                <span class="ticket-code">WP ★</span>
              </div>
            </div>
          </template>
          <template v-else>
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </template>
        </div>
      </div>
    </div>

    <!-- 成长礼物 -->
    <div v-if="showGift" class="gift-page">
      <div class="page-header">
        <span class="back-btn" @click="goBack">← 返回</span>
        <h2>成长礼物</h2>
      </div>
      <div class="gift-list">
        <div v-for="(gift, index) in gifts" :key="index" class="gift-item">
          <div class="gift-date">{{ gift.title }}</div>
          <p class="gift-content">{{ gift.content }}</p>
        </div>
      </div>
    </div>

    <!-- 生日彩蛋 -->
    <div v-if="showSurprise" class="surprise-page">
      <!-- 视频播放中 -->
      <div v-if="!videoEnded && !showCandleSection" class="video-section">
        <video ref="videoRef" class="surprise-video" src="/birthday-spark.mp4" loop @ended="onVideoEnd" playsinline></video>
        <div class="cake">🎂</div>
        <div class="wishes">
          <span v-for="(wish, index) in wishes" :key="index" class="wish-text" :style="{ '--i': index }">{{ wish }}</span>
        </div>
      </div>
      
      <!-- 吹蜡烛环节 -->
      <div v-if="videoEnded && !showFinal" class="candle-section">
        <div class="candle-content">
          <h2 class="candle-title">许个愿吧 🕯️</h2>
          <div class="candle-cake" @click="blowCandle">
            <span class="cake-emoji">🎂</span>
            <div v-if="candleLit" class="candle-flame"></div>
            <div v-else class="candle-smoke">💨</div>
          </div>
          <p class="candle-hint">点击吹灭蜡烛</p>
        </div>
      </div>
      
      <!-- 最终祝福 -->
      <div v-if="showFinal" class="final-section">
        <div class="final-content">
          <div class="final-cake">🎂</div>
          <h2 class="final-title">生日快乐！</h2>
          <p class="final-message">{{ finalMessage }}</p>
          <button class="close-btn" @click="closeSurprise">返回主页</button>
        </div>
      </div>
      
      <!-- 关闭按钮 -->
      <div class="close-icon" @click="closeSurprise">✕</div>
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
}

/* 欢迎门 */
.welcome {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #faf8f5 0%, #f0ebe5 100%);
  padding: 20px;
}

.welcome-content {
  text-align: center;
}

.main-title {
  font-size: 48px;
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 8px;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 16px;
  color: #b8b0a0;
  letter-spacing: 4px;
  margin-bottom: 60px;
}

.enter-btn {
  padding: 18px 50px;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  transition: all 0.3s;
}

.enter-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(212,175,55,0.3);
}

.footer-text {
  margin-top: 40px;
  font-size: 12px;
  color: #c0b8ac;
  letter-spacing: 2px;
}

/* 主展馆 */
.main-hall {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(180deg, #faf8f5 0%, #e8e4dd 100%);
}

.hall-header {
  text-align: center;
  margin-bottom: 50px;
}

.hall-header h1 {
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
  letter-spacing: 6px;
}

.hall-header p {
  color: #999;
  margin-top: 10px;
  font-size: 14px;
}

.menu-list {
  max-width: 400px;
  margin: 0 auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: #fff;
  border-radius: 15px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
}

.menu-icon {
  font-size: 32px;
}

.menu-text h3 {
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 500;
  margin-bottom: 5px;
}

.menu-text p {
  font-size: 13px;
  color: #999;
}

.surprise-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 30px;
  cursor: pointer;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* 通用页面 */
.page-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fff;
}

.back-btn {
  color: #d4af37;
  cursor: pointer;
  font-size: 16px;
}

.page-header h2 {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: #1a1a1a;
}

/* 3D 画廊 */
.gallery-page {
  min-height: 100vh;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
}

.gallery-3d {
  position: relative;
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  perspective: 1500px;
}

.gallery-track {
  position: relative;
  width: 300px;
  height: 400px;
  transform-style: preserve-3d;
}

.gallery-card {
  position: absolute;
  width: 280px;
  height: 370px;
  left: 10px;
  top: 15px;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.gallery-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-card.active {
  box-shadow: 0 30px 80px rgba(212,175,55,0.3);
}

.gallery-controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  transform: translateY(-50%);
  pointer-events: none;
}

.control-btn {
  font-size: 60px;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  pointer-events: auto;
  transition: all 0.3s;
  line-height: 1;
}

.control-btn:hover {
  color: #d4af37;
  transform: scale(1.2);
}

.gallery-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  transition: all 0.3s;
}

.indicator.active {
  background: #d4af37;
  transform: scale(1.3);
}

/* 时光藏品 */
.collection-page, .gift-page {
  min-height: 100vh;
  background: #faf8f5;
}

.collection-list, .gift-list {
  max-width: 400px;
  margin: 30px auto;
  padding: 0 20px;
}

.collection-item, .gift-item {
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  margin-bottom: 15px;
}

.collection-item.quote .quote-text {
  font-size: 18px;
  color: #1a1a1a;
  line-height: 1.6;
  margin-bottom: 10px;
}

.collection-item.quote .quote-source {
  font-size: 13px;
  color: #999;
}

.collection-item.text h3 {
  font-size: 16px;
  color: #d4af37;
  margin-bottom: 8px;
}

.collection-item.text p {
  font-size: 15px;
  color: #666;
}

/* 故事卡片 */
.collection-item.story {
  background: linear-gradient(135deg, rgba(72,219,251,0.1) 0%, rgba(255,159,243,0.1) 100%);
}

.story-date {
  font-size: 14px;
  color: #48dbfb;
  margin-bottom: 12px;
  letter-spacing: 1px;
}

.story-text {
  font-size: 16px;
  color: #1a1a1a;
  line-height: 1.8;
}

/* 演唱会门票 */
.collection-item.ticket {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 2px solid #d4af37;
  padding: 0;
  overflow: hidden;
}

.ticket {
  width: 100%;
}

.ticket-top {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border-bottom: 2px dashed rgba(212,175,55,0.3);
  background: linear-gradient(90deg, rgba(212,175,55,0.2), transparent);
}

.ticket-icon {
  font-size: 28px;
}

.ticket-title {
  font-size: 18px;
  font-weight: bold;
  color: #d4af37;
}

.ticket-content {
  padding: 20px;
}

.ticket-content p {
  font-size: 15px;
  color: rgba(255,255,255,0.9);
  line-height: 1.6;
  margin-bottom: 10px;
}

.ticket-hint {
  display: inline-block;
  font-size: 12px;
  color: #ff6b6b;
  background: rgba(255,107,107,0.1);
  padding: 4px 10px;
  border-radius: 10px;
}

.ticket-bottom {
  padding: 15px 20px;
  background: rgba(212,175,55,0.1);
  text-align: right;
}

.ticket-code {
  font-size: 14px;
  color: #d4af37;
  letter-spacing: 2px;
}

.gift-item {
  background: linear-gradient(135deg, rgba(72,219,251,0.1) 0%, rgba(255,159,243,0.1) 100%);
  padding: 30px;
  border-radius: 15px;
  margin-bottom: 15px;
}

.gift-date {
  font-size: 14px;
  color: #48dbfb;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.gift-content {
  font-size: 16px;
  color: #1a1a1a;
  line-height: 1.8;
}

/* 生日彩蛋 */
.surprise-page {
  min-height: 100vh;
  position: relative;
  background: #1a1a1a;
  overflow: hidden;
}

.video-section {
  min-height: 100vh;
  position: relative;
}

.surprise-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.cake {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 120px;
  animation: cakeGlow 1.5s ease-in-out infinite;
}

@keyframes cakeGlow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); filter: drop-shadow(0 0 20px #d4af37); }
  50% { transform: translate(-50%, -50%) scale(1.1); filter: drop-shadow(0 0 40px #d4af37); }
}

.wishes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.wish-text {
  position: absolute;
  font-size: 24px;
  color: #fff;
  text-shadow: 0 0 20px rgba(212,175,55,0.8);
  animation: wishFloat 4s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.5s);
  left: calc(var(--i) * 18%);
}

@keyframes wishFloat {
  0%, 100% { transform: translateY(100vh); opacity: 0; }
  20%, 80% { opacity: 1; }
  100% { transform: translateY(-20vh); opacity: 0; }
}

.close-icon {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s;
}

.close-icon:hover {
  background: rgba(255,255,255,0.4);
}

/* 吹蜡烛环节 */
.candle-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.candle-content {
  text-align: center;
}

.candle-title {
  font-size: 32px;
  margin-bottom: 40px;
}

.candle-cake {
  position: relative;
  display: inline-block;
  cursor: pointer;
  animation: cakeBounce 2s ease-in-out infinite;
}

@keyframes cakeBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.cake-emoji {
  font-size: 120px;
}

.candle-flame {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 30px;
  background: radial-gradient(ellipse at bottom, #ffeb3b, #ff9800, transparent);
  border-radius: 50% 50% 20% 20%;
  animation: flameFlicker 0.3s ease-in-out infinite;
}

@keyframes flameFlicker {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.1); }
}

.candle-smoke {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 30px;
  animation: smokeRise 1s ease-out infinite;
}

@keyframes smokeRise {
  0% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
}

.candle-hint {
  margin-top: 30px;
  font-size: 16px;
  color: rgba(255,255,255,0.6);
}

/* 最终祝福页面 */
.final-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
}

.final-content {
  text-align: center;
  padding: 40px;
}

.final-cake {
  font-size: 100px;
  animation: finalPulse 2s ease-in-out infinite;
}

@keyframes finalPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.final-title {
  font-size: 48px;
  margin: 30px 0 20px;
  background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.final-message {
  font-size: 20px;
  color: rgba(255,255,255,0.8);
  margin-bottom: 40px;
}

.close-btn {
  padding: 15px 40px;
  font-size: 16px;
  color: #1a1a1a;
  background: linear-gradient(135deg, #d4af37 0%, #c9a227 100%);
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 30px rgba(212,175,55,0.3);
}
</style>
