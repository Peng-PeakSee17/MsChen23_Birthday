import { getDb, saveDb } from '../utils/db'

export default defineEventHandler(async () => {
  const db = await getDb()
  
  // 检查是否已有数据
  const existing = db.exec('SELECT COUNT(*) as count FROM novels')
  if (existing.length && existing[0].values[0][0] > 0) {
    return { success: true, message: '数据已存在' }
  }
  
  // 添加示例小说
  db.run(`INSERT INTO novels (title, author, description, created_at) VALUES ('测试小说', '示例作者', '这是一本测试用的小说，用于验证功能。', datetime('now'))`)
  
  // 获取小说ID
  const result = db.exec('SELECT last_insert_rowid()')
  const novelId = result[0].values[0][0]
  
  // 添加示例章节
  db.run(`INSERT INTO chapters (novel_id, title, content, order_num, created_at) VALUES (${novelId}, '第一章 初入江湖', '这是第一章的内容。\n\n江湖路远，人在途中。\n\n......（此处省略一万字）', 1, datetime('now'))`)
  
  db.run(`INSERT INTO chapters (novel_id, title, content, order_num, created_at) VALUES (${novelId}, '第二章 风云际会', '这是第二章的内容。\n\n天下风云出我辈，一入江湖岁月催。\n\n......（此处省略两万字）', 2, datetime('now'))`)
  
  saveDb()
  
  return { success: true, message: '示例数据已创建' }
})