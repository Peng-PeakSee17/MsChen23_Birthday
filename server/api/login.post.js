import { defineEventHandler, readBody, setCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  // 简单哈希密码
  const passwordHash = Buffer.from(password).toString('base64')

  // 用 username 作为简单验证（实际项目请用数据库）
  // 这里直接注册/登录二合一：用户名密码对就登录，不对就注册
  const userId = Date.now()
  const token = Buffer.from(`${userId}:${username}:${passwordHash}`).toString('base64')

  // 设置 Cookie
  setCookie(event, 'auth', token, {
    maxAge: 60 * 60 * 24 * 7, // 7天
    httpOnly: false,
    path: '/'
  })

  return {
    success: true,
    token,
    user: {
      id: userId,
      username: username
    }
  }
})