import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

const DB_PATH = join(process.cwd(), 'data', 'db.json')

function getDb() {
  if (!existsSync(DB_PATH)) {
    const dir = join(process.cwd(), 'data')
    writeFileSync(DB_PATH, JSON.stringify({ users: [], novels: [], chapters: [], bookshelf: [], reading_progress: [] }, null, 2))
  }
  return JSON.parse(readFileSync(DB_PATH, 'utf-8'))
}

function saveDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export function getData(path) {
  const db = getDb()
  return db[path] || []
}

export function setData(path, data) {
  const db = getDb()
  db[path] = data
  saveDb(db)
}

export function findOne(table, where) {
  const data = getData(table)
  return data.find(item => {
    for (const key in where) {
      if (item[key] !== where[key]) return false
    }
    return true
  })
}

export function insert(table, item) {
  const db = getDb()
  item.id = Date.now()
  item.created_at = new Date().toISOString()
  db[table].push(item)
  saveDb(db)
  return item
}

export function update(table, id, updates) {
  const db = getDb()
  const index = db[table].findIndex(item => item.id === id)
  if (index !== -1) {
    db[table][index] = { ...db[table][index], ...updates }
    saveDb(db)
    return db[table][index]
  }
  return null
}

export function remove(table, id) {
  const db = getDb()
  const index = db[table].findIndex(item => item.id === id)
  if (index !== -1) {
    db[table].splice(index, 1)
    saveDb(db)
    return true
  }
  return false
}

export function query(table, filter) {
  const data = getData(table)
  if (!filter) return data
  return data.filter(item => {
    for (const key in filter) {
      if (item[key] !== filter[key]) return false
    }
    return true
  })
}