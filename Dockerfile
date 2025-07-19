FROM oven/bun:debian AS build

WORKDIR /app

COPY src .
COPY package.json .
COPY tsconfig.json .
COPY bun.lock .

RUN apt-get update
RUN apt-get install -y ffmpeg python3 make g++

RUN ["bun", "install"]
RUN ["bun", "build", "src/index.ts", "--outdir", "dist"]

FROM oven/bun:alpine

COPY --from=build /app/dist/index.js .

ENTRYPOINT [ "bun", "index.js" ]
