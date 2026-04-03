import { getData, findOne } from '../utils/db'

export default defineEventHandler((event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const token = auth.replace('Bearer ', '')
  const decoded = Buffer.from(token, 'base64').toString()
  const userId = parseInt(decoded.split(':')[0])
  
  const bookshelf = getData('bookshelf')
    .filter(b => b.user_id === userId)
    .map(b => findOne('novels', { id: b.novel_id }))
    .filter(Boolean)

  return { success: true, bookshelf }
})