import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  const db = useStorage('data') || { novels: [], chapters: [] }
  
  const novels = (db.novels || []).map(novel => {
    const chapters = (db.chapters || []).filter(c => c.novel_id === novel.id)
    return { ...novel, chapter_count: chapters.length }
  })

  return { success: true, novels }
})