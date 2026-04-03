import { defineEventHandler, getCookie, createError } from 'h3'

export default defineEventHandler((event) => {
  const auth = getCookie(event, 'auth')
  if (!auth) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  // 解析 token
  const decoded = Buffer.from(auth, 'base64').toString()
  const parts = decoded.split(':')
  if (parts.length < 3) {
    throw createError({ statusCode: 401, message: '无效 token' })
  }
  
  const userId = parseInt(parts[0])
  const username = parts[1]
  
  // 从 storage 获取书架数据（需要持久化的话后续改进）
  const db = useStorage('data') || { bookshelf: [], novels: [] }
  const bookshelf = (db.bookshelf || [])
    .filter(b => b.user_id === userId)
    .map(b => (db.novels || []).find(n => n.id === b.novel_id))
    .filter(Boolean)

  return { success: true, bookshelf, user: { id: userId, username } }
})