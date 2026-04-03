import { getDb } from '../utils/db'

export default defineEventHandler(() => {
  const db = getDb()
  
  // 检查是否已有数据
  const count = db.prepare('SELECT COUNT(*) as count FROM novels').get()
  if (count.count > 0) {
    return { success: true, message: '数据已存在' }
  }
  
  // 添加示例小说
  const result = db.prepare(`
    INSERT INTO novels (title, author, description)
    VALUES ('测试小说', '示例作者', '这是一本测试用的小说，用于验证功能。')
  `).run()
  
  const novelId = result.lastInsertRowid
  
  // 添加示例章节
  db.prepare(`
    INSERT INTO chapters (novel_id, title, content, order_num)
    VALUES (?, ?, ?, ?)
  `).run(novelId, '第一章 初入江湖', '这是第一章的内容。\n\n江湖路远，人在途中。\n\n......（此处省略一万字）', 1)
  
  db.prepare(`
    INSERT INTO chapters (novel_id, title, content, order_num)
    VALUES (?, ?, ?, ?)
  `).run(novelId, '第二章 风云际会', '这是第二章的内容。\n\n天下风云出我辈，一入江湖岁月催。\n\n......（此处省略两万字）', 2)
  
  return { success: true, message: '示例数据已创建' }
})