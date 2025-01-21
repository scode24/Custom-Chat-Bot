# Step 1: Use an official Node.js image as the base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies first
COPY package.json package-lock.json ./

# Step 4: Install the app's dependencies
RUN npm install

# Step 5: Copy the rest of the React app's files into the container
COPY . .

# Step 6: Build the React app for production
RUN npm run build

# Step 7: Expose the port that the React app will run on
EXPOSE 3000

# Step 8: Start the React app (use npm start if you want to run in development mode, or serve for production)
CMD ["npm", "start"]
