export default [
  {
    method: 'GET',
    path: '/health',
    handler: () => {
      return {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: `${Math.floor(process.uptime())} seconds`,
        environment: process.env.NODE_ENV || 'development'
      };
    },
    config: {
      description: 'Health check endpoint',
      notes: 'Returns server health status and uptime information',
      tags: ['api', 'health'],
      auth: false,
    },
  },
];
