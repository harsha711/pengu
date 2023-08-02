import { GuildModel, BirthdayModel } from "../models/guild.js";

export const setBirthday = async (
    targetDiscordId,
    birthdate,
    targetGuildId
) => {
    try {
        const targetGuild = await GuildModel.findOne({
            guildId: targetGuildId,
        });
        const getData = await BirthdayModel.exists({
            discordId: targetDiscordId,
            guild: targetGuild._id,
        });
        if (!getData) {
            const userRow = new BirthdayModel({
                discordId: targetDiscordId,
                birth_date: birthdate,
                guild: targetGuild._id,
            });
            await userRow.save();
        } else if (getData) {
            const updatedUserRow = await BirthdayModel.findOneAndUpdate(
                { discordId: targetDiscordId, guild: targetGuild._id },
                { birth_date: birthdate },
                { returnOriginal: false }
            );
            await updatedUserRow.save();
        }
        return true;
    } catch (error) {
        throw new Error(error);
    }
};

export const deleteBirthday = async (targetDiscordId, targetGuildId) => {
    try {
        const targetGuild = await GuildModel.findOne({
            guildId: targetGuildId,
        });
        const getData = await BirthdayModel.exists({
            discordId: targetDiscordId,
            guild: targetGuild._id,
        });
        if (!getData) {
            return false;
        }
        await BirthdayModel.deleteOne({
            discordId: targetDiscordId,
            guild: targetGuild._id,
        });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const getTodayBirthday = async (targetGuildId) => {
    try {
        const date = new Date().toLocaleDateString("en-US", {
            timeZone: "Asia/Kolkata",
        });
        const str = date.split("/");
        const formattedDate = str[1] + "-" + str[0];
        const targetGuild = await GuildModel.findOne({
            guildId: targetGuildId,
        });
        const getData = await BirthdayModel.find({
            birth_date: formattedDate,
            guild: targetGuild._id,
        });
        return getData;
    } catch (error) {
        console.log(error);
    }
};
