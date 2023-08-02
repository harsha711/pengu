import { model, Schema } from "mongoose";

const DiscordGuildSchema = new Schema({
    guildId: { type: String, unique: true },
    channelID: String,
});

export const GuildModel = model("guild", DiscordGuildSchema);

const BirthdaySchema = new Schema({
    discordId: String,
    birth_date: String,
    guild: { type: Schema.Types.ObjectId, ref: "GuildModel" },
});

export const BirthdayModel = model("birthday", BirthdaySchema);
