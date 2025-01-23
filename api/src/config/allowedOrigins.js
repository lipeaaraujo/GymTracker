const allowedOrigins = [
  'https://www.yoursite.com',
  'http://127.00.0.1:4000',
  'http://localhost:4000',
  'http://localhost:3000',
  process.env.FRONT_URL
].filter(Boolean);

module.exports = allowedOrigins;