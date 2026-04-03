<template>
  <div class="chapter-read">
    <header>
      <button @click="goBack">← 返回</button>
      <h1>{{ chapter?.novel_title }}</h1>
      <button @click="toggleMenu">目录</button>
    </header>
    
    <div class="content" v-if="chapter">
      <h2>{{ chapter.title }}</h2>
      <div class="text">{{ chapter.content }}</div>
    </div>
    
    <div v-if="showMenu" class="menu-overlay" @click="showMenu = false">
      <div class="menu" @click.stop>
        <h3>目录</h3>
        <div class="menu-list">
          <div 
            v-for="c in chapters" 
            :key="c.id" 
            :class="{ active: c.id == chapter?.id }"
            @click="goToChapter(c.id)"
          >
            {{ c.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const chapter = ref(null)
const chapters = ref([])
const showMenu = ref(false)

onMounted(() => {
  fetchChapter()
})

const fetchChapter = async () => {
  try {
    const res = await $fetch(`/api/chapter/${route.params.id}`)
    if (res.success) {
      chapter.value = res.chapter
      // 获取同小说的章节列表
      const novelRes = await $fetch(`/api/novel/${res.chapter.novel_id}`)
      if (novelRes.success) {
        chapters.value = novelRes.chapters
      }
    }
  } catch (e) {
    console.error(e)
  }
}

const goBack = () => {
  navigateTo(`/novel/${chapter.value?.novel_id}`)
}

const goToChapter = (id) => {
  showMenu.value = false
  navigateTo(`/chapter/${id}`)
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; }
.chapter-read { min-height: 100vh; }
header { background: #4a90d9; color: #fff; padding: 15px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; }
header button { background: none; border: none; color: #fff; font-size: 16px; cursor: pointer; }
header h1 { font-size: 16px; flex: 1; text-align: center; }
.content { padding: 20px; background: #fff; margin: 10px; border-radius: 8px; }
.content h2 { font-size: 18px; margin-bottom: 20px; text-align: center; }
.content .text { font-size: 16px; line-height: 1.8; color: #333; white-space: pre-wrap; }
.menu-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; }
.menu { position: absolute; right: 0; top: 0; bottom: 0; width: 70%; background: #fff; overflow-y: auto; }
.menu h3 { padding: 15px; font-size: 16px; border-bottom: 1px solid #eee; }
.menu-list { padding: 10px; }
.menu-list div { padding: 12px; border-bottom: 1px solid #f5f5f5; font-size: 14px; cursor: pointer; }
.menu-list div:active { background: #f5f5f5; }
.menu-list div.active { color: #4a90d9; }
</style>