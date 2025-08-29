export const getSwaggerOptions = (packageJson) => ({
  info: {
    title: packageJson.description,
    version: packageJson.version,
    description: 'REST API with Hapi.js, JWT auth, and user management',
    contact: {
      name: packageJson.author,
    },
  },
  schemes: ['http', 'https'],
  securityDefinitions: {
    jwt: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT token for authentication',
    },
  },
  security: [{ jwt: [] }],
  tags: [
    { name: 'auth', description: 'User authentication endpoints' },
    { name: 'users', description: 'User management endpoints' },
    { name: 'health', description: 'Server health monitoring' },
  ],
});
