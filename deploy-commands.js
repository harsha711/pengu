import { REST, Routes } from "discord.js";
import "dotenv/config";
import * as url from "url";
import * as path from "path";
import * as fs from "fs";

export const deployCommands = async () => {
    const rest = new REST().setToken(process.env.TOKEN_ID);

    const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

    const commands = [];

    const commandPath = path.join(__dirname, "commands");
    const commandFiles = fs
        .readdirSync(commandPath)
        .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const outerObject = await import(filePath);
        const command = outerObject[Object.keys(outerObject)[0]];
        if ("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
    // console.log(commands);

    try {
        console.log(
            `Started refereshing ${commands.length} application (/) commands`
        );

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log(
            `Successfully reloaded ${data.length} application (/) commands`
        );
    } catch (error) {
        console.log(error);
    }
};
