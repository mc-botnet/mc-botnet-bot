import type { CallContext, ServiceImplementation } from "nice-grpc";
import type { DeepPartial, PingResponse, BotDefinition, Event, ConnectRequest } from "./pb/bot.ts";
import type { Empty } from "./pb/google/protobuf/empty.ts";

export class Rpc implements ServiceImplementation<BotDefinition> {
    async ping(_request: Empty, _context: CallContext): Promise<DeepPartial<PingResponse>> {
        return { payload: "Pong!" };
    }

    async *streamEvents(_request: Empty, _context: CallContext): AsyncIterable<DeepPartial<Event>> {}

    async connect(request: ConnectRequest, context: CallContext): Promise<Empty> {
        return {};
    }
}
