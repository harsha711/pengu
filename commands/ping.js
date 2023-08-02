import { SlashCommandBuilder } from "discord.js";

export const pingCommand = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("replies with pong"),
    async execute(interaction) {
        return interaction.reply("pong!");
    },
};
