import { getDb } from '../utils/db'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const token = auth.replace('Bearer ', '')
  const decoded = Buffer.from(token, 'base64').toString()
  const userId = parseInt(decoded.split(':')[0])
  
  const db = getDb()
  const bookshelf = db.prepare(`
    SELECT n.* FROM novels n
    JOIN bookshelf b ON n.id = b.novel_id
    WHERE b.user_id = ?
    ORDER BY b.created_at DESC
  `).all(userId)

  return { success: true, bookshelf }
})