import { SlashCommandBuilder } from "discord.js";
import { deleteBirthday } from "../modules/birthday_requests.js";

export const setBirthdayCommand = {
    data: new SlashCommandBuilder()
        .setName("delete_birthdate")
        .setDescription("Select a member from the server")
        .addUserOption((option) => {
            return option
                .setName("target")
                .setDescription("member")
                .setRequired(true);
        }),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const birthdate = interaction.options.getString("date");
        // console.log(target, birthdate);

        const status = await deleteBirthday(target.id, interaction.guild.id);
        if (status) {
            await interaction.reply(
                `<@${target.id}> birthday is successfully deleted`
            );
        } else if (status === false) {
            await interaction.reply(`<@${target.id}> birthday is not listed`);
        } else {
            await interaction.reply(
                "There was some issue while executing your command."
            );
        }
    },
};
