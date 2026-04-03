export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  const db = useStorage('data') || { novels: [], chapters: [] }
  
  const novel = db.novels?.find(n => n.id === id)
  if (!novel) {
    throw createError({ statusCode: 404, message: '小说不存在' })
  }
  
  const chapters = (db.chapters || [])
    .filter(c => c.novel_id === id)
    .sort((a, b) => a.order_num - b.order_num)
  
  return { success: true, novel, chapters }
})