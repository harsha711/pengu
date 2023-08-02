import { GuildModel } from "../models/guild.js";

export const getGuildId = async (id) => {
    try {
        const guild = await GuildModel.findById(id);
        console.log(guild);
        return guild.guildId;
    } catch (error) {
        consolelog(error);
    }
};

export const setGuildId = async (id) => {
    try {
        const guild = new GuildModel({ guildId: id });
        await guild.save();
    } catch (error) {
        console.log(error);
    }
};

export const getAllGuilds = async () => {
    try {
        const guilds = await GuildModel.find({});
        return guilds;
    } catch (error) {
        console.log(error);
    }
};

export const setPrimaryChannel = async (targetGuildId, targetChannelId) => {
    try {
        const guild = await GuildModel.findOne({ guildId: targetGuildId });
        guild.channelID = targetChannelId;
        await guild.save();
    } catch (error) {
        console.log(error);
    }
};

export const getPrimaryChannelId = async (targetGuildId) => {
    try {
        const guild = await GuildModel.findOne({ guildId: targetGuildId });
        return guild.channelID;
    } catch (error) {
        console.log(error);
    }
};
