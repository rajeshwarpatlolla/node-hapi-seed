module.exports = {
  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  swagger: {
    contact: 'Rajeshwar Patlolla',
    title: 'Node.js seed project with Hapi.js framework',
  },
  database: {
    uri: process.env.MONGODB_URI,
  },
  auth: {
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
  },
};
