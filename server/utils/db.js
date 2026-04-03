import Database from 'better-sqlite3'
import { join } from 'path'

let db = null

export function getDb() {
  if (db) return db
  
  const dbPath = join(process.cwd(), 'data', 'novel.db')
  db = new Database(dbPath)
  initDb()
  return db
}

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS novels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      description TEXT,
      cover TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      novel_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      order_num INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (novel_id) REFERENCES novels(id)
    );

    CREATE TABLE IF NOT EXISTS bookshelf (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      novel_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (novel_id) REFERENCES novels(id),
      UNIQUE(user_id, novel_id)
    );
  `)
}

export function findOne(table, where) {
  const db = getDb()
  const keys = Object.keys(where)
  const values = Object.values(where)
  const whereClause = keys.map(k => `${k} = ?`).join(' AND ')
  const stmt = db.prepare(`SELECT * FROM ${table} WHERE ${whereClause}`)
  return stmt.get(...values)
}

export function getData(table) {
  const db = getDb()
  return db.prepare(`SELECT * FROM ${table}`).all()
}

export function insert(table, data) {
  const db = getDb()
  const keys = Object.keys(data)
  const values = Object.values(data)
  const placeholders = keys.map(() => '?').join(', ')
  const stmt = db.prepare(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`)
  const result = stmt.run(...values)
  return { ...data, id: result.lastInsertRowid }
}

export function run(sql, params = []) {
  const db = getDb()
  const stmt = db.prepare(sql)
  return stmt.run(...params)
}

export function query(table, filter = null) {
  const db = getDb()
  if (!filter) {
    return db.prepare(`SELECT * FROM ${table}`).all()
  }
  const keys = Object.keys(filter)
  const values = Object.values(filter)
  const whereClause = keys.map(k => `${k} = ?`).join(' AND ')
  const stmt = db.prepare(`SELECT * FROM ${table} WHERE ${whereClause}`)
  return stmt.all(...values)
}