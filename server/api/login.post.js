import { getDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  const db = await getDb()
  
  const users = db.exec(`SELECT * FROM users WHERE username = '${username}'`)
  if (!users.length || !users[0].values.length) {
    throw createError({ statusCode: 401, message: '用户名或密码错误' })
  }

  const user = {}
  users[0].columns.forEach((col, i) => user[col] = users[0].values[0][i])

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