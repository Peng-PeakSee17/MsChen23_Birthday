import { defineEventHandler, readBody, setCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  // 简单哈希密码
  const passwordHash = Buffer.from(password).toString('base64')

  // 登录/注册二合一：直接用用户名密码生成 token
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