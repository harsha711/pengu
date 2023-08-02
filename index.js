import "dotenv/config";
import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import { connectDb } from "./connect-db.js";
import { deployCommands } from "./deploy-commands.js";
import { midnightScheduler } from "./utils/scheduler.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandPath = path.join(__dirname, "commands");
const commandFiles = fs
    .readdirSync(commandPath)
    .filter((file) => file.endsWith(".js"));

(async () => {
    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const outerObject = await import(filePath);
        const command = outerObject[Object.keys(outerObject)[0]];
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
    deployCommands();
    // console.log(client.commands);
})();

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

(async () => {
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventObject = await import(filePath);
        const event = eventObject[Object.keys(eventObject)[0]];
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
})();

connectDb();

midnightScheduler(client);

client.login(process.env.TOKEN_ID);
