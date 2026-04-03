import { getDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const db = await getDb()
  
  const novels = db.exec('SELECT * FROM novels ORDER BY created_at DESC')
  const novelsList = novels.length > 0 ? novels[0].values : []
  const chapters = db.exec('SELECT * FROM chapters')
  const chaptersList = chapters.length > 0 ? chapters[0].values : []
  const chapterRows = chapters[0]?.columns || ['id', 'novel_id', 'title', 'content', 'order_num', 'created_at']
  
  const result = novelsList.map(row => {
    const novel = {}
    novels[0].columns.forEach((col, i) => novel[col] = row[i])
    const count = chaptersList.filter(c => c[1] === novel.id).length
    return { ...novel, chapter_count: count }
  })

  return { success: true, novels: result }
})