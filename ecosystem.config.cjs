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
        PORT: 4173,
      },
    },
  ],
};
