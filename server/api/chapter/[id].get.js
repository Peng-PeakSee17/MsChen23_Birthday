import { getData, findOne } from '../utils/db'

export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  
  const chapter = findOne('chapters', { id })
  if (!chapter) {
    throw createError({ statusCode: 404, message: '章节不存在' })
  }
  
  const novel = findOne('novels', { id: chapter.novel_id })
  chapter.novel_title = novel?.title || ''
  
  return { success: true, chapter }
})