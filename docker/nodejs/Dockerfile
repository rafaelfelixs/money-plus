# Builder application
FROM public.ecr.aws/docker/library/node:18-alpine3.20 as builder
WORKDIR /usr
COPY app/package.json app/yarn.lock ./
COPY app/prisma ./prisma
RUN yarn install
RUN npx prisma generate

COPY app .
RUN yarn clean && yarn build


# Deploy application
FROM public.ecr.aws/docker/library/node:18-alpine3.20 as app
RUN apk add --update curl dumb-init && \
    rm -rf /var/cache/apk/*

ENV APP_HOME /application
ENV NODE_ENV production
RUN mkdir -m 777 $APP_HOME && \
    chown node:node $APP_HOME && \
    mkdir -p -m 777 $APP_HOME/build && \
    chown node:node $APP_HOME/build

WORKDIR $APP_HOME

USER node

COPY --chown=node:node --from=builder /usr/yarn.lock $APP_HOME/yarn.lock
COPY --chown=node:node --from=builder /usr/package.json $APP_HOME/package.json
COPY --chown=node:node --from=builder /usr/prisma $APP_HOME/prisma
RUN yarn install --production

COPY --chown=node:node --from=builder /usr/build $APP_HOME/build
