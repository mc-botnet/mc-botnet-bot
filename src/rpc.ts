import type { CallContext, ServiceImplementation } from "nice-grpc";
import type { DeepPartial, PingResponse, BotDefinition, Event, ConnectRequest } from "./pb/bot.ts";
import type { Empty } from "./pb/google/protobuf/empty.ts";
import { type Bot, createBot } from "mineflayer";

export class Rpc implements ServiceImplementation<BotDefinition> {
    private bot?: Bot;

    private config;
    constructor(config: any) {
        this.config = config;
    }

    async ping(_request: Empty, _context: CallContext): Promise<DeepPartial<PingResponse>> {
        return { payload: "Pong!" };
    }

    async *streamEvents(_request: Empty, _context: CallContext): AsyncIterable<DeepPartial<Event>> {}

    async connect(request: ConnectRequest, context: CallContext): Promise<Empty> {
        this.bot = createBot({
            host: request.host,
            port: request.port,
            auth: "offline",
            // TODO support Microsoft auth
            username: request.offlineUsername!,
        });

        return {};
    }
}
