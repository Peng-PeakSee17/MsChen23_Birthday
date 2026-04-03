import { defineEventHandler, getHeader, readBody, createError } from 'h3'

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
  
  const db = useStorage('data') || { bookshelf: [] }
  if (!db.bookshelf) db.bookshelf = []
  
  // 检查是否已收藏
  const existing = db.bookshelf.find(b => b.user_id === userId && b.novel_id === novelId)
  
  if (existing) {
    // 取消收藏
    const index = db.bookshelf.indexOf(existing)
    db.bookshelf.splice(index, 1)
    useStorage('data', db)
    return { success: true, inBookshelf: false }
  } else {
    // 添加收藏
    db.bookshelf.push({ id: Date.now(), user_id: userId, novel_id: novelId, created_at: new Date().toISOString() })
    useStorage('data', db)
    return { success: true, inBookshelf: true }
  }
})