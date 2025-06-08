FROM node:22-alpine
WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 8050

CMD [ "npm", "run", "start:dev"]
