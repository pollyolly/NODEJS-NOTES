require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'wiki-api',
      script: './server.js',
      watch: true,
      env: {
        PORT: process.env.PORT,
        NODE_ENV: 'production',
      },
    },
  ],
};
