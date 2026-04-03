import { getDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const auth = getHeader(event, 'authorization')
  if (!auth) {
    throw createError({ statusCode: 401, message: '未登录' })
  }
  
  const token = auth.replace('Bearer ', '')
  const decoded = Buffer.from(token, 'base64').toString()
  const userId = parseInt(decoded.split(':')[0])
  
  const db = await getDb()
  
  const bookshelf = db.exec(`SELECT * FROM bookshelf WHERE user_id = ${userId}`)
  const bookshelfList = bookshelf.length > 0 ? bookshelf[0].values : []
  
  const novels = db.exec('SELECT * FROM novels')
  const novelsMap = {}
  if (novels.length && novels[0].values.length) {
    novels[0].values.forEach(row => {
      const obj = {}
      novels[0].columns.forEach((col, i) => obj[col] = row[i])
      novelsMap[obj.id] = obj
    })
  }
  
  const result = bookshelfList.map(row => {
    const item = {}
    bookshelf[0].columns.forEach((col, i) => item[col] = row[i])
    return novelsMap[item.novel_id]
  }).filter(Boolean)

  return { success: true, bookshelf: result }
})