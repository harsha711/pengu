import { SlashCommandBuilder } from "discord.js";
import { setPrimaryChannel } from "../modules/guild_requests.js";

export const primaryChannel = {
    data: new SlashCommandBuilder()
        .setName("set_primary_channel")
        .setDescription(
            "This channel would become the primary channel for receiving notifications"
        ),
    async execute(interaction) {
        try {
            //console.log(interaction);
            setPrimaryChannel(interaction.guild.id, interaction.channelId);
            await interaction.reply(
                `successfully set <#${interaction.channelId}> as the primary channel`
            );
        } catch (error) {
            console.log(error);
        }
    },
};
