import pino from "pino";
import { createChannel, createClient } from "nice-grpc";
import {
    type AcceptorClient,
    AcceptorDefinition,
    ReadyRequest,
} from "./rpc/pb/bot.ts";

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

    const acceptorClient: AcceptorClient = createClient(
        AcceptorDefinition,
        channel,
    );
    await acceptorClient.ready({ id: config.botId });
}

await main();
