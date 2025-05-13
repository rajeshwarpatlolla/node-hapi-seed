# A starter project for Hapi.js application

## How to use?

#### Approach - 1

- Add the below configuration in your **.vscode > launch.json** file in the vscode editor before running the app
- If there was no configuration set earlier, just create .vscode folder in the root directory of the folder, add launch.json file and add the below configuration

```javascript
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "program": "${workspaceFolder}/index.js",
      "env": {
        "HOST": "localhost",
        "PORT": "3000",
        "MONGODB_URI": "<MONGO_DB_URL>",
        "JWT_SECRET_KEY": "<APP_API_TOKEN>",
        "JWT_TOKEN_EXPIRES_IN": "1d"
      }
    }
  ]
}

```

- Once you are done with the above step, you can run the application using vscode debug feature

#### Approach - 2

- You can export the variables with proper values from the CLI. The variables to export are **HOST, PORT, MONGODB_URI, JWT_SECRET_KEY, JWT_TOKEN_EXPIRES_IN**

- Once you are done with the above step, you can run the application using `npm start`

#### API Documentation

- Swagger documentation is already integrated and can be accessed at `http://localhost:3000/documentation`

#### Lint Configuration

- In **.vscode > settings.json** we can configure the vs code settings specific to this workspace

```javascript
{
  "files.autoSave": "afterDelay"
}
```

## Dockerizing

### Process - 1
#### Create .env file with below content
````
HOST=0.0.0.0
PORT=3000
MONGODB_URI=
JWT_SECRET_KEY=
JWT_TOKEN_EXPIRES_IN=1d
````

#### Run steps to build and run
````
docker build -t docker-node-test .
docker run --env-file .env -p 3000:3000 docker-node-test
````

### Process - 2
- Add `docker-compose.yml` file with content below, so that it picks the .env file for environment variables
````
version: '3.8'
services:
  app:
    image: docker-node-test
    ports:
      - "3000:3000"
    env_file:
      - .env
````

- Then run `docker-compose up` command

#### NOTE: Add `.vscode` and .env in `.gitignore` file
