import { getDb } from '../utils/db'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const db = await getDb()
  
  const chapters = db.exec(`SELECT * FROM chapters WHERE id = ${id}`)
  if (!chapters.length || !chapters[0].values.length) {
    throw createError({ statusCode: 404, message: '章节不存在' })
  }
  
  const chapter = {}
  chapters[0].columns.forEach((col, i) => chapter[col] = chapters[0].values[0][i])
  
  const novels = db.exec(`SELECT title FROM novels WHERE id = ${chapter.novel_id}`)
  if (novels.length && novels[0].values.length) {
    chapter.novel_title = novels[0].values[0][0]
  }
  
  return { success: true, chapter }
})