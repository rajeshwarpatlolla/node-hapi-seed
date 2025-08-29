// Route aggregator - combines all route modules into a single array
import authRoutes from './auth.js';
import userRoutes from './users.js';
import healthRoutes from './health.js';

export default [...authRoutes, ...userRoutes, ...healthRoutes];
