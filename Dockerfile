FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 5001
EXPOSE 6380
EXPOSE 27018
RUN chown -R node /usr/src/app
USER node
CMD ["node", "src/server.js"]
