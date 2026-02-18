import mysql from 'mysql2/promise'

export const dataPool = mysql.createPool({
  host: process.env.DATA_DB_HOST,
  port: Number(process.env.DATA_DB_PORT || 3306),
  user: process.env.DATA_DB_USER,
  password: process.env.DATA_DB_PASSWORD,
  database: process.env.DATA_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function dataQuery<T = any>(sql: string, params: any[] = []) {
  const [rows] = await dataPool.execute(sql, params)
  return rows as T
}
