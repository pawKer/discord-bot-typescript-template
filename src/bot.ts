import { Client, Collection, Intents } from "discord.js";
import dotenv from "dotenv";
import MongoDb from "./mongo";
import { DatabaseRepository, Command, DiscordClient } from "../@types/bot";
import { readCommands, readEvents } from "./utils/utils";
dotenv.config();

const DB_NAME = "<DB-NAME>";
const MONGO_URI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.fx8o1.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const mongo: DatabaseRepository = new MongoDb(MONGO_URI);

const client: DiscordClient = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}) as DiscordClient;

client.commands = new Collection<string, Command>();
client.db = mongo;

readCommands().then((commands) => {
  commands.forEach((cmd) => {
    if (client && client.commands) client.commands.set(cmd.data.name, cmd);
  });
});

readEvents().then((events) => {
  events.forEach((ev) => {
    if (ev.once) {
      client.once(ev.name, (...args: unknown[]) => ev.execute(...args));
    } else {
      client.on(ev.name, (...args: unknown[]) => ev.execute(...args));
    }
  });
  console.log(`Loaded ${events.length} events.`);
});

client.login(process.env.DISCORD_API_SECRET);
