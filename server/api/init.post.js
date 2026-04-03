import { getData, insert } from '../utils/db'

export default defineEventHandler(() => {
  const novels = getData('novels')
  if (novels.length > 0) {
    return { success: true, message: '数据已存在' }
  }
  
  // 添加示例小说
  const novel = insert('novels', {
    title: '测试小说',
    author: '示例作者',
    description: '这是一本测试用的小说，用于验证功能。',
    cover: ''
  })
  
  // 添加示例章节
  insert('chapters', {
    novel_id: novel.id,
    title: '第一章 初入江湖',
    content: '这是第一章的内容。\n\n江湖路远，人在途中。\n\n......（此处省略一万字）',
    order_num: 1
  })
  
  insert('chapters', {
    novel_id: novel.id,
    title: '第二章 风云际会',
    content: '这是第二章的内容。\n\n天下风云出我辈，一入江湖岁月催。\n\n......（此处省略两万字）',
    order_num: 2
  })
  
  return { success: true, message: '示例数据已创建' }
})