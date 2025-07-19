export class RpcServer {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    async request(
        service: string,
        method: string,
        data: Uint8Array,
    ): Promise<Uint8Array> {
        return new Uint8Array();
    }
}
