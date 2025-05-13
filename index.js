import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import mongoose from 'mongoose';

import Config from './config/index.js';
import Routes from './routes/index.js';

const init = async () => {
  const server = Hapi.server({
    host: Config.server.host,
    port: Config.server.port,
    routes: {
      cors: true,
      validate: {
        // If any Joi validations fail, it will send the proper error message to the user
        failAction: (request, h, err) => {
          throw err;
        },
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: Config.swagger.title,
      contact: {
        name: Config.swagger.contact,
      },
    },
    schemes: ['http', 'https'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ jwt: [] }],
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  try {
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    console.log(`Swagger documentation is running on ${server.info.uri}/documentation`);
  } catch (err) {
    console.log(err);
  }
  server.route(Routes);

  server.ext('onPostAuth', async (req, h) => h.continue);
};

if (Config.database.uri) {
  mongoose.connect(Config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connected to DB.');
    init();
  });

  db.on('error', (error) => {
    console.log('Connection to DB failed!', error);
    process.exit(0);
  });

  db.on('disconnected', (err) => {
    console.log('Connection teminated to DB ', err);
    process.exit(0);
  });

  process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  init();
}
