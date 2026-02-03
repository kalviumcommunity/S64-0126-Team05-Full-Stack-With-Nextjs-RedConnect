# 1. Use Node.js as base
FROM node:20-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy dependency files first
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the project
COPY . .

# 6. Build Next.js app
RUN npm run build

# 7. Expose port
EXPOSE 3000

# 8. Start app
CMD ["npm", "run", "start"]
