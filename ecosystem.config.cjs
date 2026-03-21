/**
 * PM2 — frontend (static SPA จาก dist)
 * ก่อน start: npm run build และ npm ci (บนเซิร์ฟเวอร์ใช้ production-only ได้ ถ้ามี dist แล้ว)
 * พอร์ต 4173 ให้ตรง nginx upstream ใน pjsdf.online
 */
module.exports = {
  apps: [
    {
      name: "gunyaluck-dev-notes",
      script: "npm",
      args: "run preview:pm2",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
