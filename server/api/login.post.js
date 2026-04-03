import { getDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  const db = getDb()
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username)

  if (!user) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  // 简单验证
  const inputHash = Buffer.from(password).toString('base64')
  if (user.password !== inputHash) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  // 生成 token
  const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64')

  return {
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      avatar: user.avatar || ''
    }
  }
})