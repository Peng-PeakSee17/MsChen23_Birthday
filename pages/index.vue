<template>
  <div class="home">
    <header>
      <h1>📚 小说书架</h1>
      <div class="user-info" v-if="user">
        <span>{{ user.username }}</span>
        <button @click="logout">退出</button>
      </div>
    </header>
    
    <div class="novel-list" v-if="novels.length">
      <div class="novel-item" v-for="novel in novels" :key="novel.id" @click="goToNovel(novel.id)">
        <div class="cover">{{ novel.cover || '📖' }}</div>
        <div class="info">
          <h3>{{ novel.title }}</h3>
          <p class="author">作者：{{ novel.author }}</p>
          <p class="desc">{{ novel.description || '暂无简介' }}</p>
          <p class="chapters">共 {{ novel.chapter_count }} 章</p>
        </div>
      </div>
    </div>
    
    <div v-else class="empty">
      <p>暂无小说</p>
      <p class="hint">请先添加小说数据</p>
    </div>
  </div>
</template>

<script setup>
const user = ref(null)
const novels = ref([])

onMounted(() => {
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    navigateTo('/login')
    return
  }
  user.value = JSON.parse(userStr)
  fetchNovels()
})

const fetchNovels = async () => {
  try {
    const res = await $fetch('/api/novels')
    if (res.success) {
      novels.value = res.novels
    }
  } catch (e) {
    console.error(e)
  }
}

const goToNovel = (id) => {
  navigateTo(`/novel/${id}`)
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  navigateTo('/login')
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
.home { min-height: 100vh; }
header { background: #4a90d9; color: #fff; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 20px; }
.user-info { display: flex; align-items: center; gap: 10px; }
.user-info button { padding: 6px 12px; background: rgba(255,255,255,0.2); color: #fff; border: none; border-radius: 4px; cursor: pointer; }
.novel-list { padding: 15px; }
.novel-item { display: flex; background: #fff; border-radius: 8px; padding: 15px; margin-bottom: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); cursor: pointer; }
.novel-item:active { background: #f0f0f0; }
.cover { width: 80px; height: 110px; background: #e0e0e0; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 40px; flex-shrink: 0; }
.info { margin-left: 15px; flex: 1; }
.info h3 { font-size: 16px; margin-bottom: 5px; }
.info .author { font-size: 13px; color: #666; margin-bottom: 5px; }
.info .desc { font-size: 13px; color: #999; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 5px; }
.info .chapters { font-size: 12px; color: #4a90d9; }
.empty { text-align: center; padding: 60px 20px; color: #999; }
.empty .hint { font-size: 13px; margin-top: 10px; }
</style>