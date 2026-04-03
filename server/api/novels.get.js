import { getData } from '../utils/db'

export default defineEventHandler((event) => {
  const novels = getData('novels').map(novel => {
    const chapters = getData('chapters').filter(c => c.novel_id === novel.id)
    return { ...novel, chapter_count: chapters.length }
  })

  return { success: true, novels }
})