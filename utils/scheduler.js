import * as cron from "node-cron";
import { getTodayBirthday } from "../modules/birthday_requests.js";
import {
    getAllGuilds,
    getPrimaryChannelId,
} from "../modules/guild_requests.js";

export const midnightScheduler = (client) => {
    cron.schedule(
        "0 0 * * *",
        async () => {
            try {
                const guilds = await getAllGuilds();
                for (const guild of guilds) {
                    const birthdays = await getTodayBirthday(guild.guildId);

                    const targetGuild = client.guilds.cache.get(guild.guildId);
                    const channelId = await getPrimaryChannelId(guild.guildId);
                    const channel = targetGuild.channels.cache.get(
                        `${channelId}`
                    );
                    for (const birthday of birthdays) {
                        channel.send(
                            `It's <@${birthday.discordId}> birthday today!`
                        );
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        {
            scheduled: true,
            timezone: "Asia/Kolkata",
        }
    );
};
