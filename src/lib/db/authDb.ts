import mysql from 'mysql2/promise'

export const authPool = mysql.createPool({
  host: process.env.AUTH_DB_HOST,
  port: Number(process.env.AUTH_DB_PORT || 3306),
  user: process.env.AUTH_DB_USER,
  password: process.env.AUTH_DB_PASSWORD,
  database: process.env.AUTH_DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function authQuery<T = any>(sql: string, params: any[] = []) {
  const [rows] = await authPool.execute(sql, params)
  return rows as T
}
