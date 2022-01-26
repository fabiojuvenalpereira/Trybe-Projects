FROM node:alpine AS todotests
WORKDIR /app
ADD node_modules.tar.gz .
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]