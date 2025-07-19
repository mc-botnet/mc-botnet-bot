import mineflayer from "mineflayer";
import pino from "pino";

function main() {
    const log = pino();

    const bot = mineflayer.createBot({
        host: "localhost",
        port: 25565,
        username: "Bot",
        auth: "offline",
    });

    bot.once("spawn", () => {
        log.info(`Bot "${bot.username}" spawned.`);
    });
}

main();
