FROM node:16.14-alpine
WORKDIR /app-backend
COPY . /app-backend
RUN npm --maxsockets 1 install && npx tsc
CMD ["npm", "run", "dev"]
