FROM node:14-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Use the .dockerignore file to control what ends up inside the image!
COPY . .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

ENV REACT_APP_API_ENDPOINT=http://localhost:4000

RUN npm run build

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000

# Start the app
CMD [ "npx", "serve", "build" ]
