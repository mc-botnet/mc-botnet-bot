import pino from "pino";
import { createChannel, createClient } from "nice-grpc";
import { type AcceptorClient, AcceptorDefinition } from "./rpc/pb/bot.ts";

async function main() {
    const log = pino();

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

    const channel = createChannel(`${config.grpcHost}:${config.grpcPort}`);
    log.info("Connected to gRPC channel");

    const acceptorClient: AcceptorClient = createClient(
        AcceptorDefinition,
        channel,
    );

    await acceptorClient.ready({ id: config.botId });
    log.info("Sent Ready request");

    setInterval(() => {
        log.info("bump");
    }, 10000);
}

await main();
