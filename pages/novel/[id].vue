<template>
  <div class="novel-detail">
    <header>
      <button @click="goBack">← 返回</button>
      <h1>目录</h1>
      <button @click="toggleBookshelf" :class="{ added: inBookshelf }">
        {{ inBookshelf ? '已收藏' : '收藏' }}
      </button>
    </header>
    
    <div class="novel-info" v-if="novel">
      <h2>{{ novel.title }}</h2>
      <p>作者：{{ novel.author }}</p>
      <p class="desc">{{ novel.description }}</p>
    </div>
    
    <div class="chapter-list">
      <div 
        v-for="(chapter, index) in chapters" 
        :key="chapter.id" 
        class="chapter-item"
        @click="goToChapter(chapter.id)"
      >
        第 {{ index + 1 }} 章 - {{ chapter.title }}
      </div>
    </div>
    
    <div v-if="!chapters.length" class="empty">
      暂无章节
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const novel = ref(null)
const chapters = ref([])
const inBookshelf = ref(false)

onMounted(() => {
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    navigateTo('/login')
    return
  }
  fetchNovel()
})

const fetchNovel = async () => {
  try {
    const res = await $fetch(`/api/novel/${route.params.id}`)
    if (res.success) {
      novel.value = res.novel
      chapters.value = res.chapters
    }
  } catch (e) {
    console.error(e)
  }
}

const goBack = () => {
  navigateTo('/')
}

const goToChapter = (id) => {
  navigateTo(`/chapter/${id}`)
}

const toggleBookshelf = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await $fetch('/api/bookshelf', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: { novelId: route.params.id }
    })
    if (res.success) {
      inBookshelf.value = res.inBookshelf
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
.novel-detail { min-height: 100vh; }
header { background: #4a90d9; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
header button { background: none; border: none; color: #fff; font-size: 16px; cursor: pointer; }
header button.added { color: #ffd700; }
header h1 { font-size: 18px; }
.novel-info { background: #fff; padding: 20px; margin-bottom: 10px; }
.novel-info h2 { font-size: 20px; margin-bottom: 10px; }
.novel-info p { font-size: 14px; color: #666; margin-bottom: 5px; }
.novel-info .desc { color: #999; }
.chapter-list { background: #fff; }
.chapter-item { padding: 15px 20px; border-bottom: 1px solid #eee; font-size: 15px; cursor: pointer; }
.chapter-item:active { background: #f5f5f5; }
.empty { text-align: center; padding: 40px; color: #999; }
</style>