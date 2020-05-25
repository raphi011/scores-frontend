ARG NODE_VERSION

FROM node:$NODE_VERSION

ARG version
ENV VERSION $version

WORKDIR /scores/web-client

COPY ./package*.json ./
RUN npm install -only=prod

COPY . .

RUN npm run build

EXPOSE 3000 

ENTRYPOINT ["npm"]
CMD ["start"]
