# Use the official Node.js 20 image as the base for the build stage
FROM node:20-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Increase the timeout for npm
RUN npm config set fetch-retry-maxtimeout 60000

# Use a different npm registry (optional)
RUN npm config set registry https://registry.npmjs.org/

# Update npm to the latest version
RUN npm install -g npm@latest

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Use the official Node.js 20 image as the base for the production stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./build
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm install --production

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["next", "start"]