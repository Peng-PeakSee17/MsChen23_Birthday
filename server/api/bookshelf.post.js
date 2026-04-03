import { getData, findOne, insert, remove } from '../utils/db'

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
  
  // 检查是否已收藏
  const existing = findOne('bookshelf', { user_id: userId, novel_id: novelId })
  
  if (existing) {
    remove('bookshelf', existing.id)
    return { success: true, inBookshelf: false }
  } else {
    insert('bookshelf', { user_id: userId, novel_id: novelId })
    return { success: true, inBookshelf: true }
  }
})