import { insert, findOne, getData } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  // 检查用户是否已存在
  const existing = findOne('users', { username })
  if (existing) {
    throw createError({ statusCode: 400, message: '用户名已存在' })
  }

  // 简单哈希
  const passwordHash = Buffer.from(password).toString('base64')

  // 创建用户
  const user = insert('users', { username, password: passwordHash })

  return { success: true, userId: user.id }
})