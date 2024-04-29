# Use the official Node.js 20 image as the base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Increase the timeout for npm
RUN npm config set fetch-retry-maxtimeout 60000

# Use a different npm registry (optional)
RUN npm config set registry https://registry.npmjs.org/

# Update npm to the latest version
RUN npm install -g npm@10.5.0

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Next.js app
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build", "-l", "3000"]