import mongoose from 'mongoose';
import { logToFile } from '../utils/logger.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 45000, // 45 second timeout
    });
    
    // Add connection event listeners
    mongoose.connection.on('error', (error) => {
      const errorMsg = `MongoDB connection error: ${error.message}`;
      console.error('❌', errorMsg);
      logToFile(errorMsg);
    });
    
    mongoose.connection.on('disconnected', () => {
      const warningMsg = 'MongoDB disconnected';
      console.warn('⚠️', warningMsg);
      logToFile(warningMsg);
    });
    
    mongoose.connection.on('connected', () => {
      const infoMsg = 'MongoDB connection established';
      console.log('✅', infoMsg);
      logToFile(infoMsg);
    });
    
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    const errorMsg = `MongoDB connection failed: ${error.message}`;
    console.error('❌', errorMsg);
    logToFile(errorMsg);
    return false;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    const infoMsg = 'Disconnected from MongoDB';
    console.log('✅', infoMsg);
    logToFile(infoMsg);
  } catch (error) {
    const errorMsg = `MongoDB disconnection failed: ${error.message}`;
    console.error('❌', errorMsg);
    logToFile(errorMsg);
  }
};
