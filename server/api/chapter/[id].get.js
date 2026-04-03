export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const db = useStorage('data') || { chapters: [], novels: [] }
  
  const chapter = (db.chapters || []).find(c => c.id === id)
  if (!chapter) {
    throw createError({ statusCode: 404, message: '章节不存在' })
  }
  
  const novel = (db.novels || []).find(n => n.id === chapter.novel_id)
  chapter.novel_title = novel?.title || ''
  
  return { success: true, chapter }
})