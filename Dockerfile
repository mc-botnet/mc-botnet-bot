FROM oven/bun:alpine AS build

WORKDIR /app

COPY . .

RUN ["bun", "install"]
RUN ["bun", "build", "src/index.ts", "--outdir", "dist"]

FROM oven/bun:alpine

COPY --from=build /app/dist/index.js .

ENTRYPOINT [ "bun", "index.js" ]
