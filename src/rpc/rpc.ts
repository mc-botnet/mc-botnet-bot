import type { CallContext, ServiceImplementation } from "nice-grpc";
import type { DeepPartial, PingResponse, BotDefinition } from "./pb/bot";
import type { Empty } from "./pb/google/protobuf/empty";

export class Rpc implements ServiceImplementation<BotDefinition> {
    async ping(request: Empty, context: CallContext): Promise<DeepPartial<PingResponse>> {
        return { payload: "Pong!" }
    }
}
