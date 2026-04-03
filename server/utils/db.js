import initSqlJs from 'sql.js'

let db = null

export async function getDb() {
  if (db) return db
  
  const SQL = await initSqlJs()
  
  // 尝试从 storage 加载已保存的数据
  const savedData = useStorage('sqlite-data')
  if (savedData.value) {
    const data = new Uint8Array(savedData.value)
    db = new SQL.Database(data)
  } else {
    db = new SQL.Database()
    initTables()
  }
  
  return db
}

function initTables() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  db.run(`
    CREATE TABLE IF NOT EXISTS novels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      description TEXT,
      cover TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)
  
  db.run(`
    CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      novel_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      order_num INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (novel_id) REFERENCES novels(id)
    )
  `)
  
  db.run(`
    CREATE TABLE IF NOT EXISTS bookshelf (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      novel_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, novel_id)
    )
  `)
}

export function saveDb() {
  if (!db) return
  const data = db.export()
  useStorage('sqlite-data', Array.from(data))
}

export function findOne(table, where) {
  if (!db) return null
  const keys = Object.keys(where)
  const values = Object.values(where)
  const whereClause = keys.map(k => `${k} = ?`).join(' AND ')
  const stmt = db.prepare(`SELECT * FROM ${table} WHERE ${whereClause}`)
  stmt.bind(values)
  if (stmt.step()) {
    const row = stmt.getAsObject()
    stmt.free()
    return row
  }
  stmt.free()
  return null
}

export function getData(table) {
  if (!db) return []
  const results = []
  const stmt = db.prepare(`SELECT * FROM ${table}`)
  while (stmt.step()) {
    results.push(stmt.getAsObject())
  }
  stmt.free()
  return results
}

export function insert(table, data) {
  if (!db) return null
  const keys = Object.keys(data)
  const values = Object.values(data)
  const placeholders = keys.map(() => '?').join(', ')
  db.run(`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`, values)
  saveDb()
  
  // 获取 last insert id
  const stmt = db.prepare('SELECT last_insert_rowid() as id')
  stmt.step()
  const result = stmt.getAsObject()
  stmt.free()
  
  return { ...data, id: result.id }
}

export function query(table, filter = null) {
  if (!db) return []
  if (!filter) {
    return getData(table)
  }
  const keys = Object.keys(filter)
  const values = Object.values(filter)
  const whereClause = keys.map(k => `${k} = ?`).join(' AND ')
  const results = []
  const stmt = db.prepare(`SELECT * FROM ${table} WHERE ${whereClause}`)
  stmt.bind(values)
  while (stmt.step()) {
    results.push(stmt.getAsObject())
  }
  stmt.free()
  return results
}