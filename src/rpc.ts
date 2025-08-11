import { type CallContext, ServerError, type ServiceImplementation, Status } from "nice-grpc";
import type { DeepPartial, PingResponse, BotDefinition, Event, ConnectRequest } from "./pb/bot.ts";
import type { Empty } from "./pb/google/protobuf/empty.ts";
import { type Bot, createBot } from "mineflayer";
import type { Logger } from "pino";

function wrap<Args extends any[], Return>(fn: (...args: Args) => Promise<Return>): (...args: Args) => Promise<Return> {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (e: any) {
            throw new ServerError(Status.INTERNAL, e.toString());
        }
    };
}

export class Rpc implements ServiceImplementation<BotDefinition> {
    private bot?: Bot;

    private config;
    private log: Logger;

    constructor(config: any, log: Logger) {
        this.config = config;
        this.log = log;
    }

    ping = wrap(
        async (_request: Empty, _context: CallContext): Promise<DeepPartial<PingResponse>> => ({ payload: "Pong!" }),
    );

    async *streamEvents(_request: Empty, _context: CallContext): AsyncIterable<DeepPartial<Event>> {}

    connect = wrap(async (request: ConnectRequest, _context: CallContext): Promise<Empty> => {
        this.bot = createBot({
            host: request.host,
            port: request.port,
            auth: "offline",
            // TODO support Microsoft auth
            username: request.offlineUsername!,
        });

        return {};
    });

    close() {
        this.log.info("Closing");
    }
}
