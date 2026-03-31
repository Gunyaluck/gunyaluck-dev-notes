/**
 * จาก `.env` → `VITE_API_BASE_URL`
 * Local (Express ตรงพอร์ต): `http://localhost:3000` — route คือ `/auth/login` ฯลฯ
 * Production (ผ่าน Nginx `/api`): `https://pjsdf.online/api` — Nginx ส่งต่อเป็น `/auth/login` ที่ Node
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
