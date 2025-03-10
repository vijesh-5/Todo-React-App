# # Use the official Node.js image
# FROM node:18

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the React app
# RUN npm run build

# # Install a lightweight HTTP server to serve the React app
# RUN npm install -g serve

# # Expose the frontend port
# EXPOSE 3000

# # Serve the React app
# CMD ["serve", "-s", "build", "-l", "3000"]


# Use the official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight HTTP server to serve the React app
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Serve the React app from the build folder
CMD ["serve", "-s", "build", "-l", "3000"]