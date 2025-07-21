FROM oven/bun:alpine AS build

WORKDIR /app

COPY src ./src
COPY package.json .
COPY tsconfig.json .
COPY bun.lock .

RUN apk add --no-cache ffmpeg

RUN ["bun", "install"]
RUN ["bun", "build", "src/index.ts", "--outdir", "dist", "--target", "bun"]

FROM oven/bun:alpine

COPY --from=build /app/dist/index.js .

ENTRYPOINT [ "bun", "index.js" ]
