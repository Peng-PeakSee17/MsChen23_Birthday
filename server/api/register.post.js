import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  // 注册/登录二合一：密码正确即可
  const passwordHash = Buffer.from(password).toString('base64')
  const token = Buffer.from(`${username}:${passwordHash}`).toString('base64')

  return {
    success: true,
    token,
    user: {
      username: username
    }
  }
})