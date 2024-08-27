FROM node:20-alpine as builder

RUN apk add git

ENV WORKDIR=/code

WORKDIR $WORKDIR

RUN corepack enable pnpm

ADD . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter @pnpm-monorepo/template-vue3 build


# Production
FROM devforth/spa-to-http:latest

COPY --from=builder /code/apps/template-vue3/dist/ . 