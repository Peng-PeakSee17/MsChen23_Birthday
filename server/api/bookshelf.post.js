import { getDb, saveDb } from '../utils/db'

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
  
  const db = await getDb()
  
  // 检查是否已收藏
  const existing = db.exec(`SELECT id FROM bookshelf WHERE user_id = ${userId} AND novel_id = ${novelId}`)
  
  if (existing.length && existing[0].values.length) {
    // 取消收藏
    db.run(`DELETE FROM bookshelf WHERE user_id = ${userId} AND novel_id = ${novelId}`)
    saveDb()
    return { success: true, inBookshelf: false }
  } else {
    // 添加收藏
    db.run(`INSERT INTO bookshelf (user_id, novel_id, created_at) VALUES (${userId}, ${novelId}, datetime('now'))`)
    saveDb()
    return { success: true, inBookshelf: true }
  }
})