import { getDb } from '../utils/db'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const db = getDb()
  
  const novel = db.prepare('SELECT * FROM novels WHERE id = ?').get(id)
  if (!novel) {
    throw createError({ statusCode: 404, message: '小说不存在' })
  }
  
  const chapters = db.prepare('SELECT * FROM chapters WHERE novel_id = ? ORDER BY order_num').all(id)
  
  return { success: true, novel, chapters }
})