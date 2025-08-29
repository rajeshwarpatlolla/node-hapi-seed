import Hapi from '@hapi/hapi';
import HapiSwagger from 'hapi-swagger';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import Boom from '@hapi/boom';
import { readFileSync } from 'fs';

import Routes from './routes/index.js';
import { connectDB, disconnectDB } from './database/connection.js';
import { getSwaggerOptions } from './config/swagger.js';
import { logToFile } from './utils/logger.js';

const packageJson = JSON.parse(readFileSync('./package.json'));

const createServer = () => {
  return Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    routes: {
      cors: true,
      validate: {
        // Global Joi validation error handler
        failAction: (_request, _h, err) => {
          const errorMsg = `Validation Error: ${err?.message}`;
          console.error('❌', errorMsg);
          logToFile(`Validation Error: ${err?.message}`);
          throw Boom.badRequest(`Invalid payload: ${err?.message}`);
        },
      },
    },
  });
};

const registerPlugins = async (server) => {
  await server.register([
    Inert, // Required by hapi-swagger
    Vision, // Required by hapi-swagger
    {
      plugin: HapiSwagger,
      options: getSwaggerOptions(packageJson),
    },
  ]);
};

const startServer = async (server) => {
  try {
    await server.start();
    const serverInfo = `Server running on ${server.info.uri}`;
    const swaggerInfo = `Swagger docs: ${server.info.uri}/documentation`;
    
    console.log(`🚀 ${serverInfo}`);
    console.log(`📚 ${swaggerInfo}`);
    
    logToFile(`Server started successfully - ${serverInfo}`);
    logToFile(`Swagger documentation available at ${swaggerInfo}`);
  } catch (error) {
    const errorMsg = `Server start failed: ${error.message}`;
    console.error('❌', errorMsg);
    logToFile(`Server start failed: ${error.message}`);
    throw error;
  }
};

const init = async () => {
  const server = createServer();

  await registerPlugins(server);
  server.route(Routes);

  // Log all incoming requests
  server.ext('onRequest', (request, h) => {
    const logData = {
      method: request.method,
      url: request.url.pathname,
      userAgent: request.headers['user-agent'],
      ip: request.info.remoteAddress,
      timestamp: new Date().toISOString()
    };
    
    logToFile(`Incoming Request: ${JSON.stringify(logData)}`);
    return h.continue;
  });

  // Log all responses
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom) {
      logToFile(`Error Response: ${response.output.statusCode} - ${response.message} - URL: ${request.url.pathname}`);
    } else {
      logToFile(`Success Response: ${response.statusCode || 200} - URL: ${request.url.pathname}`);
    }
    return h.continue;
  });

  // Graceful shutdown handling
  process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, shutting down gracefully...');
    logToFile('Server shutdown initiated by SIGTERM');
    await server.stop();
    await disconnectDB();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('🛑 SIGINT received, shutting down gracefully...');
    logToFile('Server shutdown initiated by SIGINT');
    await server.stop();
    await disconnectDB();
    process.exit(0);
  });

  await startServer(server);
};

// Database connection and server startup
if (process.env.MONGODB_URI) {
  connectDB().then((success) => {
    if (success) {
      logToFile('MongoDB connection successful');
      init();
    } else {
      const errorMsg = 'Failed to connect to database, exiting...';
      console.error('❌', errorMsg);
      logToFile(`MongoDB connection failed - ${errorMsg}`);
      process.exit(1);
    }
  });
} else {
  const warningMsg = 'No MONGODB_URI provided, starting without database...';
  console.log('⚠️', warningMsg);
  logToFile(warningMsg);
  init();
}
