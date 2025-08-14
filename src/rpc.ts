import { type CallContext, ServerError, type ServiceImplementation, Status } from "nice-grpc";
import { type DeepPartial, type PingResponse, type BotDefinition, type Event, type ConnectRequest } from "./pb/bot.ts";
import type { Empty } from "./pb/google/protobuf/empty.ts";
import { type Bot, createBot } from "mineflayer";
import type { Logger } from "pino";

function wrap<Args extends any[], Return>(
    _target: any,
    _propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: Args) => Promise<Return>>,
) {
    const method = descriptor.value!;
    descriptor.value = async (...args): Promise<Return> => {
        try {
            // @ts-ignore
            return await method.apply(this, args);
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

    @wrap
    async ping(_request: Empty, _context: CallContext): Promise<DeepPartial<PingResponse>> {
        return { payload: "Pong!" };
    }

    async *streamEvents(_request: Empty, _context: CallContext): AsyncIterable<DeepPartial<Event>> {}

    @wrap
    async connect(request: ConnectRequest, _context: CallContext): Promise<Empty> {
        // this.bot = createBot({
        //     host: request.host,
        //     port: request.port,
        //     auth: "offline",
        //     // TODO support Microsoft auth
        //     username: request.offlineUsername!,
        // });

        return {};
    }

    close() {
        this.log.info("Closing");
    }
}
