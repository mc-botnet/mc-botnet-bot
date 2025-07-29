import pino from "pino";
import { createChannel, createClient, createServer } from "nice-grpc";
import { BotDefinition, ReadyRequest, type AcceptorClient, AcceptorDefinition } from "./rpc/pb/bot.ts";
import { Rpc } from "./rpc/rpc.ts";

async function main() {
    const log = pino();

    log.info("AAAAAAa")

    const config = {
        botId: process.env.BOT_ID!,
        botHost: process.env.BOT_HOST!,
        botPort: process.env.BOT_PORT!,
        botUsername: process.env.BOT_USERNAME!,
        botAuth: process.env.BOT_AUTH!,
        botToken: process.env.BOT_TOKEN,

        grpcHost: process.env.GRPC_HOST!,
        grpcPort: process.env.GRPC_PORT!,
    };


    const rpc = new Rpc();

    const server = createServer();
    server.add(BotDefinition, rpc)
    const port = await server.listen("localhost:0")
    log.info({ port: port }, "Started listening")

    const channel = createChannel(`${config.grpcHost}:${config.grpcPort}`);

    log.info("Connected to gRPC channel");

    const acceptorClient: AcceptorClient = createClient(
        AcceptorDefinition,
        channel,
    );

    await acceptorClient.ready({
        id: config.botId,
        port: port
    });
    log.info("Sent Ready request");

    setInterval(() => {
        log.info("bump");
    }, 10000);
}

await main();
