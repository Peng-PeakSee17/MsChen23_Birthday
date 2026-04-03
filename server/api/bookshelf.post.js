import { getDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const token = auth.replace('Bearer ', '')
  const decoded = Buffer.from(token, 'base64').toString()
  const userId = parseInt(decoded.split(':')[0])
  
  const body = await readBody(event)
  const { novelId } = body
  
  if (!novelId) {
    throw createError({ statusCode: 400, message: '缺少小说ID' })
  }
  
  const db = getDb()
  
  // 检查是否已收藏
  const existing = db.prepare('SELECT id FROM bookshelf WHERE user_id = ? AND novel_id = ?').get(userId, novelId)
  
  if (existing) {
    db.prepare('DELETE FROM bookshelf WHERE id = ?').run(existing.id)
    return { success: true, inBookshelf: false }
  } else {
    db.prepare('INSERT INTO bookshelf (user_id, novel_id) VALUES (?, ?)').run(userId, novelId)
    return { success: true, inBookshelf: true }
  }
})