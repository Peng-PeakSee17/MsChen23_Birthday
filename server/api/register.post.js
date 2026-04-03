import { getDb, saveDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (!username || !password) {
    throw createError({ statusCode: 400, message: '用户名和密码不能为空' })
  }

  const db = await getDb()
  
  // 检查用户是否已存在
  const existing = db.exec(`SELECT id FROM users WHERE username = '${username}'`)
  if (existing.length && existing[0].values.length) {
    throw createError({ statusCode: 400, message: '用户名已存在' })
  }

  // 简单哈希
  const passwordHash = Buffer.from(password).toString('base64')

  // 创建用户
  db.run(`INSERT INTO users (username, password, created_at) VALUES ('${username}', '${passwordHash}', datetime('now'))`)
  saveDb()
  
  const result = db.exec('SELECT last_insert_rowid()')

  return { success: true, userId: result[0].values[0][0] }
})