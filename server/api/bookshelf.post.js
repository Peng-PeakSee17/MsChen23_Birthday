import { defineEventHandler, getCookie, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const auth = getCookie(event, 'auth')
  if (!auth) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const decoded = Buffer.from(auth, 'base64').toString()
  const parts = decoded.split(':')
  const userId = parseInt(parts[0])
  
  const body = await readBody(event)
  const { novelId } = body
  
  if (!novelId) {
    throw createError({ statusCode: 400, message: '缺少小说ID' })
  }
  
  const db = useStorage('data') || { bookshelf: [] }
  if (!db.bookshelf) db.bookshelf = []
  
  const existing = db.bookshelf.find(b => b.user_id === userId && b.novel_id === novelId)
  
  if (existing) {
    const index = db.bookshelf.indexOf(existing)
    db.bookshelf.splice(index, 1)
    useStorage('data', db)
    return { success: true, inBookshelf: false }
  } else {
    db.bookshelf.push({ id: Date.now(), user_id: userId, novel_id: novelId, created_at: new Date().toISOString() })
    useStorage('data', db)
    return { success: true, inBookshelf: true }
  }
})