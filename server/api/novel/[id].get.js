import { getDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const db = await getDb()
  
  const novels = db.exec(`SELECT * FROM novels WHERE id = ${id}`)
  if (!novels.length || !novels[0].values.length) {
    throw createError({ statusCode: 404, message: '小说不存在' })
  }
  
  const novel = {}
  novels[0].columns.forEach((col, i) => novel[col] = novels[0].values[0][i])
  
  const chapters = db.exec(`SELECT * FROM chapters WHERE novel_id = ${id} ORDER BY order_num`)
  const chaptersList = chapters.length > 0 ? chapters[0].values.map(row => {
    const obj = {}
    chapters[0].columns.forEach((col, i) => obj[col] = row[i])
    return obj
  }) : []
  
  return { success: true, novel, chapters: chaptersList }
})