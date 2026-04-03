import { getDb } from '../utils/db'

export default defineEventHandler((event) => {
  const db = getDb()
  
  const novels = db.prepare(`
    SELECT n.*, 
      (SELECT COUNT(*) FROM chapters WHERE novel_id = n.id) as chapter_count
    FROM novels n
    ORDER BY n.created_at DESC
  `).all()

  return { success: true, novels }
})