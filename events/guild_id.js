import { Events } from "discord.js";
import { setGuildId } from "../modules/guild_requests.js";

let guildId;

export const fetchGuildId = {
    name: Events.GuildCreate,
    async execute(interaction) {
        guildId = await interaction.id;
        setGuildId(guildId);
    },
};
