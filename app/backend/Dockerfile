FROM node:16.14-alpine
WORKDIR /app-backend
COPY . /app-backend
RUN npm install --maxsockets 1 && npx tsc
CMD ["npm", "run", "dev"]
