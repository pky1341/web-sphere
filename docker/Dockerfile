# Use the official Node.js 20 image as the base for the build stage
FROM node:20-alpine AS builder

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
RUN npm ci

# Correctly copy the entire project
COPY ./ ./

# Build the Next.js app
RUN npm run build

# Use the official Node.js 20 image as the base for the production stage
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
# Copy any other necessary directories (adjust as needed)
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/images ./images

# Copy package.json and package-lock.json for production dependencies
COPY --from=builder /app/package*.json ./

# Install production dependencies
RUN npm ci --production

# Expose the port the app will run on
EXPOSE 3000

ENV HOST 0.0.0.0

# Start the app
CMD ["npx", "next", "start"]