# 🚀 Node.js Hapi.js REST API Starter

A production-ready Node.js REST API starter template built with Hapi.js framework, featuring JWT authentication, MongoDB integration, and comprehensive API documentation with Swagger UI.

## ✨ Features

- 🔐 **JWT Authentication** - Secure user registration and login
- 🗄️ **MongoDB Integration** - Mongoose ODM for data persistence
- 📚 **Swagger Documentation** - Interactive API documentation
- 🛡️ **Input Validation** - Joi schema validation
- 🔒 **Security** - CORS enabled, JWT-based authorization
- 📝 **ES6 Modules** - Modern JavaScript with import/export
- 🚦 **Error Handling** - Comprehensive error management with Boom

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd node-hapi-seed

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your configuration
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
HOST=localhost
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here
JWT_TOKEN_EXPIRES_IN=24h
```

### Running the Application

```bash
# Development
npm start

# Or directly
node index.js
```

## 📖 API Documentation

Once the server is running, access the interactive API documentation:

- **Swagger UI**: `http://localhost:3000/documentation`
- **API Base URL**: `http://localhost:3000`

## 🔌 Available Endpoints

### Authentication (`/auth`)
- `POST /register` - User registration
- `POST /login` - User authentication

### Users (`/users`)
- `GET /users` - Get all users
- `GET /users/{userId}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{userId}` - Update user
- `DELETE /users/{userId}` - Delete user

## 🏗️ Project Structure

```
node-hapi-seed/
├── 📁 config/
│   └── swagger.js          # Swagger configuration
├── 📁 controllers/
│   ├── auth.js             # Authentication logic
│   └── users.js            # User management logic
├── 📁 database/
│   └── connection.js       # MongoDB connection
├── 📁 models/
│   └── users.js            # User data model
├── 📁 routes/
│   ├── auth.js             # Auth routes
│   ├── users.js            # User routes
│   └── index.js            # Route aggregator
├── 📄 index.js             # Main server file
├── 📄 package.json         # Dependencies and scripts
└── 📄 README.md            # This file
```

## 🛠️ Development

### VS Code Configuration

The project includes pre-configured VS Code debug settings in `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Hapi Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/index.js",
      "cwd": "${workspaceFolder}",
      "env": {
        "HOST": "localhost",
        "PORT": "3000",
        "MONGODB_URI": "mongodb://localhost:27017/your_database",
        "JWT_SECRET_KEY": "your_jwt_secret_key",
        "JWT_TOKEN_EXPIRES_IN": "24h"
      },
      "console": "integratedTerminal",
      "restart": true
    }
  ]
}
```

**How to use:**
1. Open the Debug panel (Ctrl/Cmd + Shift + D)
2. Select "Launch Hapi Server" from the dropdown
3. Press F5 or click the play button to start debugging

**Note:** Update the `MONGODB_URI` in the launch configuration with your actual database connection string.

### VS Code Settings

Create `.vscode/settings.json` for workspace-specific settings:

```json
{
  "files.autoSave": "afterDelay",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 📦 Dependencies

### Core Dependencies
- **@hapi/hapi** - Web framework
- **@hapi/boom** - HTTP error handling
- **mongoose** - MongoDB ODM
- **joi** - Data validation
- **jsonwebtoken** - JWT implementation
- **bcrypt** - Password hashing
- **hapi-swagger** - API documentation

### Development Dependencies
- **eslint** - Code linting

## 🔧 Scripts

```bash
npm start          # Start the server
npm run serve      # Alternative start command
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Rajeshwar Patlolla**

---

⭐ **Star this repository if you find it helpful!**
