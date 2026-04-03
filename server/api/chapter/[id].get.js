import { getDb } from '../utils/db'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const db = getDb()
  
  const chapter = db.prepare(`
    SELECT c.*, n.title as novel_title 
    FROM chapters c 
    JOIN novels n ON c.novel_id = n.id 
    WHERE c.id = ?
  `).get(id)
  
  if (!chapter) {
    throw createError({ statusCode: 404, message: '章节不存在' })
  }
  
  return { success: true, chapter }
})