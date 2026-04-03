import { getDb, run } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  const db = getDb()
  
  // 检查用户是否已存在
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username)
  if (existing) {
    throw createError({ statusCode: 400, message: '用户名已存在' })
  }

  // 简单哈希
  const passwordHash = Buffer.from(password).toString('base64')

  // 创建用户
  const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, passwordHash)

  return { success: true, userId: result.lastInsertRowid }
})