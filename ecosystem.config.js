/* global module, __dirname, process */

module.exports = {
  apps: [
    {
      name: "gunyaluck-dev-notes",
      script: "npm",
      args: "run preview",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        HOST: "0.0.0.0",
        PORT: process.env.PORT || 3000,
      },
    },
  ],
};

