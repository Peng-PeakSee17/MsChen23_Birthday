import { defineEventHandler, readBody, createError } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  const db = useStorage('data') || { users: [] }
  if (!db.users) db.users = []
  
  // 检查用户是否已存在
  const existing = db.users.find(u => u.username === username)
  if (existing) {
    throw createError({ statusCode: 400, message: '用户名已存在' })
  }

  // 简单哈希
  const passwordHash = Buffer.from(password).toString('base64')

  // 创建用户
  const user = { id: Date.now(), username, password: passwordHash, created_at: new Date().toISOString() }
  db.users.push(user)
  useStorage('data', db)

  return { success: true, userId: user.id }
})