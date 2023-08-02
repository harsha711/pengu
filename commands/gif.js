import { SlashCommandBuilder } from "discord.js";
import axios from "axios";
import "dotenv/config";

export const gifCommand = {
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("Sends a random gif!")
        .addStringOption((option) =>
            option
                .setName("category")
                .setDescription("The gif category")
                .setRequired(true)
                .addChoices(
                    { name: "Funny", value: "funny" },
                    { name: "Meme", value: "meme" },
                    { name: "Movie", value: "movie" }
                )
        ),
    async execute(interaction) {
        const category = interaction.options.getString("category");
        // category must be one of 'gif_funny', 'gif_meme', or 'gif_movie'
        const search_url = `https://tenor.googleapis.com/v2/search?q=${category}&key=${
            process.env.TENOR_KEY
        }&clientkey=${process.env.CLIENT_ID}&limit=${Math.floor(
            Math.random() * 7
        )}`;

        try {
            const response = await axios.get(search_url);
            console.log("gif response here:");
            console.log(response.data.results[0].url);
            return interaction.reply(response.data.results[0].url);
        } catch (error) {
            console.log(error);
        }
    },
};
