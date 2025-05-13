# use node:22 as base image
FROM node:22

# set the working directory
WORKDIR /app

# copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# install dependencies
RUN npm install

# copy the rest of the application code to the working directory
COPY . .

# expose port 3000
EXPOSE 3000

# start the application
CMD ["npm", "start"]
