FROM node:12-alpine as build-src

RUN mkdir -p /usr/build/boilerplate

COPY ./package.json /usr/build/boilerplate

WORKDIR /usr/build/boilerplate

# Install all dependencies as we need to build
RUN yarn install

COPY . /usr/build/boilerplate

RUN yarn build

RUN ls -ls dist/

FROM node:12-alpine as runtime_instance

ENV NODE_ENV=production

RUN mkdir -p /usr/boilerplate

COPY ./package.json /usr/boilerplate

WORKDIR /usr/boilerplate

# Install only production dependencies
RUN yarn install --production

COPY --from=build-src /usr/build/boilerplate/dist  /usr/boilerplate/dist

COPY  ./src/banner.txt /usr/boilerplate/dist/banner.txt

COPY --from=build-src /usr/build/boilerplate/node_modules /usr/boilerplate/node_modules

WORKDIR /usr/boilerplate/

RUN ls -ltr

RUN ls -ltr ./dist/

CMD ["node", "./dist/server"]
