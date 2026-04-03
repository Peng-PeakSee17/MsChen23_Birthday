import { defineEventHandler, readBody, getRouterParam, getHeader, createError } from 'h3'
import { useStorage } from '#imports'

// 简单的 JSON 文件存储
const getDb = () => {
  return useStorage('data') || { users: [], novels: [], chapters: [], bookshelf: [], reading_progress: [] }
}

const saveDb = (data) => {
  useStorage('data', data)
}

const findOne = (table, where) => {
  const db = getDb()
  return db[table]?.find(item => {
    for (const key in where) {
      if (item[key] !== where[key]) return false
    }
    return true
  })
}

const getData = (path) => {
  const db = getDb()
  return db[path] || []
}

const insert = (table, item) => {
  const db = getDb()
  item.id = Date.now()
  item.created_at = new Date().toISOString()
  if (!db[table]) db[table] = []
  db[table].push(item)
  saveDb(db)
  return item
}

const remove = (table, id) => {
  const db = getDb()
  const index = db[table]?.findIndex(item => item.id === id)
  if (index !== -1 && index !== undefined) {
    db[table].splice(index, 1)
    saveDb(db)
    return true
  }
  return false
}

export { getData, findOne, insert, remove }