import pino from "pino";
import { createChannel, createClient, createServer } from "nice-grpc";
import { BotDefinition, type AcceptorClient, AcceptorDefinition } from "./pb/bot.ts";
import { Rpc } from "./rpc.ts";

async function main() {
    const log = pino();

    log.info("AAAAAAa");

    const config = {
        botId: process.env.BOT_ID!,
        grpcHost: process.env.GRPC_HOST!,
        grpcPort: process.env.GRPC_PORT!,
    };

    const rpc = new Rpc(config);

    const server = createServer();
    server.add(BotDefinition, rpc);
    const port = await server.listen("localhost:0");
    log.info({ port: port }, "Started listening");

    const channel = createChannel(`${config.grpcHost}:${config.grpcPort}`);

    log.info("Connected to gRPC channel");

    const acceptorClient: AcceptorClient = createClient(AcceptorDefinition, channel);

    await acceptorClient.ready({
        id: config.botId,
        port: port,
    });
    log.info("Sent Ready request");
}

await main();
