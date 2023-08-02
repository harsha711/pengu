import { SlashCommandBuilder } from "discord.js";
import { setBirthday } from "../modules/birthday_requests_2.js";

export const setBirthdayCommand = {
    data: new SlashCommandBuilder()
        .setName("set_birthdate")
        .setDescription("Select a member from the server")
        .addUserOption((option) => {
            return option
                .setName("target")
                .setDescription("member")
                .setRequired(true);
        })
        .addIntegerOption((option) =>
            option
                .setName("day")
                .setDescription("enter a value between 1 and 31 (inclusive)")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(31)
        )
        .addIntegerOption((option) =>
            option
                .setName("month")
                .setDescription("enter a value between 1 and 12 (inclusive)")
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(12)
        ),
    async execute(interaction) {
        const target = interaction.options.getUser("target");
        const date = interaction.options.getInteger("day");
        const month = interaction.options.getInteger("month");

        const birthdate = String(date) + "-" + String(month);
        // console.log(target.id);

        const status = await setBirthday(
            target.id,
            birthdate,
            interaction.guild.id
        );
        if (status) {
            await interaction.reply(
                `<@${target.id}> birthday is on ${birthdate}`
            );
        } else {
            await interaction.reply(
                "There was some issue in executing your command"
            );
        }
    },
};
