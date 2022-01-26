FROM node:alpine AS todobackend
WORKDIR /app
COPY . .
EXPOSE 3001
ADD node_modules.tar.gz .
ENTRYPOINT ["npm", "start"]